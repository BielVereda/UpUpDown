import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/templates'
import Intro from '@/pages/Intro'
import Home from '@/pages/Home'
import Catalog from '@/pages/Catalog'
import Emulators from '@/pages/Emulators'
import Play from '@/pages/Play'
import About from '@/pages/About'

export default function App() {
  return (
    <Routes>
      <Route path="/intro" element={<Intro />} />
      <Route path="/" element={<Navigate to="/intro" replace />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="catalogo" element={<Catalog />} />
        <Route path="emuladores" element={<Emulators />} />
        <Route path="jogar" element={<Play />} />
        <Route path="sobre" element={<About />} />
      </Route>
    </Routes>
  )
}
