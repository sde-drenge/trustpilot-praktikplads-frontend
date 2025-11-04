"use client"
import RatingStars from '@/app/components/reviews/RatingStars'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Page() {
  const [companies, setCompanies] = useState<School[]>([])

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/companies')
      const data = await res.json()
      setCompanies(data.companies || [])
    }
    load()
  }, [])

  return (
    <main className="mx-auto max-w-4xl p-6">
      <section className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Anmeldelser</h1>
          <p className="text-sm">Vælg en virksomhed for at se anmeldelser.</p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {companies.map((s) => {
            const displayName = s.name.replace(/læreplads/gi, '').trim()
            return (
              <Link key={s.id} href={`/company/${s.slug}`} className="block">
                <Card className="hover:shadow transition">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {s.logoUrl ? (
                        <Image src={s.logoUrl} alt={displayName} width={56} height={56} className="rounded" />
                      ) : (
                        <div className="bg-muted h-14 w-14 rounded" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{displayName}</div>
                        <div className="text-muted-foreground text-sm line-clamp-2">{s.description}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <RatingStars value={s.avgRating || 0} />
                          <span className="text-sm font-medium">{(s.avgRating || 0).toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">({s.reviewCount || 0} anmeldelser)</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
