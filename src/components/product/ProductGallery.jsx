import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { WatchImage } from '../ui/WatchImage'

export function ProductGallery({ images, name, finish }) {
  const [active, setActive] = useState(0)
  const total = images?.length || 0

  useEffect(() => {
    setActive(0)
  }, [finish, images])

  if (!total) return null

  const go = (direction) => {
    setActive((current) => (current + direction + total) % total)
  }

  return (
    <div className="grid gap-4 lg:sticky lg:top-24">
      <div className="relative overflow-hidden border border-line bg-panel aspect-square lg:aspect-[4/5]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${finish}-${images[active]}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <WatchImage
              src={images[active]}
              alt={`${name} ${finish || ''} view ${active + 1}`}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
        {finish && (
          <p className="absolute left-4 top-4 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur">
            {finish}
          </p>
        )}
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 border border-gold/40 bg-ink/70 px-2 py-1.5 text-gold backdrop-blur hover:bg-gold hover:text-ink sm:left-3 sm:px-3 sm:py-2"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 border border-gold/40 bg-ink/70 px-2 py-1.5 text-gold backdrop-blur hover:bg-gold hover:text-ink sm:right-3 sm:px-3 sm:py-2"
            >
              ›
            </button>
          </>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={`${finish}-${image}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={`relative overflow-hidden border aspect-[4/3] ${
              active === index ? 'border-gold' : 'border-line hover:border-gold/50'
            }`}
          >
            <WatchImage
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
