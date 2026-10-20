const colors = {
  SNES: 'text-neon-magenta border-neon-magenta',
  'Mega Drive': 'text-neon-cyan border-neon-cyan',
  'PlayStation 1': 'text-neon-yellow border-neon-yellow',
  'Game Boy Advance': 'text-neon-green border-neon-green',
  'Game Boy Color': 'text-neon-magenta border-neon-magenta',
  'Nintendo DS': 'text-neon-cyan border-neon-cyan',
  'Nintendo 3DS': 'text-neon-yellow border-neon-yellow',
  PSP: 'text-neon-green border-neon-green',
  Arcade: 'text-neon-yellow border-neon-yellow',
  N64: 'text-neon-cyan border-neon-cyan',
}
const short = {
  'PlayStation 1': 'PS1',
  'Game Boy Advance': 'GBA',
  'Game Boy Color': 'GBC',
  'Nintendo DS': 'NDS',
  'Nintendo 3DS': '3DS',
  'Mega Drive': 'MD',
}

export default function Badge({ children, color, compact = true, className = '' }) {
  const label = compact ? short[children] || children : children
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full border text-[10px] font-pixel bg-bg/70 backdrop-blur
        ${color || colors[children] || 'text-ink-muted border-white/30'} ${className}`}
    >
      {label}
    </span>
  )
}
