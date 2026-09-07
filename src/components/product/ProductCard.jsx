import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../data/watches'
import { WatchImage } from '../ui/WatchImage'

export function ProductCard({ watch }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [activeColor, setActiveColor] = useState(watch.colors?.[0] || null)
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const preview = activeColor?.images?.[0] || watch.images[0]
  const detailsTo = `/watch/${watch.id}${activeColor ? `?finish=${activeColor.id}` : ''}`

  useEffect(() => {
    setActiveColor(watch.colors?.[0] || null)
  }, [watch])

  const onMove = (event) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -8, y: x * 8 })
  }

  const discount =
    watch.originalPrice > watch.price
      ? Math.round(((watch.originalPrice - watch.price) / watch.originalPrice) * 100)
      : 0

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformPerspective: 900,
      }}
      className="group relative flex h-full min-w-0 flex-col border border-line bg-panel transition-colors duration-300 hover:border-gold shimmer-hover"
    >
      <Link to={detailsTo} className="relative block overflow-hidden aspect-[4/5]">
        <WatchImage
          src={preview}
          alt={`${watch.name} ${activeColor?.name || ''}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80" />
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {watch.isNew && (
            <span className="bg-gold px-2 py-1 text-[9px] uppercase tracking-[0.22em] text-ink">New</span>
          )}
          {discount > 0 && (
            <span className="bg-rose px-2 py-1 text-[9px] uppercase tracking-[0.22em] text-cream">
              −{discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] uppercase tracking-[0.32em] text-gold">{watch.brand}</p>
        <h3 className="mt-2 font-serif text-2xl text-cream">
          <Link to={detailsTo} className="transition-colors hover:text-gold">
            {watch.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted">{activeColor?.name}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {watch.colors?.map((color) => (
            <button
              key={color.id}
              type="button"
              title={color.name}
              aria-label={`Preview ${color.name}`}
              onClick={() => setActiveColor(color)}
              className={`h-5 w-5 overflow-hidden rounded-full border transition-transform hover:scale-110 ${
                activeColor?.id === color.id ? 'border-gold ring-1 ring-gold' : 'border-line'
              }`}
            >
              <WatchImage src={color.images[0]} alt={color.name} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="text-sm tracking-wide text-cream">{formatPrice(watch.price)}</p>
            {discount > 0 && (
              <p className="text-xs text-muted line-through">{formatPrice(watch.originalPrice)}</p>
            )}
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{watch.category}</p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2">
          <button
            type="button"
            onClick={() => addToCart(watch, 1, activeColor || watch.colors?.[0])}
            className="bg-gold py-2.5 text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-soft"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => navigate(detailsTo)}
            className="border border-gold/50 py-2.5 text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            View details
          </button>
        </div>
      </div>
    </motion.article>
  )
}
