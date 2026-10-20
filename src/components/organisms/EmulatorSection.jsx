import { Link } from 'react-router-dom'
import { Heading, Button } from '@/components/atoms'
import { EmulatorCard } from '@/components/molecules'
import { emulatorsData } from '@/data/emulatorsData'

export default function EmulatorSection({ limit, showLink = false }) {
  const list = limit ? emulatorsData.slice(0, limit) : emulatorsData
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Heading level={2} color="magenta">Emuladores rápidos</Heading>
        {showLink && <Button as={Link} to="/emuladores" variant="cyan" size="sm">Ver todos</Button>}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((e) => <EmulatorCard key={e.id} emulator={e} />)}
      </div>
    </section>
  )
}
