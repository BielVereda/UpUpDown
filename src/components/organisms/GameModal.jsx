import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ExternalLink, AlertTriangle, Play, Download } from 'lucide-react'
import { Badge, Button, Heading, Rating } from '@/components/atoms'
import { emulatorsData } from '@/data/emulatorsData'
import { useAppStore } from '@/store/useAppStore'

export default function GameModal() {
  const navigate = useNavigate()
  const game = useAppStore((s) => s.selectedGame)
  const close = useAppStore((s) => s.closeGame)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  const emu = game && emulatorsData.find((e) => e.id === game.recommendedEmulator)
  const isFree = !!game?.romUrl

  const playNow = () => {
    const qs = new URLSearchParams({ rom: game.romUrl, system: game.system, name: game.title })
    close()
    navigate(`/jogar?${qs.toString()}`)
  }

  const playWithMyFile = () => {
    const system = game.system
    close()
    navigate(`/jogar?system=${encodeURIComponent(system)}`)
  }

  return (
    <AnimatePresence>
      {game && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog" aria-modal="true"
            className="relative w-full max-w-3xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto bg-bg-soft border-2 border-neon-cyan shadow-neon-cyan rounded-xl"
            initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={close} aria-label="Fechar" className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-bg/80 hover:text-neon-magenta cursor-pointer">
              <X size={18} md:size={20} />
            </button>

            <div className="aspect-video bg-gradient-to-br from-neon-magenta/30 to-neon-cyan/30">
              <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-5">
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <Heading level={2} color="magenta" className="text-xl md:text-2xl">{game.title}</Heading>
                <Badge compact={false} className="text-[10px] md:text-sm">{game.system}</Badge>
                {game.rating && <Rating value={game.rating} />}
              </div>

              <p className="text-ink-muted leading-relaxed text-sm md:text-base">{game.description}</p>

              <dl className="grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
                {[['Console', game.system], ['Ano', game.year], ['Gênero', game.genre], ['Desenvolvedora', game.developer]].map(([k, v]) => (
                  <div key={k} className="bg-bg rounded-md p-2 md:p-3 border border-white/10">
                    <dt className="font-pixel text-[8px] md:text-[9px] text-neon-yellow mb-1">{k}</dt>
                    <dd>{v || '—'}</dd>
                  </div>
                ))}
              </dl>

              {isFree && (
                <p className="text-[10px] md:text-xs text-ink-muted bg-neon-green/10 border border-neon-green/40 rounded-md p-2 md:p-3">
                  <strong className="text-neon-green">Distribuição livre.</strong>{' '}
                  Licença: {game.license || '—'}.{' '}
                  {game.sourceUrl && (
                    <a href={game.sourceUrl} target="_blank" rel="noreferrer" className="text-neon-cyan underline">
                      Página original do autor
                    </a>
                  )}
                </p>
              )}

              {emu && (
                <div className="flex gap-2 md:gap-3 items-start bg-neon-yellow/10 border border-neon-yellow/40 rounded-md p-2 md:p-3 text-xs md:text-sm">
                  <AlertTriangle size={16} md:size={18} className="text-neon-yellow shrink-0 mt-0.5" />
                  <p>
                    Compatibilidade: recomendamos o emulador <strong className="text-neon-yellow">{emu.name}</strong> para este jogo.
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 md:gap-3">
                {isFree ? (
                  <>
                    <Button variant="green" size="lg" onClick={playNow} className="text-xs md:text-sm">
                      <Play size={14} md:size={16} /> Jogar agora
                    </Button>
                    <Button as="a" href={game.romUrl} download variant="cyan" size="lg" className="text-xs md:text-sm">
                      <Download size={14} md:size={16} /> Baixar
                    </Button>
                  </>
                ) : (
                  <Button variant="green" size="lg" onClick={playWithMyFile} className="text-xs md:text-sm">
                    <Play size={14} md:size={16} /> Jogar com meu arquivo
                  </Button>
                )}
                {game.driveUrl && (
                  <Button as="a" href={game.driveUrl} target="_blank" rel="noreferrer" variant="cyan" size="lg" className="text-xs md:text-sm">
                    <Download size={14} md:size={16} /> Baixar do Drive
                  </Button>
                )}
                <Button as="a" href={game.downloadUrl} target="_blank" rel="noreferrer" variant={isFree ? 'yellow' : 'cyan'} size="lg" className="text-xs md:text-sm">
                  <ExternalLink size={14} md:size={16} /> {isFree ? 'Página do autor' : 'RetroAchievements'}
                </Button>
                {emu && (
                  <Button as="a" href={emu.downloadUrl} target="_blank" rel="noreferrer" variant="magenta" size="lg" className="text-xs md:text-sm">
                    Baixar {emu.name}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
