import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Headphones } from 'lucide-react'
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

const BackgroundMusic = forwardRef(({ showControls = true, showHeadphoneHint: showHeadphoneHintProp = true }, ref) => {
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [showHeadphoneHint, setShowHeadphoneHint] = useState(showHeadphoneHintProp)
  const [trackToasts, setTrackToasts] = useState([]) // [{ id, label }]
  // Playlist embaralhada uma única vez, já disponível no primeiro render
  const [shuffledPlaylist] = useState(() => shuffleArray(PLAYLIST))
  const audioRef = useRef(null)

  // Controle dos avisos individuais
  const toastIdRef = useRef(0)
  const toastTimersRef = useRef(new Set())
  const prevTrackRef = useRef(null)
  // Conta erros de carregamento seguidos (evita loop infinito se nenhum arquivo existir)
  const errorCountRef = useRef(0)

  const total = shuffledPlaylist.length
  const hasPlaylist = total > 0
  const currentTrack = shuffledPlaylist[trackIndex] ?? null

  /* ─── Avisos individuais ─────────────────────────────── */
  const pushToast = (label) => {
    const id = ++toastIdRef.current
    setTrackToasts((prev) => [...prev, { id, label }].slice(-MAX_TOASTS))

    const timer = setTimeout(() => {
      setTrackToasts((prev) => prev.filter((t) => t.id !== id))
      toastTimersRef.current.delete(timer)
    }, TOAST_DURATION)
    toastTimersRef.current.add(timer)
  }

  // Aviso novo a cada troca de faixa (a primeira faixa não gera aviso)
  useEffect(() => {
    if (!currentTrack) return
    if (prevTrackRef.current === null) {
      prevTrackRef.current = currentTrack
      return
    }
    if (prevTrackRef.current === currentTrack) return
    prevTrackRef.current = currentTrack
    pushToast(currentTrack.label)
  }, [currentTrack]) // eslint-disable-line react-hooks/exhaustive-deps

  // Limpar timers ao desmontar
  useEffect(() => {
    const timers = toastTimersRef.current
    return () => {
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [])

  /* ─── Reprodução ─────────────────────────────────────── */
  // O <audio> recebe o src pelo React; aqui só controlamos play/pause.
  // Roda quando troca a faixa ou quando o usuário aperta play/pause.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    if (!isPlaying) {
      audio.pause()
      return
    }

    const promise = audio.play()
    if (promise) {
      promise.catch((err) => {
        // AbortError = a faixa trocou no meio do carregamento (normal ao pular rápido)
        if (err.name === 'AbortError') return
        console.warn('[BackgroundMusic] play() falhou:', err.name, err.message)
        // Navegador bloqueou o autoplay: volta o botão para "pausado"
        if (err.name === 'NotAllowedError') setIsPlaying(false)
      })
    }
  }, [isPlaying, currentTrack])

  /* sync volume */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const nextTrack = () => {
    if (!hasPlaylist) return
    setTrackIndex((i) => (i + 1) % total)
  }

  const prevTrack = () => {
    if (!hasPlaylist) return
    setTrackIndex((i) => (i - 1 + total) % total)
  }

  // Avança para a próxima faixa e toca (uso externo via ref)
  const playRandomTrack = () => {
    if (!hasPlaylist) return
    setTrackIndex((i) => (i + 1) % total)
    setIsPlaying(true)
  }

  useImperativeHandle(ref, () => ({
    playRandom: playRandomTrack
  }))

  /* auto-advance quando a faixa termina */
  const handleEnded = () => nextTrack()

  /* arquivo não encontrado / formato inválido */
  const handleError = () => {
    const audio = audioRef.current
    console.error(
      '[BackgroundMusic] Não foi possível carregar o áudio:',
      currentTrack?.src,
      '| código:', audio?.error?.code,
      '| msg:', audio?.error?.message
    )
    if (currentTrack) pushToast(`Arquivo não encontrado: ${currentTrack.label}`)

    errorCountRef.current += 1
    // Se está tocando, pula para a próxima — mas para se todas falharem
    if (isPlaying && errorCountRef.current < total) nextTrack()
  }

  const handleCanPlay = () => {
    errorCountRef.current = 0
  }

  const togglePlay = () => {
    if (!currentTrack) return
    setIsPlaying((v) => !v)
  }

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value))
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        loop={total === 1}
        preload="auto"
        onEnded={handleEnded}
        onError={handleError}
        onCanPlay={handleCanPlay}
      />

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

      {/* Avisos de música — um elemento independente por troca de faixa */}
      <div className={styles.trackNameContainer} aria-live="polite">
        {trackToasts.map((toast) => (
          <div key={toast.id} className={styles.trackNameFloat}>
            {toast.label}
          </div>
        ))}
      </div>

      {/* Controles de música — só aparece se showControls for true */}
      {showControls && (
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
          >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
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