import { NextResponse } from 'next/server'

interface DjangoSchool {
  uuid?: string
  id?: string
  name: string
  domain: string
  isActive?: boolean
  description?: string
}

export async function GET() {
  const backendSchoolsUrl = process.env.BACKEND_SCHOOLS_URL

  if (!backendSchoolsUrl) {
    return NextResponse.json({ error: 'Backend schools URL ikke konfigureret' }, { status: 500 })
  }

  try {
    const resp = await fetch(backendSchoolsUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!resp.ok) {
      throw new Error('Django schools endpoint fejlede')
    }

    const data = await resp.json()
    
    // Transform Django data til frontend format
    const schools = Array.isArray(data) ? data.map((school: DjangoSchool) => ({
      id: school.uuid || school.id,
      name: school.name,
      domain: school.domain,
    })) : (data.schools || [])

    return NextResponse.json({ schools })
  } catch (error) {
    console.error('Fejl ved hentning af skoler:', error)
    return NextResponse.json({ error: 'Kunne ikke hente skoler fra backend' }, { status: 500 })
  }
}
