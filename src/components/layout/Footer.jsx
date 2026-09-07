import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="grid w-full gap-10 px-4 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <p className="font-display text-lg tracking-[0.28em] text-gold sm:text-xl sm:tracking-[0.4em]">AUREUM</p>
          <p className="mt-4 max-w-xs text-sm leading-7 text-muted">
            A private maison of fine horology. Timepieces composed in gold, smoke, and silence since 1924.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Maison</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-cream/80">
            <Link to="/" className="hover:text-gold">Home</Link>
            <Link to="/collection" className="hover:text-gold">Collection</Link>
            <Link to="/cart" className="hover:text-gold">Cart</Link>
            <Link to="/login" className="hover:text-gold">Login</Link>
            <Link to="/signup" className="hover:text-gold">Create account</Link>
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Atelier</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
            <span>Geneva · 12 Rue du Rhône</span>
            <span>Private appointments</span>
            <span>Worldwide courier</span>
            <span>Lifetime servicing</span>
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Correspondence</p>
          <p className="mt-4 text-sm text-muted">salon@aureum.watch</p>
          <p className="mt-2 text-sm text-muted">+41 22 000 1924</p>
        </div>
      </div>
      <div className="border-t border-line px-4 py-5 text-center text-[10px] uppercase tracking-[0.18em] text-muted sm:px-8 sm:tracking-[0.28em] lg:px-12">
        © {new Date().getFullYear()} Aureum Maison — Time, composed.
      </div>
    </footer>
  )
}
