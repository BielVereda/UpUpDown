import { useState, useLayoutEffect, useImperativeHandle, forwardRef, useSyncExternalStore } from 'react'
import { Play, Pause, ChevronLeft, ChevronRight, Headphones } from 'lucide-react'
import styles from './BackgroundMusic.module.css'

/**
 * Playlist de músicas — arquivos em /public/audio/
 * `file` = nome EXATO do arquivo na pasta | `label` = nome exibido no player
 */
const AUDIO_BASE = `${import.meta.env.BASE_URL}audio/`

const PLAYLIST = [
  { file: 'Akira_Yamaoka__Theme_of_Laura_.mp3',               label: 'Silent Hill 2 — Theme of Laura' },
  { file: 'Chrono_Trigger__Main_Theme_.mp3',                  label: 'Chrono Trigger — Main Theme' },
  { file: 'Donkey_Kong_Country_2__Stickerbush_Symphony_.mp3', label: 'Donkey Kong Country 2 — Stickerbush Symphony' },
  { file: 'Final_Fantasy_VII__One-Winged_Angel_.mp3',         label: 'Final Fantasy VII — One-Winged Angel' },
  { file: 'GTA_-_Vice_City__Main_Theme_.mp3',                 label: 'GTA Vice City — Main Theme' },
  { file: 'GTA_San_Andreas__Main_Theme_.mp3',                 label: 'GTA San Andreas — Main Theme' },
  { file: 'MEGALOVANIA_-_Toby_Fox.mp3',                       label: 'Undertale — Megalovania' },
  { file: 'Persona_5__Last_Surprise_.mp3',                    label: 'Persona 5 — Last Surprise' },
  { file: 'Persona_5__Life_Will_Change_.mp3',                 label: 'Persona 5 — Life Will Change' },
  { file: 'Shadow_of_the_Colossus__The_Opened_Way_.mp3',      label: 'Shadow of the Colossus — The Opened Way' },
  { file: 'Street_Fighter_II__Boss_Guile_Theme_.mp3',         label: 'Street Fighter II — Guile Theme' },
  { file: 'SUPER_MARIO_BROS___Main_Theme_.mp3',               label: 'Super Mario Bros. — Main Theme' },
  { file: 'The_Last_of_Us__Ending_Theme_.mp3',                label: 'The Last of Us — Ending Theme' },
  { file: 'The_Last_of_Us__Main_Theme_.mp3',                  label: 'The Last of Us — Main Theme' },
  { file: 'Zelda_-__The_Lost_Woods_.mp3',                     label: 'Zelda — The Lost Woods' },
  { file: 'Zelda_-_Ocarina_of_Time__Main_Theme_.mp3',         label: 'Zelda: Ocarina of Time — Main Theme' },
].map(({ file, label }) => ({
  label,
  src: `${AUDIO_BASE}${encodeURIComponent(file)}`
}))

// Duração de cada aviso (deve bater com a animação no CSS)
const TOAST_DURATION = 3000
// Máximo de avisos empilhados ao mesmo tempo
const MAX_TOASTS = 3

// Função para embaralhar array sem repetição
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/* ═══════════════════════════════════════════════════════════════
   PLAYER GLOBAL (singleton)

   O <audio> e o estado da música vivem FORA do React, no escopo do módulo.
   Assim a música continua tocando quando o usuário troca de página
   (ex.: Intro → Home) e qualquer instância de <BackgroundMusic /> mostra
   o mesmo estado (faixa atual, tocando/pausado, volume).
   ═══════════════════════════════════════════════════════════════ */

const playlist = shuffleArray(PLAYLIST)
const total = playlist.length
const audio = typeof Audio === 'undefined' ? null : new Audio()

// Estado compartilhado + assinantes (usado via useSyncExternalStore)
// hiddenBy = quantas instâncias com showControls={false} estão montadas (ex.: Intro).
// Enquanto for > 0, NENHUMA instância mostra os controles.
let state = { index: 0, isPlaying: false, volume: 0.3, toasts: [], hiddenBy: 0 }
const listeners = new Set()
const getState = () => state
const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
const setState = (patch) => {
  state = { ...state, ...patch }
  listeners.forEach((listener) => listener())
}

// Cada aviso é um item independente, com id e timer próprios
let toastId = 0
function pushToast(label) {
  const id = ++toastId
  setState({ toasts: [...state.toasts, { id, label }].slice(-MAX_TOASTS) })
  setTimeout(() => {
    setState({ toasts: state.toasts.filter((t) => t.id !== id) })
  }, TOAST_DURATION)
}

// Toca a faixa atual. Deve ser chamado direto de um clique/tecla do usuário
// para o navegador liberar o som.
function playAudio() {
  if (!audio) return
  const promise = audio.play()
  if (promise) {
    promise.catch((err) => {
      // AbortError = a faixa trocou no meio do carregamento (normal ao pular rápido)
      if (err.name === 'AbortError') return
      console.warn('[BackgroundMusic] play() falhou:', err.name, err.message)
      // Navegador bloqueou o autoplay: volta o botão para "pausado"
      if (err.name === 'NotAllowedError') setState({ isPlaying: false })
    })
  }
}

