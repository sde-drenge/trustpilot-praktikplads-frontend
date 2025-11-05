import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RatingStars from './RatingStars'

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RatingStars value={review.rating} />
            {review.title && <CardTitle className="text-lg">{review.title}</CardTitle>}
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString('da-DK')}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-sm">{review.body}</p>
        {review.author && (
          <div className="mt-3 text-xs text-muted-foreground">Af {review.author}</div>
        )}
      </CardContent>
    </Card>
  )
}
