import { Heading } from '@/components/atoms'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <Heading level={1} color="yellow">Manifesto</Heading>
      <div className="space-y-5 text-ink-muted leading-relaxed">
        <p>
          Jogos são cultura. Cada cartucho, disco e fliperama carrega a criatividade, a tecnologia e a memória de uma
          geração inteira. Quando um console sai de linha ou uma empresa fecha as portas, parte dessa história pode
          desaparecer para sempre.
        </p>
        <p>
          O <strong className="text-neon-cyan">Up, Up &amp; Down!</strong> nasceu como um acervo comunitário de preservação:
          sem vendas, sem pagamentos, só nostalgia, conhecimento e respeito pela história dos videogames.
        </p>
        <p>
          Nosso objetivo é catalogar, contextualizar e ensinar como jogar os clássicos com emuladores, incentivando
          sempre o apoio aos criadores e às edições oficiais quando disponíveis.
        </p>
        <p className="text-neon-magenta font-pixel text-xs">INSERT COIN TO CONTINUE ▮</p>
      </div>
    </div>
  )
}
