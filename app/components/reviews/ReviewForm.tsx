"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

type Props = {
  schoolId: string
  canReview: boolean
  onSuccess?: () => void
}

export default function ReviewForm({ schoolId, canReview, onSuccess }: Props) {
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const ratingNum = Number(rating)
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        throw new Error('Rating skal være mellem 1 og 5')
      }
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolId,
          rating: ratingNum,
          title: title || undefined,
          body,
          studentId: 'student-1',
        }),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || 'Kunne ikke oprette anmeldelse')
      }
      setTitle('')
      setBody('')
      setRating('')
      setSuccess('Anmeldelsen er oprettet!')
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ukendt fejl')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {error && <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">{error}</div>}
      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">{success}</div>
      )}
      <div className="space-y-2">
        <Label htmlFor="title">Titel</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={!canReview} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rating">Rating (1-5)</Label>
        <Input
          id="rating"
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          disabled={!canReview}
          placeholder="5"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Anmeldelse</Label>
        <Textarea
          id="body"
          rows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Skriv din oplevelse..."
          disabled={!canReview}
        />
      </div>
      <Button type="submit" disabled={!canReview || loading}>
        {loading ? 'Sender...' : 'Send anmeldelse'}
      </Button>
    </form>
  )
}
