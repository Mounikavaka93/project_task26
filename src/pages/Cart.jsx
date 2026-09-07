import { Link } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { QuantitySelector } from '../components/ui/QuantitySelector'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { WatchImage } from '../components/ui/WatchImage'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/watches'

export function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, shipping, total, count } = useCart()

  if (items.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          title="The salon cart is empty"
          text="Choose a piece from the collection and we will keep it waiting."
          actionTo="/collection"
          actionLabel="Browse watches"
        />
      </Container>
    )
  }

  return (
    <Container className="py-16 md:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-gold sm:text-[11px] sm:tracking-[0.4em]">Your selection</p>
          <h1 className="mt-3 font-serif text-4xl italic text-cream sm:text-5xl">Shopping cart</h1>
        </div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
          {count} piece{count === 1 ? '' : 's'}
        </p>
      </div>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          {items.map((item) => {
            const detailsTo = `/watch/${item.id}${item.selectedColor?.id ? `?finish=${item.selectedColor.id}` : ''}`
            const lineTotal = item.price * item.quantity
            return (
              <article
                key={item.lineId}
                className="grid min-w-0 grid-cols-[72px_minmax(0,1fr)] items-center gap-3 border border-line bg-panel p-3 sm:grid-cols-[140px_minmax(0,1fr)_auto] sm:gap-4 sm:p-4"
              >
                <Link to={detailsTo} className="overflow-hidden">
                  <WatchImage
                    src={item.selectedColor?.images?.[0] || item.images[0]}
                    alt={`${item.name} ${item.selectedColor?.name || ''}`}
                    className="h-28 w-full object-cover sm:h-32"
                  />
                </Link>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{item.brand}</p>
                  <Link to={detailsTo} className="font-serif text-2xl text-cream hover:text-gold">
                    {item.name}
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
                    <span
                      className="inline-block h-3.5 w-3.5 rounded-full border border-line"
                      style={{ backgroundColor: item.selectedColor?.hex }}
                    />
                    <span>{item.selectedColor?.name}</span>
                    <span>·</span>
                    <span>{formatPrice(item.price)} each</span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item.lineId, value)}
                      max={item.stock || 20}
                    />
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.lineId)}
                      className="text-[11px] uppercase tracking-[0.2em] text-rose hover:text-cream"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-cream sm:hidden">{formatPrice(lineTotal)}</p>
                </div>
                <p className="hidden text-right text-cream sm:block">{formatPrice(lineTotal)}</p>
              </article>
            )
          })}
          <Link to="/collection" className="inline-block text-[11px] uppercase tracking-[0.24em] text-gold hover:text-gold-soft">
            ← Continue collecting
          </Link>
        </div>

        <aside className="h-fit border border-line bg-panel p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl text-cream">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Courier</span>
              <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base text-cream">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">Complimentary courier above $8,000.</p>
          <div className="mt-6">
            <Button to="/checkout" className="w-full">
              Checkout
            </Button>
          </div>
        </aside>
      </div>
    </Container>
  )
}
