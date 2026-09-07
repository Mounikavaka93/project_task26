import { Link } from 'react-router-dom'
import { brands } from '../../data/watches'
import { SectionHeader } from '../ui/SectionHeader'
import { Reveal } from '../ui/Reveal'

const row = [...brands, ...brands, ...brands]

export function BrandMarquee() {
  return (
    <section id="brands" className="overflow-hidden border-y border-line py-20 md:py-24">
      <SectionHeader
        eyebrow="Maisons"
        title="House collections"
        text="Eight ateliers under one roof. Each with a distinct temperament, all finished to Aureum standard."
      />
      <div className="relative overflow-x-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
        <div className="flex w-max animate-marquee gap-12 pr-12 hover:[animation-play-state:paused]">
          {row.map((brand, index) => (
            <Link
              key={`${brand}-${index}`}
              to={`/collection?brand=${encodeURIComponent(brand)}`}
              className="font-display text-3xl tracking-[0.28em] text-cream/20 transition-colors hover:text-gold md:text-5xl"
            >
              {brand.toUpperCase()}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex w-max animate-marquee-reverse gap-12 pr-12 hover:[animation-play-state:paused]">
          {row.map((brand, index) => (
            <Link
              key={`rev-${brand}-${index}`}
              to={`/collection?brand=${encodeURIComponent(brand)}`}
              className="font-serif text-3xl italic text-gold/40 transition-colors hover:text-gold md:text-5xl"
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
      <Reveal className="mt-14 grid w-full grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        {[
          { label: 'Geneva finishing', to: '/collection' },
          { label: 'Private salon', to: '/signup' },
          { label: 'Numbered editions', to: '/collection?category=Limited' },
          { label: 'Lifetime service', to: '/collection' },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="border border-line px-5 py-6 text-center transition-colors hover:border-gold"
          >
            <p className="font-serif text-xl text-cream">{item.label}</p>
          </Link>
        ))}
      </Reveal>
    </section>
  )
}
