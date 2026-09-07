import { watches } from '../../data/watches'
import { ProductCard } from '../product/ProductCard'
import { SectionHeader } from '../ui/SectionHeader'
import { Stagger, StaggerItem } from '../ui/Reveal'

export function NewArrivals() {
  const items = watches.filter((watch) => watch.isNew).slice(0, 4)

  return (
    <section id="new-arrivals" className="bg-ink-soft py-20 md:py-28">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <SectionHeader
          eyebrow="Just arrived"
          title="New arrivals"
          text="Fresh from the atelier — first editions and pieces that have not yet seen a salon window."
          actionTo="/collection?sort=new"
          actionLabel="View all arrivals"
        />
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((watch) => (
            <StaggerItem key={watch.id}>
              <ProductCard watch={watch} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
