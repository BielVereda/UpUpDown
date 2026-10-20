import { Search } from 'lucide-react'
import { Input } from '@/components/atoms'

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Buscar jogos...' }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(value) }}
      className="relative w-full"
      role="search"
    >
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pl-9" />
    </form>
  )
}
