import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LuxuryCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.4 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setEnabled(fine)
    if (!fine) return undefined

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }

    const onOver = (event) => {
      const target = event.target
      const interactive = target.closest('a, button, input, select, textarea, [data-cursor]')
      setHovering(Boolean(interactive))
    }

    document.body.classList.add('aureum-cursor')
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      document.body.classList.remove('aureum-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[90] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-difference"
        style={{ left: x, top: y }}
      />
      <motion.div
        className="pointer-events-none fixed z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/70"
        style={{
          left: ringX,
          top: ringY,
          width: hovering ? 52 : 34,
          height: hovering ? 52 : 34,
        }}
      />
    </>
  )
}
