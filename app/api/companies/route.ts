import { getSchools } from '@/lib/mockDb'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = getSchools()
  return NextResponse.json({ companies: data })
}
