import { NextResponse } from 'next/server'

// Hardcoded companies indtil Django endpoint er klar
const hardcodedCompanies = [
  {
    id: 'netto-laereplads',
    slug: 'netto-laereplads',
    name: 'Netto Læreplads',
    category: 'Detailhandel',
    rating: 0,
    avgRating: 0,
    reviewCount: 0,
    description:
      'Lær detailhandel hos Danmarks førende discountkæde. Du får erfaring med kassearbejde, varemodtagelse og kundeservice.',
    location: 'Esbjerg',
    imageUrl: '/images/companylogo.jpg',
  },
  {
    id: 'elgiganten-laereplads',
    slug: 'elgiganten-laereplads',
    name: 'Elgiganten Læreplads',
    category: 'Elektronik & Teknologi',
    rating: 0,
    avgRating: 0,
    reviewCount: 0,
    description:
      'Bliv teknologiekspert hos Nordens største elektronikkæde. Du arbejder med produktrådgivning og teknisk support.',
    location: 'Aalborg',
    imageUrl: '/images/companylogo.jpg',
  },
]

export async function GET() {
  // Returner hardcoded data indtil Django er klar
  return NextResponse.json({ companies: hardcodedCompanies })
}
