import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Preloader() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem('aureum-booted'))

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => {
      sessionStorage.setItem('aureum-booted', '1')
      setVisible(false)
    }, 2800)
    return () => clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="relative mb-10 h-36 w-36">
            <svg viewBox="0 0 140 140" className="h-full w-full">
              <circle cx="70" cy="70" r="58" fill="none" stroke="#2a2824" strokeWidth="1" />
              <circle
                cx="70"
                cy="70"
                r="58"
                fill="none"
                stroke="#c6a15b"
                strokeWidth="1.4"
                strokeDasharray="364"
                strokeDashoffset="364"
                style={{ animation: 'draw-circle 1.6s ease forwards' }}
              />
              <line
                x1="70"
                y1="70"
                x2="70"
                y2="24"
                stroke="#e8d5a3"
                strokeWidth="1.4"
                style={{
                  transformOrigin: '70px 70px',
                  animation: 'sweep-hand 2.2s ease-in-out forwards',
                }}
              />
              <circle cx="70" cy="70" r="3" fill="#c6a15b" />
            </svg>
          </div>
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-2xl tracking-[0.28em] text-gold sm:text-3xl sm:tracking-[0.55em] md:text-4xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              AUREUM
            </motion.p>
          </div>
          <motion.div
            className="mt-6 h-px w-40 origin-center bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          />
          <motion.p
            className="mt-4 px-4 text-center text-[10px] uppercase tracking-[0.22em] text-muted sm:tracking-[0.42em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Maison d&apos;Horlogerie
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
