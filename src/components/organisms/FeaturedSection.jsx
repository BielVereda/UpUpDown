import { Heading } from '@/components/atoms'
import GameCarousel from './GameCarousel'

/**
 * @param {string}  title        — Título da seção
 * @param {string}  color        — Cor neon do heading e do carrossel: 'cyan' | 'magenta' | 'yellow' | 'green'
 * @param {Array}   games        — Lista de jogos (já limitada em 10 externamente)
 * @param {string}  [systemFilter] — Valor do filtro de sistema para o card "Ver mais" no carrossel
 * @param {string}  [seeMoreLink]  — Rota alternativa para "Ver mais" (ex: '/catalogo')
 */
export default function FeaturedSection({ title, color = 'cyan', games, systemFilter, seeMoreLink }) {
  return (
    <section className="space-y-5">
      <Heading level={2} color={color}>{title}</Heading>
      <GameCarousel
        games={games}
        accentColor={color}
        systemFilter={systemFilter}
        seeMoreLink={seeMoreLink}
      />
    </section>
  )
}
