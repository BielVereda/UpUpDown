const colors = {
  cyan: 'text-neon-cyan', magenta: 'text-neon-magenta', yellow: 'text-neon-yellow', green: 'text-neon-green', white: 'text-ink',
}

export default function Heading({ level = 2, color = 'cyan', className = '', children }) {
  const Tag = `h${level}`
  const size = level === 1 ? 'text-2xl md:text-4xl' : level === 2 ? 'text-lg md:text-2xl' : 'text-sm md:text-base'
  return <Tag className={`font-pixel leading-relaxed ${size} ${colors[color]} ${className}`}>{children}</Tag>
}
