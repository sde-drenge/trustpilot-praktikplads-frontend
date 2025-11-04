"use client"
import { getApprovals, getReviewsBySchoolId, getSchoolBySlug } from '@/lib/mockDb'
import Image from 'next/image'
import { use, useState } from 'react'
import RatingStars from '../../components/reviews/RatingStars'
import ReviewCard from '../../components/reviews/ReviewCard'
import ReviewForm from '../../components/reviews/ReviewForm'

export default function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const currentStudentId = 'student-1'

  // Derive fresh data on each render; refreshTrigger forces re-render after submit
  const company = getSchoolBySlug(slug)
  const companyReviews = company ? getReviewsBySchoolId(company.id) : []
  const approvals = company
    ? getApprovals({ studentId: currentStudentId, schoolId: company.id })
    : []
  const canReview = !!company && approvals.length > 0

  if (!company) return null
  const displayName = company.name.replace(/læreplads/gi, '').trim()

  const handleReviewSubmitted = () => {
    // Trigger re-fetch by incrementing the trigger
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-8" key={refreshTrigger}>
      <header className="flex items-center gap-4 border-b pb-6">
        <div className="h-20 w-20 overflow-hidden rounded-lg bg-muted border">
          <Image
            src={company.logoUrl || '/images/sample-logo.png'}
            alt={displayName}
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1">{displayName}</h1>
          <p className="text-muted-foreground mb-2">{company.description}</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <RatingStars value={company.avgRating || 0} />
              <span className="font-semibold">{(company.avgRating || 0).toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {company.reviewCount || 0} anmeldelser
            </span>
          </div>
        </div>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Anmeldelser</h2>
        <div className="space-y-4">
          {companyReviews.length === 0 && (
            <p className="text-sm text-muted-foreground">Ingen anmeldelser endnu.</p>
          )}
          {companyReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="mb-4 text-2xl font-semibold">Skriv en anmeldelse</h2>
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
