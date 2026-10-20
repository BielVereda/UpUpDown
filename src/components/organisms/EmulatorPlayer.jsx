import { useMemo } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Badge, Button, Heading } from '@/components/atoms'

const CDN = 'https://cdn.emulatorjs.org/stable/data/'

// sistema do site -> core/sistema do EmulatorJS
export const EJS_CORES = {
  SNES: 'snes',
  'Mega Drive': 'segaMD',
  'PlayStation 1': 'psx',
  'Game Boy Advance': 'gba',
  N64: 'n64',
  Arcade: 'arcade',
  'Game Boy Color': 'gb',
  'Nintendo DS': 'nds',
  PSP: 'psp',
}

// serializa para dentro de <script> sem permitir fechar a tag
const safe = (v) => JSON.stringify(v).replace(/</g, '\\u003c')

const buildDoc = (core, url, name) => `<!doctype html>
<html><head><meta charset="utf-8">
<style>html,body{margin:0;height:100%;background:#000;overflow:hidden}#game{width:100%;height:100%}</style>
</head><body>
<div id="game"></div>
<script>
  window.EJS_player = '#game';
  window.EJS_core = ${safe(core)};
  window.EJS_gameUrl = ${safe(url)};
  window.EJS_gameName = ${safe(name)};
  window.EJS_pathtodata = ${safe(CDN)};
  window.EJS_startOnLoaded = true;
  window.EJS_color = '#00F0FF';
<\/script>
<script src="${CDN}loader.js"><\/script>
</body></html>`

export default function EmulatorPlayer({ session, onExit }) {
  const doc = useMemo(
    () => buildDoc(EJS_CORES[session.system], session.url, session.name),
    [session]
  )

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Heading level={3} color="green">{session.name}</Heading>
          <Badge compact={false}>{session.system}</Badge>
        </div>
        <Button variant="magenta" size="sm" onClick={onExit}>
          <ArrowLeft size={14} /> Trocar jogo
        </Button>
      </div>

      <div className="aspect-[4/3] w-full max-w-4xl mx-auto bg-black border-2 border-neon-cyan shadow-neon-cyan rounded-xl overflow-hidden">
        <iframe
          title={`Emulador: ${session.name}`}
          srcDoc={doc}
          allow="autoplay; fullscreen; gamepad"
          className="w-full h-full"
        />
      </div>

      <p className="text-xs text-ink-muted text-center max-w-2xl mx-auto">
        Use o teclado ou conecte um controle. Dentro do player, o menu de controles permite remapear botões,
        e há opções de save state e tela cheia.
      </p>
    </section>
  )
}
