import { useMemo } from 'react'
import { HeroBanner, FeaturedSection, EmulatorSection } from '@/components/organisms'
import { gamesData } from '@/data/gamesData'

const top = (list, n = 10) =>
  [...list].sort((a, b) => b.popularity - a.popularity).slice(0, n)

export default function Home() {
  const popular = useMemo(() => top(gamesData), [])
  const gba     = useMemo(() => top(gamesData.filter((g) => g.system === 'Game Boy Advance')), [])
  const nds     = useMemo(() => top(gamesData.filter((g) => g.system === 'Nintendo DS')), [])
  const ps1     = useMemo(() => top(gamesData.filter((g) => g.system === 'PlayStation 1')), [])

  return (
    <>
      <HeroBanner />
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 space-y-8 md:space-y-16">
        <FeaturedSection
          title="Mais populares"
          color="cyan"
          games={popular}
          seeMoreLink="/catalogo"
        />
        <FeaturedSection
          title="Game Boy Advance"
          color="green"
          games={gba}
          systemFilter="Game Boy Advance"
        />
        <FeaturedSection
          title="Nintendo DS"
          color="magenta"
          games={nds}
          systemFilter="Nintendo DS"
        />
        <FeaturedSection
          title="PlayStation 1"
          color="yellow"
          games={ps1}
          systemFilter="PlayStation 1"
        />
        <EmulatorSection limit={3} showLink />
      </div>
    </>
  )
}
