import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useScrollDirection } from '../../hooks/useScrollDirection'

const links = [
  { to: '/', label: 'Maison' },
  { to: '/collection', label: 'Collection' },
  { to: '/cart', label: 'Cart' },
]

export function Navbar() {
  const { scrolled, progress } = useScrollDirection()
  const { count } = useCart()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 ${
          scrolled || open ? 'bg-ink/90 backdrop-blur-xl border-b border-line' : 'bg-transparent'
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gold" style={{ transform: `scaleX(${progress})` }} />
        <div className="flex w-full min-w-0 items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4 lg:px-12">
          <Link
            to="/"
            className="shrink-0 font-display text-[13px] tracking-[0.28em] text-gold sm:text-lg sm:tracking-[0.42em] md:text-xl"
          >
            AUREUM
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-[11px] uppercase tracking-[0.28em] transition-colors ${
                    isActive ? 'text-gold' : 'text-cream/80 hover:text-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <Link
              to="/cart"
              className="relative text-[11px] uppercase tracking-[0.22em] text-cream hover:text-gold"
            >
              <span className="hidden min-[380px]:inline">Cart</span>
              <span className="min-[380px]:ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] text-ink">
                {count}
              </span>
            </Link>
            {user ? (
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="hidden text-[11px] uppercase tracking-[0.22em] text-muted hover:text-gold md:inline"
              >
                {user.name.split(' ')[0]} · Exit
              </button>
            ) : (
              <div className="hidden items-center gap-4 md:flex">
                <Link
                  to="/login"
                  className="text-[11px] uppercase tracking-[0.22em] text-cream hover:text-gold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border border-gold/50 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gold hover:bg-gold hover:text-ink"
                >
                  Create account
                </Link>
              </div>
            )}
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              className="relative h-11 w-11 lg:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              <span
                className={`absolute left-2 right-2 top-3.5 h-px bg-gold transition-all duration-300 ${
                  open ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-2 right-2 top-[22px] h-px bg-gold transition-opacity duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-2 right-2 top-[1.625rem] h-px bg-gold transition-all duration-300 ${
                  open ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/96 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
              className="flex h-full flex-col items-center justify-center gap-8 px-4"
            >
              {[
                ...links,
                { to: user ? '/' : '/login', label: user ? 'Sign out' : 'Login' },
                { to: '/signup', label: 'Register' },
              ].map((link) => (
                <motion.div
                  key={link.label}
                  variants={{
                    hidden: { y: 24, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                >
                  <Link
                    to={link.to}
                    onClick={() => {
                      if (link.label === 'Sign out') logout()
                      setOpen(false)
                    }}
                    className="font-serif text-3xl italic text-cream hover:text-gold sm:text-4xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
