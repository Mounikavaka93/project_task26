import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../ui/Button'
import { WatchImage } from '../ui/WatchImage'

export function PromoBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section id="promo" ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <motion.div style={{ y }} className="absolute inset-0 h-[130%] w-full">
        <WatchImage
          src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?fm=jpg&fit=crop&w=1800&q=80"
          alt="Private salon"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative w-full px-4 text-center sm:px-8 lg:px-12">
        <p className="text-[10px] uppercase tracking-[0.22em] text-gold sm:text-[11px] sm:tracking-[0.42em]">Invitation only</p>
        <h2 className="mt-5 font-serif text-3xl italic text-cream sm:text-4xl md:text-6xl">
          Reserve a private salon hour
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-cream/70">
          Try on limited pieces under gallery light. Champagne, quiet rooms, and a watchmaker if you wish to hear the movement speak.
        </p>
        <div className="mt-8">
          <Button to="/signup">Request an appointment</Button>
        </div>
      </div>
    </section>
  )
}
