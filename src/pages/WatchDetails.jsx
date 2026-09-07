import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ColorSelector } from '../components/product/ColorSelector'
import { ProductCard } from '../components/product/ProductCard'
import { ProductGallery } from '../components/product/ProductGallery'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { QuantitySelector } from '../components/ui/QuantitySelector'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useCart } from '../context/CartContext'
import { formatPrice, getColorById, getRelatedWatches, getWatchById } from '../data/watches'

const specOrder = [
  ['Case Material', 'caseFinish', 'caseMaterial'],
  ['Strap Material', 'strap', 'strapMaterial'],
  ['Movement', null, 'movement'],
  ['Water Resistance', null, 'waterResistance'],
  ['Dial Color', 'dial', 'dialColor'],
]

export function WatchDetails() {
  const { id } = useParams()
  const [params, setParams] = useSearchParams()
  const watch = getWatchById(id)
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState(() => getColorById(watch, params.get('finish')))
  const [colorError, setColorError] = useState('')
  const related = useMemo(() => (watch ? getRelatedWatches(watch) : []), [watch])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setQuantity(1)
    setColorError('')
  }, [watch?.id])

  useEffect(() => {
    setColor(getColorById(watch, params.get('finish')))
  }, [watch, params])

  if (!watch) {
    return (
      <Container className="py-16">
        <EmptyState
          title="This piece has left the salon"
          text="The reference could not be found. Return to the collection."
          actionTo="/collection"
          actionLabel="Back to collection"
        />
      </Container>
    )
  }

  const hasDiscount = watch.originalPrice > watch.price
  const discount = hasDiscount
    ? Math.round(((watch.originalPrice - watch.price) / watch.originalPrice) * 100)
    : 0

  const galleryImages = color?.images?.length ? color.images : watch.images

  const liveSpecs = specOrder.map(([label, colorKey, specKey]) => ({
    label,
    value: (colorKey && color?.[colorKey]) || watch.specs[specKey],
  }))

  const chooseColor = (next) => {
    setColor(next)
    setColorError('')
    const nextParams = new URLSearchParams(params)
    nextParams.set('finish', next.id)
    setParams(nextParams, { replace: true })
  }

  const placeInCart = () => {
    if (!color) {
      setColorError('Please choose a finish before placing the order.')
      return false
    }
    addToCart(watch, quantity, color)
    return true
  }

  return (
    <Container className="py-16 md:py-20">
      <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-muted">
        <Link to="/collection" className="hover:text-gold">
          Collection
        </Link>
        <span className="mx-2 text-line">/</span>
        <span>{watch.brand}</span>
        <span className="mx-2 text-line">/</span>
        <span className="text-cream">{watch.name}</span>
      </p>

      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={galleryImages} name={watch.name} finish={color?.name} />
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.36em] text-gold">{watch.brand}</p>
          <h1 className="mt-3 font-serif text-4xl break-words text-cream sm:text-5xl md:text-6xl">{watch.name}</h1>

          <div className="mt-5 border border-line bg-panel px-4 py-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-gold">Price</p>
            <div className="mt-2 flex flex-wrap items-end gap-3">
              <p className="text-2xl tracking-wide text-cream">{formatPrice(watch.price)}</p>
              {hasDiscount ? (
                <>
                  <p className="text-muted line-through">{formatPrice(watch.originalPrice)}</p>
                  <span className="bg-rose px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
                    {discount}% off
                  </span>
                </>
              ) : (
                <span className="text-xs uppercase tracking-[0.18em] text-muted">Salon price</span>
              )}
            </div>
          </div>

          <p className="mt-3 text-sm text-muted">
            {watch.rating} ★ · {watch.reviewsCount} salon reviews
            {color?.ref ? ` · Ref. ${color.ref}` : ''}
          </p>
          <p className="mt-6 max-w-xl text-sm leading-7 text-muted">{watch.description}</p>

          <div className="mt-8 border border-line bg-panel p-5">
            <ColorSelector
              colors={watch.colors}
              value={color}
              onChange={chooseColor}
              error={colorError}
            />
          </div>

          <div className="mt-10">
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-gold">Specifications</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {liveSpecs.map((spec) => (
                <div key={spec.label} className="border border-line bg-panel px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{spec.label}</p>
                  <p className="mt-2 text-sm text-cream">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Quantity</p>
              <QuantitySelector value={quantity} onChange={setQuantity} max={watch.stock} />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button className="w-full" onClick={placeInCart}>
                Add to cart
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  if (placeInCart()) navigate('/checkout')
                }}
              >
                Buy now
              </Button>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted">
            {watch.stock} remaining · {color?.name} finish ships in a salon case
          </p>
        </Reveal>
      </div>

      <section className="mt-20" id="reviews">
        <SectionHeader eyebrow="Patrons" title="Customer reviews" align="left" />
        <div className="grid gap-5 md:grid-cols-2">
          {watch.reviews.map((review) => (
            <article key={`${watch.id}-${review.author}`} className="border border-line bg-panel p-6">
              <p className="text-gold">{'★'.repeat(review.rating)}</p>
              <p className="mt-3 font-serif text-xl italic text-cream">“{review.text}”</p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-muted">{review.author}</p>
            </article>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-20" id="related">
          <SectionHeader eyebrow="Continue" title="Related watches" align="left" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} watch={item} />
            ))}
          </div>
        </section>
      )}
    </Container>
  )
}
