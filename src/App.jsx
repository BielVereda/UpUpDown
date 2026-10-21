import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MainLayout } from '@/components/templates'
import Intro from '@/pages/Intro'
import Home from '@/pages/Home'
import Catalog from '@/pages/Catalog'
import Emulators from '@/pages/Emulators'
import Play from '@/pages/Play'
import About from '@/pages/About'

// Arcade page transition animation
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/intro" element={<Intro />} />
        <Route path="/" element={<Navigate to="/intro" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Home />
            </motion.div>
          } />
          <Route path="catalogo" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Catalog />
            </motion.div>
          } />
          <Route path="emuladores" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Emulators />
            </motion.div>
          } />
          <Route path="jogar" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Play />
            </motion.div>
          } />
          <Route path="sobre" element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <About />
            </motion.div>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
