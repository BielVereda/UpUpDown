import { Heading, Badge } from '@/components/atoms'
import { EmulatorSection } from '@/components/organisms'
import { emulatorGuides } from '@/data/emulatorsData'

export default function Emulators() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      <div className="space-y-3">
        <Heading level={1} color="magenta">Emuladores</Heading>
        <p className="text-ink-muted max-w-2xl">Baixe e aprenda a configurar os melhores emuladores para reviver os clássicos.</p>
      </div>

      <EmulatorSection />

      <section className="space-y-6">
        <Heading level={2} color="green">Guias rápidos</Heading>
        <div className="grid md:grid-cols-3 gap-5">
          {emulatorGuides.map((g) => (
            <article key={g.system} className="neon-card p-5 space-y-3 hover:!border-neon-green">
              <Badge compact={false}>{g.system}</Badge>
              <h3 className="font-semibold">{g.title}</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-ink-muted">
                {g.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
