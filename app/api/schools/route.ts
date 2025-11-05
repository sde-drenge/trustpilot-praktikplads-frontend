import { NextResponse } from 'next/server'

// Hardcoded educational schools
const educationalSchools = [
  { id: '1', name: 'Syddansk Erhvervsskole' },
  { id: '2', name: 'ZBC - Zealand Business College' },
  { id: '3', name: 'Mercantec' },
  { id: '4', name: 'SOSU C' },
  { id: '5', name: 'TEC - Teknisk ErhvervsCenter' },
  { id: '6', name: 'Campus Vejle' },
  { id: '7', name: 'EUC Syd' },
  { id: '8', name: 'EUC Nord' },
  { id: '9', name: 'EUC Nordvest' },
  { id: '10', name: 'Roskilde Tekniske Skole' },
  { id: 'other', name: 'Andet' },
]

export async function GET() {
  const backendSchoolsUrl = process.env.BACKEND_SCHOOLS_URL

  if (backendSchoolsUrl) {
    try {
      const resp = await fetch(backendSchoolsUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!resp.ok) {
        return NextResponse.json({ schools: educationalSchools })
      }

      const data = await resp.json()
      const schools = Array.isArray(data) ? data : data.schools || []
      return NextResponse.json({ schools })
    } catch {
      return NextResponse.json({ schools: educationalSchools })
    }
  }

  return NextResponse.json({ schools: educationalSchools })
}
