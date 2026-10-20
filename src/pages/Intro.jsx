import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gamesData } from '@/data/gamesData'
import styles from './Intro.module.css'

export default function Intro() {
  const navigate = useNavigate()
  const [canSkip, setCanSkip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCanSkip(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    console.log('Navigating to /home')
    navigate('/home')
  }

  // Também permite pressionar Enter para iniciar
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && canSkip) {
        handleEnter()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [canSkip])

  // Filtra jogos com capas
  const gamesWithCovers = gamesData.filter(g => g.coverUrl && g.availability !== 'free')

  return (
    <div className={styles.intro}>
      {/* Background Effects */}
      <div className={styles.grid3d}>
        {gamesWithCovers.map((game, index) => (
          <div
            key={game.id}
            className={styles.gameCover}
            style={{
              '--delay': `${index * 0.1}s`,
              '--x': `${(index % 5) * 20}%`,
              '--y': `${Math.floor(index / 5) * 20}%`,
            }}
          >
            <img src={game.coverUrl} alt={game.title} />
          </div>
        ))}
      </div>

      {/* CRT Overlay */}
      <div className={styles.crtOverlay} />

      {/* Scanlines */}
      <div className={styles.scanlines} />

      {/* Logo Center */}
      <div className={styles.logoContainer}>
        <div className={styles.logoGlow}>
          <img src="/images/icons/logotipo.png" alt="UpUpDown" className={styles.logo} />
        </div>
        <p className={styles.subtitle}>ARCADE EXPERIENCE</p>
      </div>

      {/* Enter Button */}
      {canSkip && (
        <button onClick={handleEnter} className={styles.enterBtn}>
          <span className={styles.btnText}>PRESS START</span>
          <div className={styles.btnGlow} />
        </button>
      )}

      {/* Skip Hint */}
      {!canSkip && (
        <p className={styles.skipHint}>Loading...</p>
      )}
    </div>
  )
}
