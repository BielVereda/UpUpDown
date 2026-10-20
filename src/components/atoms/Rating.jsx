import { Star } from 'lucide-react'

export default function Rating({ value = 0 }) {
  return (
    <span className="inline-flex items-center gap-1 text-neon-yellow text-xs font-semibold">
      <Star size={14} fill="currentColor" /> {value.toFixed(1)}
    </span>
  )
}
