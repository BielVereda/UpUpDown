import { Logo } from '@/components/atoms'

export default function Footer() {
  return (
    <footer className="mt-12 md:mt-20 border-t border-neon-cyan/30 bg-bg-soft">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <Logo />
          <p className="text-xs md:text-sm text-ink-muted">Preservando a era de ouro dos videogames. Feito pela comunidade, para a comunidade.</p>
        </div>
        <p className="text-[10px] md:text-xs text-ink-muted leading-relaxed">
          <strong className="text-neon-yellow">Aviso legal:</strong> este é um projeto sem fins lucrativos voltado à
          preservação histórica. Não vendemos nada. Os jogos pertencem aos seus respectivos detentores de direitos;
          incentive e respeite os criadores adquirindo edições oficiais quando disponíveis. Dados de conquistas por{' '}
          <a href="https://retroachievements.org" target="_blank" rel="noreferrer" className="text-neon-cyan underline">RetroAchievements</a>.
        </p>
      </div>
      <div className="text-center text-[8px] md:text-[10px] font-pixel text-ink-muted py-3 md:py-4 border-t border-white/5">
        © {new Date().getFullYear()} Up, Up &amp; Down! — INSERT COIN <span className="animate-blink">▮</span>
      </div>
    </footer>
  )
}
