import { addReview, getReviewsByCompanyId, type Review } from '@/lib/data'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const companyId = searchParams.get('companyId') || searchParams.get('schoolId')

  if (!companyId) {
    return NextResponse.json({ reviews: [] })
  }

  const reviews = getReviewsByCompanyId(companyId)
  return NextResponse.json({ reviews })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { companyId, schoolId, school, rating, body: content, title, author } = body || {}

  // Accepter companyId, schoolId eller school
  const id = companyId || schoolId || school

  if (!id || !rating || !content) {
    return NextResponse.json({ error: 'Mangler påkrævede felter' }, { status: 400 })
  }

  const newReview: Review = {
    id: Date.now().toString(),
    author: author || 'Anonym',
    authorSchool: 'Syddansk Erhvervsskole',
    rating,
    title: title || 'Ingen titel',
    body: content,
    date: new Date().toISOString().split('T')[0],
    helpful: 0,
  }

  addReview(id, newReview)

  return NextResponse.json({ review: newReview }, { status: 201 })
}
