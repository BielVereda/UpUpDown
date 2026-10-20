import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { Heading } from '@/components/atoms'
import { FileDropzone } from '@/components/molecules'
import { EmulatorPlayer } from '@/components/organisms'
import { PLAY_SYSTEMS } from '@/data/gamesData'

// extensões inequívocas -> sistema. (.bin, .iso, .pbp e .zip são ambíguos: vale o console escolhido)
const EXT_TO_SYSTEM = {
  sfc: 'SNES', smc: 'SNES', swc: 'SNES', fig: 'SNES',
  gba: 'Game Boy Advance',
  gb: 'Game Boy Color', gbc: 'Game Boy Color',
  nds: 'Nintendo DS',
  z64: 'N64', n64: 'N64', v64: 'N64',
  gen: 'Mega Drive', md: 'Mega Drive', smd: 'Mega Drive',
  cue: 'PlayStation 1', chd: 'PlayStation 1',
  cso: 'PSP',
}

const HINTS = {
  'Game Boy Advance': '.gba, .zip',
  'Game Boy Color': '.gbc, .gb, .zip',
  'Nintendo DS': '.nds, .zip',
  'PlayStation 1': '.cue + .bin (em .zip), .iso, .chd, .pbp',
  PSP: '.iso, .cso, .pbp (experimental no navegador)',
  SNES: '.sfc, .smc, .zip',
  'Mega Drive': '.md, .gen, .smd, .bin, .zip',
  N64: '.z64, .n64, .v64, .zip',
  Arcade: '.zip com o set de ROM correto do jogo',
}

const ACCEPT = '.sfc,.smc,.swc,.fig,.gba,.gb,.gbc,.nds,.z64,.n64,.v64,.gen,.md,.smd,.bin,.cue,.iso,.chd,.pbp,.cso,.zip'

export default function Play() {
  const [params] = useSearchParams()
  const initial = PLAY_SYSTEMS.includes(params.get('system')) ? params.get('system') : 'Game Boy Advance'

  // jogo livre hospedado no próprio site: /jogar?rom=/roms/arquivo.gba&system=...&name=...
  const romParam = params.get('rom')
  const initialSession =
    romParam && romParam.startsWith('/roms/')
      ? {
          url: new URL(romParam, window.location.origin).href,
          name: params.get('name') || romParam.split('/').pop(),
          system: initial,
        }
      : null

  const [system, setSystem] = useState(initial)
  const [session, setSession] = useState(initialSession)

  // libera a URL temporária (somente arquivos escolhidos pelo usuário)
  useEffect(() => () => {
    if (session?.url.startsWith('blob:')) URL.revokeObjectURL(session.url)
  }, [session])

  const handleFile = (file) => {
    const ext = file.name.split('.').pop().toLowerCase()
    const detected = EXT_TO_SYSTEM[ext] || system
    setSystem(detected)
    setSession({
      url: URL.createObjectURL(file),
      name: file.name,
      system: detected,
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-3">
        <Heading level={1} color="green">Jogar</Heading>
        <p className="text-ink-muted max-w-2xl">
          Jogue direto no navegador: os jogos livres do catálogo abrem sozinhos, e você também pode trazer o seu próprio arquivo.
        </p>
      </div>

      <div className="flex gap-3 items-start bg-neon-cyan/10 border border-neon-cyan/40 rounded-md p-4 text-sm">
        <ShieldCheck size={20} className="text-neon-cyan shrink-0 mt-0.5" />
        <p>
          <strong className="text-neon-cyan">Seu arquivo não sai do seu computador.</strong> Arquivos que você escolhe são
          lidos apenas no seu navegador e nunca são enviados ao nosso servidor.
        </p>
      </div>

      {session ? (
        <EmulatorPlayer key={session.url} session={session} onExit={() => setSession(null)} />
      ) : (
        <div className="space-y-5">
          <label className="block space-y-1.5 max-w-xs">
            <span className="font-pixel text-[10px] text-neon-yellow">CONSOLE</span>
            <select
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              className="w-full bg-bg border border-white/15 rounded-md px-3 py-2 text-sm text-ink cursor-pointer
                focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan"
            >
              {PLAY_SYSTEMS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>

          <FileDropzone onFile={handleFile} accept={ACCEPT} />

          <p className="text-xs text-ink-muted">
            Formatos aceitos para <strong className="text-ink">{system}</strong>: {HINTS[system]}
          </p>
          <ul className="text-xs text-ink-muted list-disc list-inside space-y-1">
            <li>Arquivos <code>.bin</code>, <code>.iso</code> e <code>.zip</code> usam o console escolhido acima.</li>
            <li>PlayStation 1 pode exigir BIOS do seu próprio console para alguns jogos.</li>
            <li>PSP e Nintendo 3DS rodam melhor nos emuladores de desktop (PPSSPP e Azahar); veja a página Emuladores.</li>
            <li>O emulador é carregado da internet (EmulatorJS), então é preciso estar online.</li>
          </ul>
        </div>
      )}
    </div>
  )
}
