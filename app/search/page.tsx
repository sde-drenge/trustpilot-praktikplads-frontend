"use client"
import CompanyCard from '@/app/components/companies/CompanyCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useMemo, useState } from 'react'

export default function SearchPage() {
  const [q, setQ] = useState('')
  const [companies, setCompanies] = useState<School[]>([])

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/companies')
      const data = await res.json()
      setCompanies(data.companies || [])
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return companies
    return companies.filter((c) => {
      const nameWithoutLaereplads = c.name
        .replace(/læreplads/gi, "")
        .trim()
        .toLowerCase()
      return nameWithoutLaereplads.includes(term)
    })
  }, [q, companies])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Søg læreplads</h1>
      <div className="mb-6 flex gap-2">
        <Input
          placeholder="Søg efter læreplads..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button type="button">Søg</Button>
      </div>

      <ul className="space-y-3">
        {filtered.map((c) => (
          <li key={c.id}>
            <CompanyCard company={c} />
          </li>
        ))}
      </ul>
    </div>
  )
}
