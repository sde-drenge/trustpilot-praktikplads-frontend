import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) {
    return new NextResponse('Missing email', { status: 400 })
  }

  const backendPromoteUrl = process.env.BACKEND_PROMOTE_URL
  if (!backendPromoteUrl) {
    return new NextResponse('Promotion endpoint not configured', { status: 501 })
  }

  try {
    const resp = await fetch(backendPromoteUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const text = await resp.text()
    return new NextResponse(text || '', { status: resp.status })
  } catch {
    return new NextResponse('Promotion service unavailable', { status: 502 })
  }
}
