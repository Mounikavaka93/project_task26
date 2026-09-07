import { useState } from 'react'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Please enter a valid salon email.')
      return
    }
    setStatus('You are on the private list.')
    setEmail('')
  }

  return (
    <section id="newsletter" className="border-t border-line bg-ink-soft py-20 md:py-24">
      <Reveal className="mx-auto w-full max-w-3xl px-4 text-center sm:px-8">
        <p className="text-[10px] uppercase tracking-[0.22em] text-gold sm:text-[11px] sm:tracking-[0.42em]">Correspondence</p>
        <h2 className="mt-4 font-serif text-3xl italic text-cream sm:text-4xl md:text-5xl">
          Letters from the atelier
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted">
          First looks at limited editions, salon evenings, and the occasional movement sketch.
        </p>
        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="your@email.com"
            className="flex-1 border border-line bg-ink px-4 py-3 text-sm text-cream outline-none placeholder:text-muted focus:border-gold"
          />
          <Button type="submit">Subscribe</Button>
        </form>
        {status && <p className="mt-4 text-xs tracking-wide text-gold">{status}</p>}
      </Reveal>
    </section>
  )
}
