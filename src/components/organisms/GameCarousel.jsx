import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { GameCard } from '@/components/molecules'
import { useAppStore } from '@/store/useAppStore'

/**
 * Carrossel horizontal de jogos.
 * @param {Array}   games        — lista de jogos
 * @param {string}  accentColor  — 'cyan' | 'magenta' | 'yellow' | 'green'
 * @param {string}  [systemFilter] — se informado, filtra o catálogo por este console
 * @param {string}  [seeMoreLink]  — rota explícita para o botão "Ver todos" (ex: '/catalogo')
 */
export default function GameCarousel({ games, accentColor = 'cyan', systemFilter, seeMoreLink }) {
  const openGame = useAppStore((s) => s.openGame)
  const navigate = useNavigate()
  const trackRef = useRef(null)

  const scroll = (dir) => {
    if (!trackRef.current) return
    const amount = trackRef.current.clientWidth * 0.75
    trackRef.current.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const arrowColor = {
    cyan:    'text-neon-cyan    border-neon-cyan    hover:bg-neon-cyan/10    hover:shadow-neon-cyan',
    magenta: 'text-neon-magenta border-neon-magenta hover:bg-neon-magenta/10 hover:shadow-neon-magenta',
    yellow:  'text-neon-yellow  border-neon-yellow  hover:bg-neon-yellow/10  hover:shadow-neon-yellow',
    green:   'text-neon-green   border-neon-green   hover:bg-neon-green/10   hover:shadow-neon-green',
  }[accentColor]

  const seeMoreBorder = {
    cyan:    'border-neon-cyan    text-neon-cyan    hover:bg-neon-cyan/10    hover:shadow-neon-cyan',
    magenta: 'border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10 hover:shadow-neon-magenta',
    yellow:  'border-neon-yellow  text-neon-yellow  hover:bg-neon-yellow/10  hover:shadow-neon-yellow',
    green:   'border-neon-green   text-neon-green   hover:bg-neon-green/10   hover:shadow-neon-green',
  }[accentColor]

  if (!games.length) {
    return <p className="text-center text-ink-muted py-16 font-pixel text-xs">NENHUM JOGO ENCONTRADO :(</p>
  }

  const targetLink = seeMoreLink || (systemFilter ? `/catalogo?system=${encodeURIComponent(systemFilter)}` : '/catalogo')

  const handleVerMais = () => {
    navigate(targetLink)
  }

  return (
    <div className="relative group/carousel">
      {/* Seta esquerda */}
      <button
        onClick={() => scroll(-1)}
        aria-label="Anterior"
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
          w-9 h-9 flex items-center justify-center
          rounded-full border-2 bg-bg/80 backdrop-blur
          transition-all duration-200
          opacity-0 group-hover/carousel:opacity-100
          ${arrowColor}
        `}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex items-stretch gap-4 overflow-x-auto scroll-smooth pb-3 pt-1 px-1
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {games.map((g) => (
          <div key={g.id} className="flex-none w-44 md:w-52 flex flex-col">
            <GameCard game={g} onClick={openGame} accentColor={accentColor} />
          </div>
        ))}

        {/* Card "Ver todos" — último item do carrossel (ao lado dos cards) */}
        {(systemFilter || seeMoreLink) && (
          <div className="flex-none w-44 md:w-52 flex flex-col">
            <button
              onClick={handleVerMais}
              className={`
                w-full flex-1 min-h-[235px] md:min-h-[270px]
                flex flex-col items-center justify-center gap-4
                rounded-xl border-2 border-dashed
                bg-bg-soft/40 backdrop-blur
                cursor-pointer
                transition-all duration-300
                hover:scale-[1.02] hover:-translate-y-1
                p-4
                ${seeMoreBorder}
              `}
            >
              <div className="p-3 rounded-full border border-current bg-current/10">
                <ArrowRight size={24} />
              </div>
              <span className="font-pixel text-[9px] md:text-[10px] leading-relaxed text-center">
                VER TODOS<br />OS JOGOS
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Seta direita */}
      <button
        onClick={() => scroll(1)}
        aria-label="Próximo"
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
          w-9 h-9 flex items-center justify-center
          rounded-full border-2 bg-bg/80 backdrop-blur
          transition-all duration-200
          opacity-0 group-hover/carousel:opacity-100
          ${arrowColor}
        `}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}
