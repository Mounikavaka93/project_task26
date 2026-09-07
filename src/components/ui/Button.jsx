import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'gold',
  className = '',
  disabled = false,
  state,
}) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const onMove = (event) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.22,
      y: (event.clientY - rect.top - rect.height / 2) * 0.22,
    })
  }

  const reset = () => setOffset({ x: 0, y: 0 })

  const styles = {
    gold: 'bg-gold text-ink hover:bg-gold-soft',
    outline: 'border border-gold/60 text-cream hover:bg-gold hover:text-ink',
    ghost: 'text-cream hover:text-gold',
    dark: 'bg-ink-soft text-cream border border-line hover:border-gold',
  }

  const classes = `relative inline-flex items-center justify-center gap-2 px-4 py-3 text-[10px] tracking-[0.16em] uppercase font-medium transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none sm:px-6 sm:text-[11px] sm:tracking-[0.28em] ${styles[variant]} ${className}`

  const inner = (
    <motion.span
      ref={ref}
      className={classes}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.4 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.span>
  )

  const wrapClass = className.includes('w-full') ? 'block w-full' : 'inline-block'

  if (to) {
    return (
      <Link to={to} state={state} className={wrapClass} onClick={onClick}>
        {inner}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={wrapClass}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={wrapClass}>
      {inner}
    </button>
  )
}
