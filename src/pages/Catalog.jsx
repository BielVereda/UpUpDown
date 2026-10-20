import { useEffect, useMemo, useState } from 'react'
import { Heading } from '@/components/atoms'
import { GameFilter, GameGrid } from '@/components/organisms'
import { CatalogLayout } from '@/components/templates'
import { gamesData } from '@/data/gamesData'
import { useAppStore } from '@/store/useAppStore'

export default function Catalog() {
  const search = useAppStore((s) => s.search)
  const [filters, setFilters] = useState({ system: '', genre: '', sort: 'popular' })
  const [allGames, setAllGames] = useState(gamesData)

  // Tenta buscar da API; se falhar, usa os dados estáticos
  useEffect(() => {
    fetch('/api/games')
      .then((res) => { if (res.ok) return res.json(); throw new Error('API unavailable') })
      .then(setAllGames)
      .catch(() => setAllGames(gamesData))
  }, [])

  const games = useMemo(() => {
    const q = search.trim().toLowerCase()
    const list = allGames.filter(
      (g) =>
        (!filters.system || g.system === filters.system) &&
        (!filters.genre || g.genre === filters.genre) &&
        (!q || g.title.toLowerCase().includes(q))
    )
    const sorters = {
      popular: (a, b) => b.popularity - a.popularity,
      name: (a, b) => a.title.localeCompare(b.title),
      year: (a, b) => (a.year ?? 9999) - (b.year ?? 9999),
    }
    return list.sort(sorters[filters.sort])
  }, [search, filters, allGames])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 space-y-6 md:space-y-8">
      <div className="space-y-2">
        <Heading level={1} color="cyan">Catálogo</Heading>
        <p className="text-ink-muted text-xs md:text-sm">{games.length} jogo(s) encontrado(s)</p>
      </div>
      <CatalogLayout sidebar={<GameFilter filters={filters} onChange={setFilters} />}>
        <GameGrid games={games} />
      </CatalogLayout>
    </div>
  )
}
