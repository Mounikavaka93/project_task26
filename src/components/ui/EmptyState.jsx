import { Button } from './Button'

export function EmptyState({
  title = 'Nothing here yet',
  text = 'The salon tray is waiting for a first piece.',
  actionTo = '/collection',
  actionLabel = 'Explore the collection',
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="relative mb-8 h-24 w-24">
        <span className="absolute inset-0 rounded-full border border-gold/40 animate-orbit" />
        <span className="absolute inset-3 rounded-full border border-gold/20 animate-orbit-reverse" />
        <span className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-gold animate-gold-pulse" />
      </div>
      <h3 className="font-serif text-3xl text-cream">{title}</h3>
      <p className="mt-3 max-w-sm text-sm text-muted leading-relaxed">{text}</p>
      {(onAction || actionTo) && (
        <div className="mt-8">
          {onAction ? (
            <Button onClick={onAction}>{actionLabel}</Button>
          ) : (
            <Button to={actionTo}>{actionLabel}</Button>
          )}
        </div>
      )}
    </div>
  )
}
