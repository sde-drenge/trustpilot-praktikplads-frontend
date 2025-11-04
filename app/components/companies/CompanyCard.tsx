import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import RatingStars from '../reviews/RatingStars'

export default function CompanyCard({ company }: { company: School }) {
  const displayName = company.name.replace(/læreplads/gi, '').trim()
  return (
    <Link href={`/company/${company.slug}`} className="block">
      <Card className="hover:shadow transition">
        <CardContent className="p-4">
          <div className="font-semibold">{displayName}</div>
          <div className="text-sm text-muted-foreground line-clamp-2">{company.description}</div>
          <div className="mt-2 flex items-center gap-2">
            <RatingStars value={company.avgRating || 0} />
            <span className="text-sm font-medium">{(company.avgRating || 0).toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({company.reviewCount || 0} anmeldelser)</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
