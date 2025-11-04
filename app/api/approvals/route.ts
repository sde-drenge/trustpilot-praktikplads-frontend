import { addApproval, getApprovals } from '@/lib/mockDb'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId') || undefined
  const schoolId = searchParams.get('schoolId') || undefined
  const data = getApprovals({ studentId, schoolId })
  return NextResponse.json({ approvals: data })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { studentId, schoolId, approvedByTeacherId } = body || {}
  if (!studentId || !schoolId || !approvedByTeacherId) {
    return new NextResponse('Missing required fields', { status: 400 })
  }
  const created = addApproval({ studentId, schoolId, approvedByTeacherId })
  return NextResponse.json({ approval: created }, { status: 201 })
}
