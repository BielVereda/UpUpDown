import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms'
import { LOGO_SRC } from '@/components/atoms/Logo'

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden border-b border-neon-magenta/40">
      <div className="absolute inset-x-0 bottom-0 h-1/2 retro-grid opacity-60" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-24 text-center space-y-4 md:space-y-6">
        <motion.img
          src={LOGO_SRC}
          alt="Up, Up & Down!"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto h-40 md:h-64 lg:h-96 w-auto object-contain drop-shadow-[0_0_25px_rgba(255,0,234,.7)]"
        />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-base md:text-lg lg:text-2xl text-ink max-w-2xl mx-auto"
        >
          Preservando a era de ouro dos videogames
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button as={Link} to="/catalogo" variant="magenta" size="lg" className="text-sm md:text-base">▶ Explorar Acervo</Button>
        </motion.div>
      </div>
    </section>
  )
}
