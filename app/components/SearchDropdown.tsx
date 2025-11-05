"use client"

import RatingStars from "@/app/components/reviews/RatingStars"
import { Input } from "@/components/ui/input"
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
  const [companies, setCompanies] = useState<Company[]>([])
  const [results, setResults] = useState<Company[]>([])
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
    async function load() {
      try {
        const res = await fetch('/api/companies')
        const data = await res.json()
  setCompanies((data?.companies as Company[]) || [])
      } catch {
        setCompanies([])
      }
    }
    load()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const lowerQuery = query.trim().toLowerCase()
      
      if (!lowerQuery) {
        setResults([])
        setShowResults(false)
        return
      }
      
      const filtered = companies.filter((company) => {
        const nameWithoutLaereplads = company.name
          .replace(/læreplads/gi, "")
          .trim()
          .toLowerCase()
        return nameWithoutLaereplads.includes(lowerQuery)
      })
      
      // Sorter resultater: først dem der starter med søgeteksten, derefter alfabetisk
      const sorted = filtered.sort((a, b) => {
        const aName = a.name.replace(/læreplads/gi, "").trim().toLowerCase()
        const bName = b.name.replace(/læreplads/gi, "").trim().toLowerCase()
        
        const aStarts = aName.startsWith(lowerQuery)
        const bStarts = bName.startsWith(lowerQuery)
        
        // Hvis kun den ene starter med søgeteksten, prioriter den
        if (aStarts && !bStarts) return -1
        if (!aStarts && bStarts) return 1
        
        // Ellers sorter alfabetisk
        return aName.localeCompare(bName)
      })
      
      setResults(sorted)
      setShowResults(true)
    }, 200)
    
    return () => clearTimeout(timer)
  }, [query, companies])

  const handleSelect = (school: Company) => {
    setShowResults(false)
    setQuery("")
    router.push(`/company/${school.slug}`)
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
            placeholder="Søg efter en virksomhed"
            className="h-16 w-full rounded-full border border-gray-200 bg-white px-8 text-lg text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary"
          />
        </form>

        {showResults && hasResults && (
          <div className="absolute left-0 right-0 mx-auto mt-2 max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="max-h-[400px] overflow-y-auto">
              <div className="border-b px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Virksomheder ({results.length})
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
                        {highlightMatch(
                          
                          school.name.replace(/læreplads/gi, "").replace(/\s{2,}/g, " ").trim(),
                          query
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <RatingStars value={school.avgRating ?? 0} />
                        <span>{school.avgRating !== undefined ? school.avgRating.toFixed(1) : 'N/A'}</span>
                        <span>·</span>
                        <span>{school.reviewCount ?? 0} anmeldelser</span>
                      </div>
                      
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {showResults && hasQuery && !hasResults && (
          <div className="absolute left-0 right-0 mx-auto mt-2 max-w-2xl rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500 shadow-lg">
            Ingen virksomheder fundet for "{query}"
          </div>
        )}
      </div>
    </div>
  )
}
