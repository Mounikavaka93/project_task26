export function LoadingSpinner({ label = 'Composing the salon' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-6">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full animate-spin-slow">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#2a2824" strokeWidth="1" />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#c6a15b"
            strokeWidth="1.5"
            strokeDasharray="40 180"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-gold" />
      </div>
      <p className="text-[11px] uppercase tracking-[0.35em] text-muted">{label}</p>
    </div>
  )
}

export function ProductSkeleton() {
  return (
    <div className="animate-pulse border border-line bg-panel">
      <div className="aspect-[4/5] bg-ink-soft" />
      <div className="space-y-3 p-5">
        <div className="h-2 w-16 bg-line" />
        <div className="h-5 w-3/4 bg-line" />
        <div className="h-3 w-1/3 bg-line" />
      </div>
    </div>
  )
}
