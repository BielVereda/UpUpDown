import { Heart, Download } from 'lucide-react'
import { Badge, Rating } from '@/components/atoms'
import { useAppStore } from '@/store/useAppStore'

export default function GameCard({ game, onClick }) {
  const fav = useAppStore((s) => s.favorites.includes(game.id))
  const toggleFavorite = useAppStore((s) => s.toggleFavorite)

  return (
    <article className="neon-card cursor-pointer group" onClick={() => onClick?.(game)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-neon-magenta/30 to-neon-cyan/30">
        <img
          src={game.coverUrl}
          alt={game.title}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge className="absolute top-2 left-2 text-[8px] md:text-[10px] px-2 py-1">{game.system}</Badge>
        {game.availability === 'free' && (
          <span className="absolute bottom-2 left-2 font-pixel text-[7px] md:text-[8px] bg-neon-green text-bg px-1.5 md:px-2 py-0.5 md:py-1 rounded shadow-neon-green">
            DOWNLOAD LIVRE
          </span>
        )}
        {game.driveUrl && (
          <a
            href={game.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 right-2 p-1.5 md:p-2 rounded-full bg-neon-cyan text-bg hover:bg-neon-magenta transition-colors cursor-pointer shadow-neon-cyan"
            title="Baixar do Google Drive"
          >
            <Download size={14} md:size={16} />
          </a>
        )}
        <button
          aria-label="Favoritar"
          onClick={(e) => { e.stopPropagation(); toggleFavorite(game.id) }}
          className={`absolute top-2 right-2 p-1 md:p-1.5 rounded-full bg-bg/70 cursor-pointer
            ${fav ? 'text-neon-magenta' : 'text-ink-muted hover:text-neon-magenta'} ${game.driveUrl ? 'right-10 md:right-12' : ''}`}
        >
          <Heart size={14} md:size={16} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="p-3 md:p-4 space-y-2">
        <h3 className="font-semibold text-xs md:text-sm line-clamp-1">{game.title}</h3>
        <div className="flex items-center justify-between text-[10px] md:text-xs text-ink-muted">
          <span>{game.genre} • {game.year ?? '—'}</span>
          {game.rating && <Rating value={game.rating} />}
        </div>
      </div>
    </article>
  )
}
