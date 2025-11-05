import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import RatingStars from '../reviews/RatingStars'
import Logo from './logo'

export default function CompanyCard({ company }: { company: Company }) {
  const displayName = company.name.replace(/læreplads/gi, '').trim()
  return (
    <Link href={`/company/${company.slug}`} className="block">
      <Card className="hover:shadow transition">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <Logo name={displayName} size={48} />
            <div className="flex-1">
              <div className="font-semibold">{displayName}</div>
              <div className="flex items-center gap-2 mt-1">
                <RatingStars value={company.avgRating || 0} />
                <span className="text-sm font-medium">{(company.avgRating || 0).toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({company.reviewCount || 0} anmeldelser)</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground line-clamp-2">{company.description}</div>
        </CardContent>
      </Card>
    </Link>
  )
}
