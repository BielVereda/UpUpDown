import { Heading } from '@/components/atoms'
import { motion } from 'framer-motion'
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
    <motion.section
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <Heading level={2} color={color}>{title}</Heading>
      <GameCarousel
        games={games}
        accentColor={color}
        systemFilter={systemFilter}
        seeMoreLink={seeMoreLink}
      />
    </motion.section>
  )
}
