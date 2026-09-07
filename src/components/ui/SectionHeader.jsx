import { Reveal, SplitHeading } from './Reveal'
import { Button } from './Button'

export function SectionHeader({ eyebrow, title, text, align = 'center', actionTo, actionLabel }) {
  return (
    <Reveal className={`mb-12 md:mb-16 ${align === 'left' ? 'text-left' : 'text-center'}`}>
      {eyebrow && (
        <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-gold sm:text-[11px] sm:tracking-[0.42em]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl break-words text-cream italic sm:text-4xl md:text-5xl lg:text-6xl">
        <SplitHeading text={title} />
      </h2>
      {text && (
        <p className={`mt-5 max-w-xl text-sm leading-7 text-muted ${align === 'center' ? 'mx-auto' : ''}`}>
          {text}
        </p>
      )}
      <div className={`mt-6 h-px w-16 bg-gold/70 ${align === 'center' ? 'mx-auto' : ''}`} />
      {actionTo && actionLabel && (
        <div className={`mt-8 ${align === 'center' ? '' : ''}`}>
          <Button to={actionTo} variant="outline">
            {actionLabel}
          </Button>
        </div>
      )}
    </Reveal>
  )
}
