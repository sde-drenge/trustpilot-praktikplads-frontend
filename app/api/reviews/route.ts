import { NextResponse } from 'next/server'

interface Review {
  id: string
  author: string
  authorSchool: string
  rating: number
  title: string
  body: string
  date: string
  helpful: number
}

// Hardcoded reviews indtil Django endpoint er klar
const hardcodedReviews: Record<string, Review[]> = {
  'netto-laereplads': [
    {
      id: '1',
      author: 'Mads Hansen',
      authorSchool: 'Syddansk Erhvervsskole',
      rating: 5,
      title: 'Fantastisk læreplads!',
      body: 'Jeg har lært enormt meget om detailhandel. Gode kollegaer og god uddannelse.',
      date: '2024-10-15',
      helpful: 12,
    },
    {
      id: '2',
      author: 'Laura Nielsen',
      authorSchool: 'ZBC',
      rating: 4,
      title: 'Rigtig godt sted at lære',
      body: 'Mange udfordringer og godt arbejdsmiljø. Kan varmt anbefales!',
      date: '2024-09-20',
      helpful: 8,
    },
    {
      id: '3',
      author: 'Peter Jensen',
      authorSchool: 'Mercantec',
      rating: 5,
      title: 'Kan varmt anbefales',
      body: 'Super lærerig praktik med mange spændende opgaver.',
      date: '2024-08-10',
      helpful: 15,
    },
  ],
  'stark-byg-laereplads': [
    {
      id: '4',
      author: 'Jonas Andersen',
      authorSchool: 'Syddansk Erhvervsskole',
      rating: 5,
      title: 'Perfekt for byggeinteresserede',
      body: 'Lærer alt om byggematerialer og får håndværkerfaglig indsigt.',
      date: '2024-09-01',
      helpful: 6,
    },
    {
      id: '5',
      author: 'Emma Christensen',
      authorSchool: 'Mercantec',
      rating: 4,
      title: 'Godt læringsmiljø',
      body: 'Meget professionelt miljø med gode mentorer.',
      date: '2024-10-05',
      helpful: 4,
    },
  ],
  'elgiganten-laereplads': [
    {
      id: '6',
      author: 'Mikkel Sørensen',
      authorSchool: 'ZBC',
      rating: 4,
      title: 'Tech paradise!',
      body: 'Perfekt hvis du elsker teknologi og gadgets.',
      date: '2024-09-15',
      helpful: 10,
    },
    {
      id: '7',
      author: 'Sofia Rasmussen',
      authorSchool: 'Syddansk Erhvervsskole',
      rating: 5,
      title: 'Meget lærerig',
      body: 'Får rigtig god indsigt i elektronikbranchen.',
      date: '2024-08-25',
      helpful: 7,
    },
    {
      id: '8',
      author: 'Oliver Petersen',
      authorSchool: 'Mercantec',
      rating: 4,
      title: 'Spændende arbejdsplads',
      body: 'Mange forskellige opgaver og god læring.',
      date: '2024-07-30',
      helpful: 5,
    },
    {
      id: '9',
      author: 'Ida Larsen',
      authorSchool: 'ZBC',
      rating: 4,
      title: 'Godt arbejdsmiljø',
      body: 'Søde kollegaer og godt team.',
      date: '2024-10-20',
      helpful: 3,
    },
    {
      id: '10',
      author: 'Lucas Nielsen',
      authorSchool: 'Syddansk Erhvervsskole',
      rating: 5,
      title: 'Anbefales!',
      body: 'Super fed praktik med masser af ansvar.',
      date: '2024-09-05',
      helpful: 9,
    },
  ],
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const companyId = searchParams.get('companyId') || searchParams.get('schoolId')

  if (!companyId) {
    return NextResponse.json({ reviews: [] })
  }

  const reviews = hardcodedReviews[companyId] || []
  return NextResponse.json({ reviews })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { companyId, schoolId, school, rating, body: content, title, author } = body || {}
  
  // Accepter companyId, schoolId eller school
  const id = companyId || schoolId || school

  if (!id || !rating || !content) {
    return NextResponse.json({ error: 'Mangler påkrævede felter' }, { status: 400 })
  }

  // For nu: godkend altid (ingen approval check)
  // Tilføj review til hardcoded data
  const newReview = {
    id: Date.now().toString(),
    author: author || 'Anonym',
    authorSchool: 'Syddansk Erhvervsskole',
    rating,
    title: title || 'Ingen titel',
    body: content,
    date: new Date().toISOString().split('T')[0],
    helpful: 0,
  }

  if (!hardcodedReviews[id]) {
    hardcodedReviews[id] = []
  }
  hardcodedReviews[id].unshift(newReview)

  return NextResponse.json({ review: newReview }, { status: 201 })
}
