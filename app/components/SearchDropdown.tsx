"use client"

import RatingStars from "@/app/components/reviews/RatingStars"
import { schools } from "@/app/data/mock"
import { Input } from "@/components/ui/input"
import type { School } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

function highlightMatch(text: string, query: string) {
  if (!query) return text
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() 
      ? <strong key={i} className="font-bold text-gray-900">{part}</strong>
      : part
  )
}

export function SearchBox() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<School[]>([])
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const lowerQuery = query.trim().toLowerCase()
      
      if (!lowerQuery) {
        setResults([])
        setShowResults(false)
        return
      }
      
      const filtered = schools.filter(school => {
        const searchableText = [
          school.name,
          school.slug,
          school.description || ""
        ].join(" ").toLowerCase()
        
        return searchableText.includes(lowerQuery)
      })
      
      setResults(filtered)
      setShowResults(true)
    }, 200)
    
    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (school: School) => {
    setShowResults(false)
    setQuery("")
    router.push(`/anmeldelser/${school.slug}`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (results.length > 0) {
      handleSelect(results[0])
    }
  }

  const hasQuery = query.trim()
  const hasResults = results.length > 0

  return (
    <div ref={wrapperRef} className="relative z-10 mt-6 flex justify-center px-8">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="w-full" role="search">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => hasQuery && hasResults && setShowResults(true)}
            placeholder="Søg efter en virksomhed eller kategori"
            className="h-16 w-full rounded-full border border-gray-200 bg-white px-8 text-lg text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </form>

        {showResults && hasResults && (
          <div className="absolute left-0 right-0 mx-auto mt-2 max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="max-h-[400px] overflow-y-auto">
              <div className="border-b px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Lærepladser ({results.length})
              </div>
              {results.map((school) => (
                <button
                  key={school.id}
                  onClick={() => handleSelect(school)}
                  className="w-full border-b px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900">
                        {highlightMatch(school.name, query)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <RatingStars value={school.avgRating ?? 0} />
                        <span>{school.avgRating?.toFixed(1) ?? 'N/A'}</span>
                        <span>·</span>
                        <span>{school.reviewCount ?? 0} anmeldelser</span>
                      </div>
                      {school.description && (
                        <p className="truncate text-sm text-gray-500">
                          {highlightMatch(school.description, query)}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {showResults && hasQuery && !hasResults && (
          <div className="absolute left-0 right-0 mx-auto mt-2 max-w-2xl rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500 shadow-lg">
            Ingen lærepladser fundet for "{query}"
          </div>
        )}
      </div>
    </div>
  )
}
