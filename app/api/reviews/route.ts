import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

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
    const session = (await getServerSession()) as SessionWithToken | null
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
  const session = (await getServerSession()) as SessionWithToken | null

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Ikke logget ind' }, { status: 401 })
  }

  const body = await req.json()
  const { companyId, schoolId, school, rating, body: content, title } = body || {}

  const id = companyId || schoolId || school

  if (!id || !rating || !content) {
    return NextResponse.json({ error: 'Mangler påkrævede felter' }, { status: 400 })
  }

  const backendReviewsUrl = process.env.BACKEND_REVIEWS_URL

  if (!backendReviewsUrl) {
    return NextResponse.json({ error: 'Backend ikke konfigureret' }, { status: 500 })
  }

  try {
    const resp = await fetch(backendReviewsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(session as SessionWithToken).accessToken}`,
      },
      body: JSON.stringify({
        companyId: id,
        rating,
        content: content,
        title: title || 'Ingen titel',
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