function selectTrack(index, { play = state.isPlaying } = {}) {
  if (!audio || total === 0) return
  const nextIndex = ((index % total) + total) % total
  audio.src = playlist[nextIndex].src
  setState({ index: nextIndex, isPlaying: play })
  pushToast(playlist[nextIndex].label)
  if (play) playAudio()
}

const nextTrack = () => selectTrack(state.index + 1)
const prevTrack = () => selectTrack(state.index - 1)

function togglePlay() {
  if (!audio || total === 0) return
  if (state.isPlaying) {
    audio.pause()
    setState({ isPlaying: false })
  } else {
    setState({ isPlaying: true })
    playAudio()
  }
}

// Usado pela tela de Intro (botão "Press Start"): começa a tocar já com som.
// Se a música já estiver tocando, não faz nada (não pula de faixa).
function playRandom() {
  if (!audio || total === 0 || state.isPlaying) return
  setState({ isPlaying: true })
  pushToast(playlist[state.index].label)
  playAudio()
}

function setVolume(volume) {
  if (audio) audio.volume = volume
  setState({ volume })
}

// Inicialização do <audio> e dos eventos (uma única vez)
if (audio && total > 0) {
  audio.preload = 'auto'
  audio.volume = state.volume
  audio.loop = total === 1
  audio.src = playlist[0].src

  // Conta erros de carregamento seguidos (evita loop infinito se nenhum arquivo existir)
  let errorCount = 0
  const controller = new AbortController()
  const { signal } = controller

  audio.addEventListener('ended', () => nextTrack(), { signal })
  audio.addEventListener('canplay', () => { errorCount = 0 }, { signal })
  audio.addEventListener('error', () => {
    const track = playlist[state.index]
    console.error(
      '[BackgroundMusic] Não foi possível carregar o áudio:',
      track?.src,
      '| código:', audio.error?.code,
      '| msg:', audio.error?.message
    )
    if (track) pushToast(`Arquivo não encontrado: ${track.label}`)

    errorCount += 1
    if (state.isPlaying) {
      // Pula para a próxima — mas para se todas falharem
      if (errorCount < total) nextTrack()
      else setState({ isPlaying: false })
    }
  }, { signal })

  // Hot reload do Vite: evita ficar com dois players tocando ao editar este arquivo
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      controller.abort()
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    })
  }
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE — apenas a interface; o áudio é o player global acima
   ═══════════════════════════════════════════════════════════════ */

const BackgroundMusic = forwardRef(({ showControls = true, showHeadphoneHint: showHeadphoneHintProp = true }, ref) => {
  const { isPlaying, volume, toasts, hiddenBy } = useSyncExternalStore(subscribe, getState)
  const [showHeadphoneHint, setShowHeadphoneHint] = useState(showHeadphoneHintProp)
  const hasPlaylist = total > 0

  // Expor função para uso externo via ref
  useImperativeHandle(ref, () => ({ playRandom }), [])

  // Uma instância com showControls={false} (a tela de Intro) esconde os controles de
  // TODAS as outras instâncias enquanto estiver montada — mesmo que exista outra
  // instância num layout global. useLayoutEffect evita um "piscar" dos controles.
  useLayoutEffect(() => {
    if (showControls) return
    setState({ hiddenBy: state.hiddenBy + 1 })
    return () => setState({ hiddenBy: state.hiddenBy - 1 })
  }, [showControls])

  const controlsVisible = showControls && hiddenBy === 0

  return (
    <>
      {/* Headphone warning — aparece inicialmente, some ao clicar */}
      {showHeadphoneHint && (
        <div
          className={styles.headphoneHint}
          onClick={() => setShowHeadphoneHint(false)}
          title="Clique para fechar"
        >
          <Headphones size={16} className={styles.headphoneIcon} />
          <span>Use fones de ouvido para melhor experiência!</span>
          <button
            className={styles.hintClose}
            onClick={(e) => { e.stopPropagation(); setShowHeadphoneHint(false) }}
            aria-label="Fechar aviso"
          >
            ×
          </button>
        </div>
      )}

      {/* Avisos de música — só na instância com controles, para não duplicar */}
      {controlsVisible && (
        <div className={styles.trackNameContainer} aria-live="polite">
          {toasts.map((toast) => (
            <div key={toast.id} className={styles.trackNameFloat}>
              {toast.label}
            </div>
          ))}
        </div>
      )}

      {/* Controles de música — só aparece se showControls for true e nenhuma Intro estiver montada */}
      {controlsVisible && (
        <div className={styles.musicControl}>
          {hasPlaylist && (
            <button
              onClick={prevTrack}
              className={styles.trackBtn}
              title="Faixa anterior"
            >
              <ChevronLeft size={16} />
            </button>
          )}

          <button
            onClick={togglePlay}
            className={styles.playBtn}
            title={isPlaying ? 'Pausar música' : 'Tocar música'}
            aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className={styles.volumeSlider}
            title="Volume"
          />

          {hasPlaylist && (
            <button
              onClick={nextTrack}
              className={styles.trackBtn}
              title="Próxima faixa"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}
    </>
  )
})

BackgroundMusic.displayName = 'BackgroundMusic'

export default BackgroundMusic