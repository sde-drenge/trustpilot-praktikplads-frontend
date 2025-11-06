import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

interface SessionWithToken {
  accessToken?: string
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const companyId = searchParams.get('companyId') || searchParams.get('schoolId')

  const backendReviewsUrl = process.env.BACKEND_REVIEWS_URL

  if (!backendReviewsUrl) {
    return NextResponse.json({ reviews: [] })
  }

  try {
    const session = (await getServerSession(authOptions)) as SessionWithToken | null
    const headers: Record<string, string> = {}

    if (session?.accessToken) {
      headers['Authorization'] = `Bearer ${session.accessToken}`
    }

    const url = companyId ? `${backendReviewsUrl}?companyId=${companyId}` : backendReviewsUrl

    const resp = await fetch(url, { headers })

    if (!resp.ok) {
      return NextResponse.json({ reviews: [] })
    }

    const reviews = await resp.json()
    return NextResponse.json({ reviews })
  } catch {
    return NextResponse.json({ reviews: [] })
  }
}

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions)) as SessionWithToken | null

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Ikke logget ind' }, { status: 401 })
  }

  const body = await req.json()
  const { rating, body: content, title } = body || {}

  if (!rating || !content) {
    return NextResponse.json({ error: 'Mangler påkrævede felter' }, { status: 400 })
  }

  const backendCreateReviewUrl = process.env.BACKEND_CREATE_REVIEW_URL

  if (!backendCreateReviewUrl) {
    return NextResponse.json({ error: 'Backend ikke konfigureret' }, { status: 500 })
  }

  try {
    const resp = await fetch(backendCreateReviewUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(session as SessionWithToken).accessToken}`,
      },
      body: JSON.stringify({
        title: title || 'Ingen titel',
        content: content,
        rating,
        isApproved: true,
      }),
    })

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}))
      return NextResponse.json(
        { error: errorData.error || 'Kunne ikke oprette anmeldelse' },
        { status: resp.status },
      )
    }

    const review = await resp.json()
    return NextResponse.json({ review }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Netværksfejl' }, { status: 500 })
  }
}
