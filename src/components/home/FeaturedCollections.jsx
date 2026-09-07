import { Link } from 'react-router-dom'
import { collections } from '../../data/watches'
import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../ui/Reveal'
import { WatchImage } from '../ui/WatchImage'

export function FeaturedCollections() {
  return (
    <section id="featured-collections" className="w-full px-4 py-20 sm:px-8 md:py-28 lg:px-12">
      <SectionHeader
        eyebrow="The maisons"
        title="Featured collections"
        text="Three private rooms. Heritage gold, midnight limited, and sport composed for motion."
      />
      <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <StaggerItem key={collection.id}>
            <Link
              to={`/collection?category=${collection.category}`}
              className="group relative block overflow-hidden border border-line"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <WatchImage
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{collection.subtitle}</p>
                <h3 className="mt-2 font-serif text-3xl italic text-cream md:text-4xl">{collection.title}</h3>
                <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-cream/70 transition-all duration-400 group-hover:translate-x-2 group-hover:text-gold">
                  View pieces →
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
