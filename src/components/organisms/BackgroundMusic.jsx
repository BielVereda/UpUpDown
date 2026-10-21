import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Headphones } from 'lucide-react'
import styles from './BackgroundMusic.module.css'

/**
 * Playlist de músicas — arquivos em /public/audio/
 * `file` = nome exato do arquivo | `label` = nome exibido no player
 */
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
  src: `/audio/${file}`
}))

// Duração de cada aviso de música (deve bater com a animação no CSS)
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
  const [shuffledPlaylist, setShuffledPlaylist] = useState([])
  const audioRef = useRef(null)

  // Controle dos avisos individuais de música
  const toastIdRef = useRef(0)
  const toastTimersRef = useRef(new Set())
  const isFirstTrackRef = useRef(true)

  const hasPlaylist = PLAYLIST.length > 0
  const currentTrack = shuffledPlaylist[trackIndex] ?? null

  // Embaralhar playlist na montagem
  useEffect(() => {
    setShuffledPlaylist(shuffleArray(PLAYLIST))
  }, [])

  // Cria um aviso NOVO e independente para cada troca de música.
  // Cada aviso tem seu próprio id, sua própria animação e seu próprio timer,
  // então trocar de faixa várias vezes seguidas não reaproveita nem quebra o anterior.
  const pushTrackToast = (label) => {
    const id = ++toastIdRef.current
    setTrackToasts((prev) => [...prev, { id, label }].slice(-MAX_TOASTS))

    const timer = setTimeout(() => {
      setTrackToasts((prev) => prev.filter((t) => t.id !== id))
      toastTimersRef.current.delete(timer)
    }, TOAST_DURATION)
    toastTimersRef.current.add(timer)
  }

  // Dispara um aviso sempre que a faixa atual mudar (exceto na primeira carga)
  useEffect(() => {
    if (!currentTrack) return
    if (isFirstTrackRef.current) {
      isFirstTrackRef.current = false
      return
    }
    pushTrackToast(currentTrack.label)
  }, [currentTrack]) // eslint-disable-line react-hooks/exhaustive-deps

  // Limpar todos os timers ao desmontar
  useEffect(() => {
    const timers = toastTimersRef.current
    return () => {
      timers.forEach(clearTimeout)
      timers.clear()
    }
  }, [])

  // Função para selecionar a próxima faixa na playlist embaralhada
  const playRandomTrack = () => {
    if (!hasPlaylist) return
    const nextIndex = (trackIndex + 1) % shuffledPlaylist.length
    setTrackIndex(nextIndex)
    setIsPlaying(true)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = shuffledPlaylist[nextIndex].src
        audioRef.current.load()
        audioRef.current.play().catch(() => {})
      }
    }, 100)
  }

  // Expor função para uso externo via ref
  useImperativeHandle(ref, () => ({
    playRandom: playRandomTrack
  }))

  /* sync volume */
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  /* load new track when index changes */
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return
    audioRef.current.src = currentTrack.src
    audioRef.current.load()
    if (isPlaying) audioRef.current.play().catch(() => {})
  }, [trackIndex, shuffledPlaylist]) // eslint-disable-line react-hooks/exhaustive-deps

  /* auto-advance to next track when current ends */
  const handleEnded = () => {
    if (hasPlaylist) {
      setTrackIndex((i) => (i + 1) % shuffledPlaylist.length)
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      if (currentTrack) audioRef.current.src = currentTrack.src
      audioRef.current.play().catch(() => {})
    }
    setIsPlaying((v) => !v)
  }

  const prevTrack = () => {
    setTrackIndex((i) => (i - 1 + shuffledPlaylist.length) % shuffledPlaylist.length)
  }

  const nextTrack = () => {
    setTrackIndex((i) => (i + 1) % shuffledPlaylist.length)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) audioRef.current.volume = newVolume
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop={!hasPlaylist}
        preload="auto"
        onEnded={handleEnded}
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
          {/* Seta anterior — só aparece se houver playlist */}
          {hasPlaylist && (
            <button
              onClick={prevTrack}
              className={styles.trackBtn}
              title="Faixa anterior"
            >
              <ChevronLeft size={16} />
            </button>
          )}

          {/* Botão play/pause */}
          <button
            onClick={togglePlay}
            className={styles.playBtn}
            title={isPlaying ? 'Pausar música' : 'Tocar música'}
          >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          {/* Slider de volume */}
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

          {/* Seta próxima — só aparece se houver playlist */}
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