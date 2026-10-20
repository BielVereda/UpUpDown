import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Headphones } from 'lucide-react'
import styles from './BackgroundMusic.module.css'

/**
 * Playlist de músicas — adicione os arquivos em /public/audio/
 * Exemplo: { label: 'Arcade Beats', src: '/audio/arcade-beats.mp3' }
 * Por enquanto as faixas ficam comentadas até os arquivos existirem.
 */
const PLAYLIST = [
  // { label: 'Arcade Beats',   src: '/audio/arcade-beats.mp3'   },
  // { label: 'Neon Drive',     src: '/audio/neon-drive.mp3'     },
  // { label: 'Pixel Storm',    src: '/audio/pixel-storm.mp3'    },
]

export default function BackgroundMusic() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [showHeadphoneHint, setShowHeadphoneHint] = useState(true)
  const audioRef = useRef(null)

  const hasPlaylist = PLAYLIST.length > 0
  const currentTrack = PLAYLIST[trackIndex] ?? null

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
  }, [trackIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  /* auto-advance to next track when current ends */
  const handleEnded = () => {
    if (hasPlaylist) {
      setTrackIndex((i) => (i + 1) % PLAYLIST.length)
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
    setTrackIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length)
  }

  const nextTrack = () => {
    setTrackIndex((i) => (i + 1) % PLAYLIST.length)
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

        {/* Nome da faixa atual */}
        {currentTrack && (
          <span className={styles.trackLabel} title={currentTrack.label}>
            {currentTrack.label}
          </span>
        )}
      </div>
    </>
  )
}
