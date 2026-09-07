import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { formatPrice } from '../data/watches'

export function OrderSuccess() {
  const order = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('aureum-last-order') || 'null')
    } catch {
      return null
    }
  }, [])

  return (
    <div className="flex min-h-[70vh] w-full min-w-0 flex-col items-center justify-center px-4 py-20 text-center sm:px-8">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 14 }}
        className="relative mb-8 h-28 w-28"
      >
        <span className="absolute inset-0 rounded-full border border-gold/40 animate-orbit" />
        <span className="absolute inset-4 rounded-full border border-gold animate-gold-pulse" />
        <span className="absolute inset-0 flex items-center justify-center font-serif text-4xl text-gold">
          ✓
        </span>
      </motion.div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-gold sm:text-[11px] sm:tracking-[0.4em]">Confirmed</p>
      <h1 className="mt-3 font-serif text-4xl italic text-cream sm:text-5xl">The piece is yours</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-muted">
        {order?.name
          ? `${order.name}, a salon letter is on its way. ${order.count} piece${order.count === 1 ? '' : 's'} · ${formatPrice(order.total)}.`
          : 'A salon letter is on its way. Your watch will be packed in velvet and dispatched by private courier.'}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button to="/collection">Continue collecting</Button>
        <Button to="/" variant="outline">
          Return home
        </Button>
      </div>
    </div>
  )
}
