import React from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { reviews, schools } from "@/app/data/mock"
import RatingStars from "@/app/components/reviews/RatingStars"
import type { Review, School } from "@/types"

type Props = {
  params: { virksomhed: string }
}

function formatDate(iso?: string) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
}

export default function Page({ params }: Props) {
  const slug = params?.virksomhed
  const school: School | undefined = schools.find((s) => s.slug === slug)
  const schoolReviews: Review[] = reviews.filter((r) => r.schoolId === school?.id)

  return (
    <main className="max-w-4xl mx-auto p-6">
      {!school ? (
        <div className="py-16 text-center">Virksomhed ikke fundet</div>
      ) : (
        <section className="space-y-6">
          <header className="flex items-center gap-4">
            {school.logoUrl ? (
              <Image src={school.logoUrl} alt={school.name} width={64} height={64} className="rounded-md" />
            ) : (
              <div className="w-16 h-16 bg-muted rounded-md" />
            )}

            <div>
              <h1 className="text-2xl font-semibold">{school.name}</h1>
              <div className="text-sm text-muted-foreground">
                <RatingStars value={school.avgRating} /> {school.avgRating} · {school.reviewCount} anmeldelser
              </div>
            </div>
          </header>

          <div className="flex gap-2">
            <Input placeholder="Søg anmeldelser... (jeg laver søgningen senere)" />
            <Button variant="outline">Søg</Button>
          </div>

          <div className="space-y-4">
            {schoolReviews.length === 0 ? (
              <div className="p-4 border rounded">Ingen anmeldelser endnu.</div>
            ) : (
              schoolReviews.map((r) => (
                <article key={r.id} className="p-4 border rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RatingStars value={r.rating} />
                      <div className="font-medium">{r.title ?? "Ingen titel"}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{formatDate(r.createdAt)}</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                  {r.author && <div className="mt-2 text-xs text-muted-foreground">— {r.author}</div>}
                </article>
              ))
            )}
          </div>
        </section>
      )}
    </main>
  )
}
