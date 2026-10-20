import { FilterSelect } from '@/components/molecules'
import { CATALOG_SYSTEMS, GENRES } from '@/data/gamesData'

export default function GameFilter({ filters, onChange }) {
  const set = (key) => (value) => onChange({ ...filters, [key]: value })
  return (
    <aside className="bg-bg-soft border border-white/10 rounded-xl p-4 md:p-5 space-y-4 md:space-y-5 h-fit lg:sticky lg:top-24">
      <FilterSelect label="CONSOLE" value={filters.system} onChange={set('system')} options={CATALOG_SYSTEMS} />
      <FilterSelect label="GÊNERO" value={filters.genre} onChange={set('genre')} options={GENRES} />
      <label className="block space-y-1.5">
        <span className="font-pixel text-[9px] md:text-[10px] text-neon-yellow">ORDENAR</span>
        <select
          value={filters.sort}
          onChange={(e) => set('sort')(e.target.value)}
          className="w-full bg-bg border border-white/15 rounded-md px-3 py-2 text-xs md:text-sm cursor-pointer focus:outline-none focus:border-neon-cyan"
        >
          <option value="popular">Mais populares</option>
          <option value="name">Nome A-Z</option>
          <option value="year">Ano de lançamento</option>
        </select>
      </label>
      <button
        onClick={() => onChange({ system: '', genre: '', sort: 'popular' })}
        className="text-[10px] md:text-xs text-neon-magenta underline cursor-pointer"
      >
        Limpar filtros
      </button>
    </aside>
  )
}
