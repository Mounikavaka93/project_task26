export function QuantitySelector({ value, onChange, min = 1, max = 20, className = '' }) {
  return (
    <div className={`inline-flex items-center border border-line ${className}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        className="px-4 py-3 text-gold transition-colors hover:bg-gold/10 disabled:opacity-30"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="min-w-12 text-center text-sm tracking-widest">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        className="px-4 py-3 text-gold transition-colors hover:bg-gold/10 disabled:opacity-30"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  )
}
