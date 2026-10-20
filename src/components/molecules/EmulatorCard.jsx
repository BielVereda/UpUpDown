import { Download, Monitor } from 'lucide-react'
import { Badge, Button } from '@/components/atoms'

export default function EmulatorCard({ emulator }) {
  return (
    <article className="neon-card p-5 flex flex-col gap-3 hover:!border-neon-magenta">
      <h3 className="font-pixel text-xs text-neon-magenta">{emulator.name}</h3>
      <p className="text-sm text-ink-muted flex-1">{emulator.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {emulator.supportedSystems.map((s) => <Badge key={s} compact={false}>{s}</Badge>)}
      </div>
      <p className="text-xs text-ink-muted flex items-center gap-1.5">
        <Monitor size={14} /> {emulator.platforms.join(' • ')}
      </p>
      <Button as="a" href={emulator.downloadUrl} target="_blank" rel="noreferrer" variant="magenta" size="sm">
        <Download size={14} /> Baixar
      </Button>
    </article>
  )
}
