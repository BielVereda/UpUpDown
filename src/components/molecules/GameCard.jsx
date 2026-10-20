import { Heart, Download } from 'lucide-react'
import { Badge, Rating } from '@/components/atoms'
import { useAppStore } from '@/store/useAppStore'

/**
 * Cores neon disponíveis: 'cyan' | 'magenta' | 'yellow' | 'green'
 * accentColor pinta: borda hover do card, botão download, badge de sistema.
 */
const ACCENT = {
  cyan: {
    hover:    'hover:border-neon-cyan hover:shadow-neon-cyan',
    download: 'bg-neon-cyan shadow-neon-cyan',
    badge:    'text-neon-cyan border-neon-cyan',
    meta:     'text-neon-cyan/80',
  },
  magenta: {
    hover:    'hover:border-neon-magenta hover:shadow-neon-magenta',
    download: 'bg-neon-magenta shadow-neon-magenta',
    badge:    'text-neon-magenta border-neon-magenta',
    meta:     'text-neon-magenta/80',
  },
  yellow: {
    hover:    'hover:border-neon-yellow hover:shadow-neon-yellow',
    download: 'bg-neon-yellow shadow-neon-yellow',
    badge:    'text-neon-yellow border-neon-yellow',
    meta:     'text-neon-yellow/80',
  },
  green: {
    hover:    'hover:border-neon-green hover:shadow-neon-green',
    download: 'bg-neon-green shadow-neon-green',
    badge:    'text-neon-green border-neon-green',
    meta:     'text-neon-green/80',
  },
}

export default function GameCard({ game, onClick, accentColor = 'cyan' }) {
  const fav           = useAppStore((s) => s.favorites.includes(game.id))
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)
  const ac            = ACCENT[accentColor] ?? ACCENT.cyan

  return (
    <article
      className={`
        neon-card cursor-pointer group
        border border-white/10
        transition-all duration-300 -translate-y-0
        hover:-translate-y-1
        h-full flex flex-col
        ${ac.hover}
      `}
      onClick={() => onClick?.(game)}
    >
      {/* Capa */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-bg to-bg-soft">
        <img
          src={game.coverUrl}
          alt={game.title}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge do sistema com a cor da seção */}
        <Badge
          className={`absolute top-2 left-2 text-[8px] px-2 py-0.5 ${ac.badge}`}
          color={ac.badge}
        >
          {game.system}
        </Badge>

        {/* Download livre */}
        {game.availability === 'free' && (
          <span className="absolute bottom-2 left-2 font-pixel text-[7px] bg-neon-green text-bg px-1.5 py-0.5 rounded shadow-neon-green">
            GRÁTIS
          </span>
        )}

        {/* Botão Google Drive com cor da seção */}
        {game.driveUrl && (
          <a
            href={game.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-2 right-2 p-1.5 rounded-full text-bg hover:scale-110 transition-all cursor-pointer ${ac.download}`}
            title="Baixar do Google Drive"
          >
            <Download size={14} />
          </a>
        )}

        {/* Favoritar */}
        <button
          aria-label="Favoritar"
          onClick={(e) => { e.stopPropagation(); toggleFavorite(game.id) }}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-bg/80 backdrop-blur-sm cursor-pointer transition-all z-10 hover:scale-110
            ${fav ? 'text-neon-magenta shadow-[0_0_8px_rgba(255,0,234,0.6)]' : 'text-ink-muted hover:text-neon-magenta'}`}
        >
          <Heart size={14} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-2 md:p-3 space-y-1">
        <h3 className="font-semibold text-[11px] md:text-xs leading-tight line-clamp-1 text-ink">
          {game.title}
        </h3>
        <p className={`text-[9px] md:text-[10px] ${ac.meta}`}>
          {game.genre} • {game.year ?? '—'}
        </p>
        {game.rating && <Rating value={game.rating} />}
      </div>
    </article>
  )
}
