import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const ease = [0.76, 0, 0.24, 1]

export function PageTransition({ children }) {
  const location = useLocation()
  const firstLoad = useRef(true)
  const skipCurtain = firstLoad.current

  useEffect(() => {
    firstLoad.current = false
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        {!skipCurtain && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[60] origin-bottom bg-gold"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.55, ease }}
          />
        )}
        <motion.div
          initial={skipCurtain ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.65, delay: skipCurtain ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 overflow-x-clip"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
