import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { testimonials } from '../../data/watches'
import { SectionHeader } from '../ui/SectionHeader'

export function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length)
    }, 5200)
    return () => clearInterval(timer)
  }, [])

  const item = testimonials[index]

  return (
    <section id="testimonials" className="w-full px-4 py-20 sm:px-8 md:py-28 lg:px-12">
      <SectionHeader eyebrow="Patrons" title="Salon notes" />
      <div className="relative flex min-h-[280px] w-full min-w-0 flex-col justify-between border border-line bg-panel px-4 py-10 sm:px-6 md:min-h-[360px] md:px-16 md:py-12">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <p className="font-serif text-xl italic leading-relaxed break-words text-cream md:text-4xl">
              “{item.quote}”
            </p>
            <footer className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{item.name}</p>
              <p className="mt-2 text-sm text-muted">{item.role}</p>
              <p className="mt-3 text-gold">{'★'.repeat(item.rating)}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((testimonial, dot) => (
            <button
              key={testimonial.id}
              type="button"
              aria-label={`Show testimonial ${dot + 1}`}
              onClick={() => setIndex(dot)}
              className={`h-1.5 transition-all ${
                dot === index ? 'w-8 bg-gold' : 'w-3 bg-line hover:bg-gold/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
