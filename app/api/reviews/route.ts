import { addReview, getApprovals, getReviewsBySchoolId } from '@/lib/mockDb'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const schoolId = searchParams.get('schoolId')
  if (!schoolId) return NextResponse.json({ reviews: [] })
  const data = getReviewsBySchoolId(schoolId)
  return NextResponse.json({ reviews: data })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { schoolId, rating, body: content, title, author, studentId } = body || {}

  if (!schoolId || !studentId || !rating || !content) {
    return new NextResponse('Missing required fields', { status: 400 })
  }

  const approved = getApprovals({ studentId, schoolId })
  if (approved.length === 0) {
    return new NextResponse('Student not approved for this company', { status: 403 })
  }

  const created = addReview({ schoolId, rating, body: content, title, author })
  return NextResponse.json({ review: created }, { status: 201 })
}
