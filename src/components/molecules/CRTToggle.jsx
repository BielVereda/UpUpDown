import { Tv } from 'lucide-react'
import { Toggle } from '@/components/atoms'
import { useAppStore } from '@/store/useAppStore'

export default function CRTToggle() {
  const crt = useAppStore((s) => s.crt)
  const toggleCRT = useAppStore((s) => s.toggleCRT)
  return (
    <div className="flex items-center gap-2">
      <Tv size={16} className={crt ? 'text-neon-green' : 'text-ink-muted'} />
      <span className="hidden lg:inline font-pixel text-[9px] text-ink-muted">CRT</span>
      <Toggle checked={crt} onChange={toggleCRT} label="Ativar modo CRT" />
    </div>
  )
}
