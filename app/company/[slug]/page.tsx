"use client"
import { use, useState } from 'react'
import Logo from '../../components/companies/logo'
import RatingStars from '../../components/reviews/RatingStars'
import ReviewForm from '../../components/reviews/ReviewForm'

interface Company {
  id: string;
  name: string;
  category: string;
  avgRating: number;
  reviewCount: number;
  description: string;
  location: string;
  imageUrl: string;
}

// Hardcoded companies data
const hardcodedCompanies: Record<string, Company> = {
  'netto-laereplads': {
    id: 'netto-laereplads',
    name: 'Netto Læreplads',
    category: 'Detailhandel',
    avgRating: 0,
    reviewCount: 0,
    description: 'Lær detailhandel hos Danmarks førende discountkæde. Du får erfaring med kassearbejde, varemodtagelse og kundeservice.',
    location: 'Esbjerg',
    imageUrl: '/images/companylogo.jpg'
  },
  'elgiganten-laereplads': {
    id: 'elgiganten-laereplads',
    name: 'Elgiganten Læreplads',
    category: 'Elektronik & Teknologi',
    avgRating: 0,
    reviewCount: 0,
    description: 'Bliv teknologiekspert hos Nordens største elektronikkæde. Du arbejder med produktrådgivning og teknisk support.',
    location: 'Aalborg',
    imageUrl: '/images/companylogo.jpg'
  }
};

export default function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const company = hardcodedCompanies[slug]
  // Kun Netto er godkendt - Elgiganten er IKKE godkendt
  const canReview = slug === 'netto-laereplads'

  if (!company) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Virksomhed ikke fundet</h1>
        <p className="text-gray-600 mt-2">Denne læreplads eksisterer ikke eller er ikke tilgængelig.</p>
      </div>
    )
  }
  
  const displayName = company.name.replace(/læreplads/gi, '').trim()

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
              <RatingStars value={0} />
              <span className="font-semibold text-gray-900">0.0</span>
            </div>
            <span className="text-sm text-gray-500">
              0 anmeldelser
            </span>
          </div>
        </div>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">Anmeldelser</h2>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Ingen anmeldelser endnu.</p>
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

