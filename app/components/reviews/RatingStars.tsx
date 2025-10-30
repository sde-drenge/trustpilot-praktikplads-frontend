import React from "react"

type RatingStarsProps = {
  value?: number
  max?: number
}

export default function RatingStars({ value = 0, max = 5 }: RatingStarsProps) {
  const filled = Math.round(value)
  return (
    <span aria-hidden className="inline-flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className="text-yellow-500">
          {i < filled ? "★" : "☆"}
        </span>
      ))}
    </span>
  )
}
