import { GameCard } from '@/components/molecules'
import { useAppStore } from '@/store/useAppStore'

export default function GameGrid({ games }) {
  const openGame = useAppStore((s) => s.openGame)

  if (!games.length) {
    return <p className="text-center text-ink-muted py-16 font-pixel text-xs">NENHUM JOGO ENCONTRADO :(</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
      {games.map((g) => <GameCard key={g.id} game={g} onClick={openGame} />)}
    </div>
  )
}
