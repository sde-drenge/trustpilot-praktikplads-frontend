import { educationalInstitutions } from '@/lib/mockDb'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ schools: educationalInstitutions })
}
