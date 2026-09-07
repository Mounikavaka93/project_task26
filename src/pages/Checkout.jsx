import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { WatchImage } from '../components/ui/WatchImage'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/watches'

const inputClass = (invalid) =>
  `w-full border bg-ink px-4 py-3 text-sm text-cream outline-none focus:border-gold ${
    invalid ? 'border-rose' : 'border-line'
  }`

export function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postal: '',
    payment: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!user) return
    setForm((current) => ({
      ...current,
      name: current.name || user.name || '',
      email: current.email || user.email || '',
    }))
  }, [user])

  if (items.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Nothing to place"
          text="Add a watch before opening the salon ledger."
          actionTo="/collection"
          actionLabel="Browse watches"
        />
      </Container>
    )
  }

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Enter your full name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email'
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number'
    if (!form.address.trim()) next.address = 'Street address is required'
    if (!form.city.trim()) next.city = 'City is required'
    if (!form.country.trim()) next.country = 'Country is required'
    if (form.postal.trim().length < 3) next.postal = 'Enter a valid postal code'
    if (form.payment === 'card') {
      if (form.cardNumber.replace(/\s/g, '').length < 12) next.cardNumber = 'Enter a card number'
      if (!/^\d{2}\/\d{2}$/.test(form.expiry.trim())) next.expiry = 'Use MM/YY'
      if (!/^\d{3,4}$/.test(form.cvv.trim())) next.cvv = 'Enter a CVV'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    sessionStorage.setItem(
      'aureum-last-order',
      JSON.stringify({
        name: form.name.trim(),
        total,
        count: items.reduce((sum, item) => sum + item.quantity, 0),
      }),
    )
    clearCart()
    navigate('/order-success')
  }

  const field = (key, label, type = 'text', extra = {}) => (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-gold">{label}</span>
      <input
        type={type}
        value={form[key]}
        onChange={(event) => update(key, event.target.value)}
        className={inputClass(Boolean(errors[key]))}
        {...extra}
      />
      {errors[key] && <span className="mt-1 block text-xs text-rose">{errors[key]}</span>}
    </label>
  )

  return (
    <Container className="py-16 md:py-20">
      <p className="text-[10px] uppercase tracking-[0.28em] text-gold sm:text-[11px] sm:tracking-[0.4em]">The ledger</p>
      <h1 className="mt-3 font-serif text-4xl italic text-cream sm:text-5xl">Checkout</h1>

      <form onSubmit={onSubmit} className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <section className="border border-line bg-panel p-5 sm:p-6">
            <h2 className="font-serif text-2xl">Customer details</h2>
            {!user && (
              <p className="mt-3 text-sm text-muted">
                Already a patron?{' '}
                <Link to="/login" state={{ from: '/checkout' }} className="text-gold hover:text-gold-soft">
                  Login
                </Link>
                {' · '}
                <Link to="/signup" state={{ from: '/checkout' }} className="text-gold hover:text-gold-soft">
                  Create account
                </Link>
              </p>
            )}
            {user && <p className="mt-3 text-sm text-gold">Signed in as {user.name}</p>}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {field('name', 'Full name', 'text', { autoComplete: 'name' })}
              {field('email', 'Email', 'email', { autoComplete: 'email' })}
              <div className="md:col-span-2">{field('phone', 'Phone', 'tel', { autoComplete: 'tel' })}</div>
            </div>
          </section>

          <section className="border border-line bg-panel p-5 sm:p-6">
            <h2 className="font-serif text-2xl">Shipping address</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                {field('address', 'Street address', 'text', { autoComplete: 'street-address' })}
              </div>
              {field('city', 'City', 'text', { autoComplete: 'address-level2' })}
              {field('country', 'Country', 'text', { autoComplete: 'country-name' })}
              {field('postal', 'Postal code', 'text', { autoComplete: 'postal-code' })}
            </div>
          </section>

          <section className="border border-line bg-panel p-5 sm:p-6">
            <h2 className="font-serif text-2xl">Payment method</h2>
            <div className="mt-6 grid gap-3">
              {[
                { id: 'card', label: 'Salon card · Visa / Mastercard' },
                { id: 'transfer', label: 'Private bank transfer' },
                { id: 'cod', label: 'Pay on delivery' },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-4 ${
                    form.payment === method.id ? 'border-gold bg-gold/5' : 'border-line'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={form.payment === method.id}
                    onChange={() => update('payment', method.id)}
                    className="accent-[#c6a15b]"
                  />
                  <span className="text-sm">{method.label}</span>
                </label>
              ))}
            </div>
            {form.payment === 'card' && (
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  {field('cardNumber', 'Card number', 'text', {
                    inputMode: 'numeric',
                    autoComplete: 'cc-number',
                    placeholder: '•••• •••• •••• ••••',
                  })}
                </div>
                {field('expiry', 'Expiry (MM/YY)', 'text', {
                  autoComplete: 'cc-exp',
                  placeholder: 'MM/YY',
                })}
                {field('cvv', 'CVV', 'password', {
                  autoComplete: 'cc-csc',
                  placeholder: '123',
                })}
              </div>
            )}
            {form.payment === 'transfer' && (
              <p className="mt-4 text-sm text-muted">
                Bank details will be sent with your salon confirmation letter.
              </p>
            )}
            {form.payment === 'cod' && (
              <p className="mt-4 text-sm text-muted">Pay the courier when the velvet case arrives.</p>
            )}
          </section>
        </div>

        <aside className="h-fit border border-line bg-panel p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div key={item.lineId} className="flex items-start gap-3 text-sm">
                <WatchImage
                  src={item.selectedColor?.images?.[0] || item.images[0]}
                  alt={item.name}
                  className="h-14 w-14 shrink-0 object-cover"
                />
                <span className="min-w-0 flex-1 text-muted">
                  {item.name} × {item.quantity}
                  <span className="mt-1 flex items-center gap-2 text-xs text-cream/80">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border border-line"
                      style={{ backgroundColor: item.selectedColor?.hex }}
                    />
                    {item.selectedColor?.name}
                  </span>
                </span>
                <span className="shrink-0 text-cream">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Courier</span>
              <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-base text-cream">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full" disabled={submitting}>
              Place order
            </Button>
          </div>
        </aside>
      </form>
    </Container>
  )
}
