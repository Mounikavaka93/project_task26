import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { WatchImage } from '../ui/WatchImage'
import { useMouseParallax } from '../../hooks/useMouseParallax'

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  delay: (index % 9) * 0.7,
  duration: 9 + (index % 6),
  size: 2 + (index % 3),
}))

export function Hero() {
  const offset = useMouseParallax(22)

  return (
    <section className="relative min-h-[100svh] overflow-hidden" id="hero">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(198,161,91,0.14),transparent_42%),radial-gradient(circle_at_20%_80%,rgba(183,110,121,0.08),transparent_36%)]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute bottom-0 rounded-full bg-gold/70"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animation: `particle-drift ${particle.duration}s linear ${particle.delay}s infinite`,
          }}
        />
      ))}

      <div className="relative grid min-h-[100svh] w-full min-w-0 items-center gap-8 px-4 py-24 sm:gap-10 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.22em] text-gold sm:text-[11px] sm:tracking-[0.48em]"
          >
            Maison d&apos;Horlogerie · Est. 1924
          </motion.p>
          <h1 className="mt-6 font-serif text-[clamp(2.6rem,12vw,7.2rem)] leading-[0.9] break-words text-cream">
            {'TIME'.split('').map((letter, index) => (
              <motion.span
                key={`t-${letter}-${index}`}
                className="inline-block"
                initial={{ y: 80, opacity: 0, rotateX: 50 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ delay: 0.35 + index * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
            <span className="block italic text-gold-soft">
              {'composed.'.split('').map((letter, index) => (
                <motion.span
                  key={`c-${letter}-${index}`}
                  className="inline-block"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.045, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6 max-w-md text-sm leading-7 text-muted"
          >
            Limited timepieces, private salons, and movements finished like jewelry.
            A house for collectors who prefer gold that whispers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button to="/collection">Enter the collection</Button>
            <Button to="/collection?sort=new" variant="outline">
              New arrivals
            </Button>
          </motion.div>
        </div>

        <div className="relative mx-auto h-[min(68vw,420px)] w-[min(68vw,420px)] max-h-[520px] max-w-[520px]">
          <div className="absolute inset-[-8%] rounded-full border border-gold/20 animate-orbit-slow" />
          <div className="absolute inset-[-18%] rounded-full border border-dashed border-gold/15 animate-orbit-reverse" />
          <div className="absolute inset-6 rounded-full bg-gold/10 blur-3xl animate-breathe" />
          <motion.div
            className="animate-float-watch relative h-full w-full"
            style={{ x: offset.x, y: offset.y }}
          >
            <Link to="/watch/aur-nocturne-01" className="block h-full w-full">
              <WatchImage
                src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?fm=jpg&fit=crop&w=1100&q=80"
                alt="Aureum Nocturne Or showcase"
                className="h-full w-full rounded-full object-cover shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                loading="eager"
              />
            </Link>
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-gold/30" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted">Scroll the salon</span>
        <span className="h-10 w-px origin-top bg-gold animate-breathe" />
      </motion.div>
    </section>
  )
}
