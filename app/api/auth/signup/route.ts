import { addUser, findUser } from '@/lib/users'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password, name, schoolId } = await req.json()

  const backendSignupUrl = process.env.BACKEND_SIGNUP_URL
  if (backendSignupUrl) {
    try {
      const resp = await fetch(backendSignupUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ email, password, password2: password, name }),
      })
      const text = await resp.text()
      if (!resp.ok) {
        return new NextResponse(text || 'Signup failed', { status: resp.status })
      }
      return new NextResponse(text || JSON.stringify({ success: true }), { status: 201 })
    } catch {
      return new NextResponse('Signup service unavailable', { status: 502 })
    }
  }

  const exists = findUser(email)
  if (exists) {
    return NextResponse.json({ error: 'Bruger findes allerede' }, { status: 400 })
  }

  addUser(email, password, name, schoolId)
  return NextResponse.json({ success: true })
}
