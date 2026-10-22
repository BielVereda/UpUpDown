import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/atoms'
import { gamesData } from '@/data/gamesData'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Buscar jogos...' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredGames, setFilteredGames] = useState([])
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!value.trim()) {
      setFilteredGames([])
      setIsOpen(false)
      return
    }

    const searchTerm = value.toLowerCase()
    const filtered = gamesData
      .filter(game => {
        const title = game.title.toLowerCase()
        const startsWith = title.startsWith(searchTerm)
        const contains = title.includes(searchTerm)
        return contains
      })
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase()
        const bTitle = b.title.toLowerCase()
        const aStarts = aTitle.startsWith(searchTerm)
        const bStarts = bTitle.startsWith(searchTerm)

        if (aStarts && !bStarts) return -1
        if (!aStarts && bStarts) return 1
        return aTitle.localeCompare(bTitle)
      })
      .slice(0, 8)

    setFilteredGames(filtered)
    setIsOpen(filteredGames.length > 0)
  }, [value])

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleGameClick = (game) => {
    setIsOpen(false)
    onChange('')
    navigate(`/catalogo?search=${encodeURIComponent(game.title)}`)
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit?.(value); setIsOpen(false) }}
        className="relative"
        role="search"
      >
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-9"
          onFocus={() => setIsOpen(filteredGames.length > 0)}
        />
      </form>

      {isOpen && filteredGames.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-bg-soft border border-neon-cyan/30 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => handleGameClick(game)}
              className="w-full px-4 py-3 text-left hover:bg-neon-cyan/10 transition-colors border-b border-white/5 last:border-0 flex items-center gap-3"
            >
              {game.coverUrl && (
                <img
                  src={game.coverUrl}
                  alt={game.title}
                  className="w-10 h-10 object-cover rounded"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-ink truncate">{game.title}</p>
                <p className="text-[10px] text-ink-muted">{game.system}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
