import { getSchoolBySlug } from '@/lib/mockDb'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const school = getSchoolBySlug(slug)
  if (!school) return new NextResponse('Not Found', { status: 404 })
  return NextResponse.json({ company: school })
}
