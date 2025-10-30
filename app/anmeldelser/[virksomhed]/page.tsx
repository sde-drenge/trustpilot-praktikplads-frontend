import { Star } from 'lucide-react'

import { reviews, schools } from '@/app/data/mock'
import { Button } from '@/components/ui/button'
import type { Review } from '@/types'

type Props = {
  params: { virksomhed: string }
}

export default function Page({ params }: Props) {
  const school = schools.find((s) => s.slug === params.virksomhed)
  const schoolReviews = reviews.filter((r) => r.schoolId === school?.id)

  if (!school) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-center text-lg">Virksomhed ikke fundet</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8 flex items-start gap-6 border-b pb-6">
        <div className="h-24 w-24 shrink-0 rounded-lg border bg-gray-100" />
        
        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold">{school.name}</h1>
          <div className="mb-1 flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(school.avgRating || 0)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-1 text-lg font-semibold">{school.avgRating?.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-600">{school.reviewCount} anmeldelser</p>
          {school.description && (
            <p className="mt-3 text-gray-700">{school.description}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <Button size="lg" className="w-full sm:w-auto">
          Skriv en anmeldelse
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Anmeldelser</h2>
        
        {schoolReviews.length === 0 ? (
          <div className="rounded-lg border bg-gray-50 p-8 text-center">
            <p className="text-gray-600">Ingen anmeldelser endnu</p>
          </div>
        ) : (
          <div className="space-y-4">
            {schoolReviews.map((review: Review) => (
              <div key={review.id} className="rounded-lg border p-6">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('da-DK')}
                  </span>
                </div>
                
                {review.title && (
                  <h3 className="mb-2 font-semibold">{review.title}</h3>
                )}
                
                <p className="text-gray-700">{review.body}</p>
                
                {review.author && (
                  <p className="mt-3 text-sm text-gray-500">{review.author}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
