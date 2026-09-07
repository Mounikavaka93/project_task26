import { watches } from '../../data/watches'
import { ProductCard } from '../product/ProductCard'
import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../ui/Reveal'

export function BestSellers() {
  const items = watches.filter((watch) => watch.isBestSeller).slice(0, 4)

  return (
    <section id="best-sellers" className="w-full px-4 py-20 sm:px-8 md:py-28 lg:px-12">
      <SectionHeader
        eyebrow="Most desired"
        title="Best selling watches"
        text="The pieces collectors return for — measured not in volume, but in quiet insistence."
        actionTo="/collection"
        actionLabel="View the collection"
      />
      <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((watch) => (
          <StaggerItem key={watch.id}>
            <ProductCard watch={watch} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
