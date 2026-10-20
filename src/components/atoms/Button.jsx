const variants = {
  cyan: 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-bg hover:shadow-neon-cyan',
  magenta: 'border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-bg hover:shadow-neon-magenta',
  yellow: 'border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-bg hover:shadow-neon-yellow',
  green: 'border-neon-green text-neon-green hover:bg-neon-green hover:text-bg hover:shadow-neon-green',
}
const sizes = { sm: 'px-3 py-1.5 text-[10px]', md: 'px-5 py-3 text-xs', lg: 'px-7 py-4 text-sm' }

export default function Button({ as: Tag = 'button', variant = 'cyan', size = 'md', className = '', children, ...props }) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 font-pixel uppercase tracking-wide border-2 rounded-md
        transition-all duration-300 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
