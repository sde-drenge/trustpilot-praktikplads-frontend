import { NextResponse } from 'next/server'

interface DjangoCompany {
  uuid: string
  name: string
  description: string
  website: string
  vat_number: string
  createdAt: string
  updatedAt: string
}

export async function GET() {
  const backendCompaniesUrl = process.env.BACKEND_COMPANIES_URL

  if (!backendCompaniesUrl) {
    return NextResponse.json({ companies: [] })
  }

  try {
    const resp = await fetch(backendCompaniesUrl, {
      cache: 'no-store',
    })

    if (!resp.ok) {
      return NextResponse.json({ companies: [] })
    }

    const djangoCompanies: DjangoCompany[] = await resp.json()

    const companies = djangoCompanies.map((c) => ({
      id: c.uuid,
      slug: c.name.toLowerCase().replace(/\s+/g, '-') + '-laereplads',
      name: c.name + ' læreplads',
      category: 'Detailhandel',
      rating: 0,
      avgRating: 0,
      reviewCount: 0,
      description: c.description,
      location: 'Danmark',
      imageUrl: '',
      website: c.website,
      vat_number: c.vat_number,
    }))

    return NextResponse.json({ companies })
  } catch (error) {
    console.error('Failed to fetch companies:', error)
    return NextResponse.json({ companies: [] })
  }
}
