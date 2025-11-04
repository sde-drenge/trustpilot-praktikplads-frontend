import { addUser, findUser } from '@/lib/users'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password, schoolId } = await req.json()
  const exists = findUser(email)
  if (exists) {
    return NextResponse.json({ error: 'Bruger findes allerede' }, { status: 400 })
  }
  addUser(email, password, undefined, schoolId)
  return NextResponse.json({ success: true })
}
