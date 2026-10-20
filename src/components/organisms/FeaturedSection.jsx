import { Heading } from '@/components/atoms'
import GameGrid from './GameGrid'

export default function FeaturedSection({ title, color = 'cyan', games }) {
  return (
    <section className="space-y-6">
      <Heading level={2} color={color}>{title}</Heading>
      <GameGrid games={games} />
    </section>
  )
}
