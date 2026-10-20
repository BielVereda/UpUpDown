import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import styles from './BackgroundMusic.module.css'

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        // Adicione o arquivo de áudio em public/audio/arcade-music.mp3
        // Descomente a linha abaixo quando tiver o arquivo
        // src="/audio/arcade-music.mp3"
      />
      
      <div className={styles.musicControl}>
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
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
          title="Volume"
        />
      </div>
    </>
  )
}
