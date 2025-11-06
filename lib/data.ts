export interface Company {
  id: string
  slug: string
  name: string
  category: string
  rating: number
  avgRating: number
  reviewCount: number
  description: string
  location: string
  imageUrl: string
}

export interface Review {
  id: string
  author: string
  authorSchool: string
  rating: number
  title: string
  body: string
  date: string
  helpful: number
}

export const companies: Company[] = [
  {
    id: 'netto-laereplads',
    slug: 'netto-laereplads',
    name: 'Netto Læreplads',
    category: 'Detailhandel',
    rating: 0,
    avgRating: 0,
    reviewCount: 0,
    description:
      'Lær detailhandel hos Danmarks førende discountkæde. Du få erfaring med kassearbejde, varemodtagelse og kundeservice.',
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

export const reviews: Record<string, Review[]> = {
  'netto-laereplads': [],
  'elgiganten-laereplads': [],
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug)
}

export function getCompanyById(id: string): Company | undefined {
  return companies.find((c) => c.id === id)
}

export function getReviewsByCompanyId(companyId: string): Review[] {
  return reviews[companyId] || []
}

export function addReview(companyId: string, review: Review): void {
  if (!reviews[companyId]) {
    reviews[companyId] = []
  }
  reviews[companyId].unshift(review)

  const company = getCompanyById(companyId)
  if (company) {
    company.reviewCount = reviews[companyId].length
    const totalRating = reviews[companyId].reduce((sum, r) => sum + r.rating, 0)
    company.avgRating = totalRating / company.reviewCount
    company.rating = company.avgRating
  }
}

export const approvedCompanies = ['netto-laereplads']

export function canReviewCompany(companySlug: string): boolean {
  return approvedCompanies.includes(companySlug)
}
