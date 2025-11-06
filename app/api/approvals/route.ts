import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

const approvals: Record<string, string[]> = {
  'ikhvan95@gmail.com': ['netto-laereplads'],
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ canReview: false, companies: [] })
  }

  const { searchParams } = new URL(req.url)
  const companySlug = searchParams.get('companySlug')

  const userEmail = session.user.email
  const allowedCompanies = approvals[userEmail] || []

  if (companySlug) {
    return NextResponse.json({
      canReview: allowedCompanies.includes(companySlug),
    })
  }

  return NextResponse.json({
    companies: allowedCompanies,
  })
}
