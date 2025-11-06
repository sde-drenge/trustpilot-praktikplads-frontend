"use client"
import { canReviewCompany, getCompanyBySlug } from '@/lib/data'
import { use, useEffect, useState } from 'react'
import Logo from '../../components/companies/logo'
import RatingStars from '../../components/reviews/RatingStars'
import ReviewCard from '../../components/reviews/ReviewCard'
import ReviewForm from '../../components/reviews/ReviewForm'

interface DjangoReview {
  id: string
  title: string
  content: string
  rating: number
  isApproved: boolean
  createdAt?: string
}

export default function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const company = getCompanyBySlug(slug)
  const canReview = canReviewCompany(slug)

  useEffect(() => {
    if (!company) return
    
    async function fetchReviews() {
      setLoading(true)
      try {
        const res = await fetch(`/api/reviews?companyId=${company!.id}`)
        if (res.ok) {
          const data = await res.json()
          const djangoReviews: DjangoReview[] = data.reviews || []
          const mappedReviews: Review[] = djangoReviews
            .filter(r => r.isApproved)
            .map(r => ({
              id: r.id,
              schoolId: company!.id,
              rating: r.rating,
              title: r.title,
              body: r.content,
              author: 'Anonym elev',
              createdAt: r.createdAt || new Date().toISOString(),
            }))
          setReviews(mappedReviews)
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchReviews()
  }, [company, refreshTrigger])

  if (!company) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Virksomhed ikke fundet</h1>
        <p className="text-gray-600 mt-2">Denne læreplads eksisterer ikke eller er ikke tilgængelig.</p>
      </div>
    )
  }
  
  const displayName = company.name.replace(/læreplads/gi, '').trim()

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0

  const handleReviewSubmitted = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-8" key={refreshTrigger}>
      <header className="flex items-center gap-4 border-b pb-6">
        <Logo name={displayName} size={80} />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1 text-gray-900">{displayName}</h1>
          <p className="text-gray-600 mb-2">{company.description}</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <RatingStars value={avgRating} />
              <span className="font-semibold text-gray-900">{avgRating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500">
              {reviews.length} {reviews.length === 1 ? 'anmeldelse' : 'anmeldelser'}
            </span>
          </div>
        </div>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Anmeldelser</h2>
        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-gray-500">Henter anmeldelser...</p>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-gray-500">Ingen anmeldelser endnu.</p>
          ) : (
            reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Skriv en anmeldelse</h2>
        {canReview ? (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-green-800">
              Din lærer har givet dig tilladelse til at skrive en anmeldelse af denne læreplads.
            </p>
          </div>
        ) : (
          <div className="mb-4 rounded-lg bg-amber-50 border border-amber-200 p-4">
            <p className="text-sm text-amber-800">
              Du skal have godkendelse fra en lærer for at kunne skrive en anmeldelse af denne læreplads.
            </p>
          </div>
        )}
        <ReviewForm schoolId={company.id} canReview={canReview} onSuccess={handleReviewSubmitted} />
      </section>
    </div>
  )
}

