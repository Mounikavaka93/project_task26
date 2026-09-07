import { WatchImage } from '../ui/WatchImage'

export function ColorSelector({ colors, value, onChange, error }) {
  if (!colors?.length) return null

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Configure the finish</p>
          <p className="mt-2 font-serif text-2xl text-cream">{value?.name || 'Select a finish'}</p>
        </div>
        {value?.ref && (
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Ref. {value.ref}</p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {colors.map((color) => {
          const selected = value?.id === color.id
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onChange(color)}
              className={`group text-left transition-colors ${
                selected ? 'border border-gold bg-gold/5' : 'border border-line hover:border-gold/50'
              }`}
            >
              <span className="relative block aspect-square overflow-hidden">
                <WatchImage
                  src={color.images[0]}
                  alt={color.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute bottom-2 right-2 h-4 w-4 rounded-full border border-cream/40"
                  style={{ backgroundColor: color.hex }}
                />
              </span>
              <span className="block px-2 py-2 text-[10px] uppercase tracking-[0.16em] text-cream">
                {color.name}
              </span>
            </button>
          )
        })}
      </div>

      {value && (
        <div className="mt-5 grid gap-2 border-t border-line pt-4 text-sm text-muted sm:grid-cols-3">
          <p>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-gold">Dial</span>
            {value.dial}
          </p>
          <p>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-gold">Case</span>
            {value.caseFinish}
          </p>
          <p>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-gold">Strap</span>
            {value.strap}
          </p>
        </div>
      )}
      {error && <p className="mt-2 text-xs text-rose">{error}</p>}
    </div>
  )
}
