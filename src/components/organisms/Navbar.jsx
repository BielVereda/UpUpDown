import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Logo } from '@/components/atoms'
import { SearchBar } from '@/components/molecules'
import { useAppStore } from '@/store/useAppStore'

const links = [
  { to: '/home', label: 'Home' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/emuladores', label: 'Emuladores' },
  { to: '/jogar', label: 'Jogar' },
  { to: '/sobre', label: 'Sobre' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const search = useAppStore((s) => s.search)
  const setSearch = useAppStore((s) => s.setSearch)

  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur border-b border-neon-magenta/40 shadow-[0_2px_20px_rgba(255,0,234,.2)]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Logo />
        <nav className="flex items-center gap-2 md:gap-4 order-3 w-full md:order-none md:w-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `font-pixel text-[8px] md:text-[10px] transition-colors px-2 py-1 ${isActive ? 'text-neon-cyan' : 'text-ink-muted hover:text-ink'}`
              }
            >
              {({ isActive }) => (
                <motion.span
                  whileHover={{ scale: 1.05, color: isActive ? '#00ffff' : '#9333ea' }}
                  transition={{ duration: 0.3 }}
                >
                  {l.label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex-1 min-w-[120px] md:min-w-[160px] max-w-[200px] md:max-w-xs ml-auto order-2 md:order-none">
          <SearchBar value={search} onChange={setSearch} onSubmit={() => navigate('/catalogo')} />
        </div>
      </div>
    </header>
  )
}
