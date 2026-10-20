import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CRTOverlay } from '@/components/atoms'
import { Navbar, Footer, GameModal, BackgroundMusic } from '@/components/organisms'

export default function MainLayout() {
  const { pathname } = useLocation()
  useEffect(() => {
  window.scrollTo(0, 0)
}, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <GameModal />
      <CRTOverlay />
      <BackgroundMusic />
    </div>
  )
}
