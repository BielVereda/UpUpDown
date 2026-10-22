import { Logo } from '@/components/atoms'

/**
 * Ícone do GitHub em SVG inline.
 * As versões novas do lucide-react removeram os ícones de marcas (Github, etc.),
 * então não dá mais para importar { Github } de 'lucide-react'.
 */
function GithubIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mt-8 md:mt-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg to-bg-soft" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 retro-grid" />
      </div>

      <div className="relative max-w-7xl mx-auto px-8 py-8 md:py-10">
        {/* Main content */}
        <div className="grid gap-8 md:grid-cols-[1fr_1.5fr_1fr] mb-8">
          {/* GitHub */}
          <div className="flex items-center justify-center md:justify-start">
            <a
              href="https://github.com/BielVereda/UpUpDown"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-pixel text-neon-cyan border border-neon-cyan/50 rounded-md hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all duration-200 shadow-neon-cyan"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
          </div>

          {/* Logo — ampliada com zoom (diferente de scale, o zoom ocupa o espaço real,
              então não precisa de padding extra e não cria vazio em cima/embaixo) */}
          <div className="flex items-center justify-center">
            <div className="[zoom:1.8] md:[zoom:2.5]">
              <Logo />
            </div>
          </div>

          {/* Legal notice */}
          <div className="space-y-4 flex flex-col justify-center text-center">
            <h4 className="font-pixel text-xs text-neon-yellow">Aviso Legal</h4>
            <p className="text-[10px] text-ink-muted leading-relaxed">
              Projeto sem fins lucrativos para preservação histórica. Não vendemos nada.
              Os jogos pertencem aos seus respectivos detentores de direitos.
            </p>
            <p className="text-[10px] text-ink-muted">
              Dados por{' '}
              <a href="https://retroachievements.org" target="_blank" rel="noreferrer" className="text-neon-cyan hover:text-neon-magenta transition-colors duration-200">
                RetroAchievements
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 pb-32 md:pb-12 px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] md:text-xs text-ink-muted">
              © {new Date().getFullYear()} Up, Up & Down! — Todos os direitos reservados
            </p>
            <div className="font-pixel text-[10px] text-neon-cyan">
              INSERT COIN <span className="animate-blink">▮</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}