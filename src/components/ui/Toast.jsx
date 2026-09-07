import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useCart } from '../../context/CartContext'

export function Toast() {
  const { toast, setToast } = useCart()

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timer)
  }, [toast, setToast])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="fixed bottom-6 left-1/2 z-[70] w-[min(92vw,420px)] -translate-x-1/2 border border-gold/40 bg-ink-soft/95 px-5 py-4 text-center backdrop-blur"
        >
          <p className="break-words text-[11px] uppercase tracking-[0.16em] text-gold sm:tracking-[0.22em]">{toast.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
