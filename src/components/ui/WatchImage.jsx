import { useEffect, useState } from 'react'

export const FALLBACK_WATCH_IMAGE =
  'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?fm=jpg&fit=crop&w=900&q=80'

export function WatchImage({ src, alt, className = '', loading = 'lazy' }) {
  const [current, setCurrent] = useState(src || FALLBACK_WATCH_IMAGE)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setCurrent(src || FALLBACK_WATCH_IMAGE)
    setLoaded(false)
  }, [src])

  return (
    <img
      src={current}
      alt={alt}
      className={`${className} ${loaded ? '' : 'bg-panel animate-pulse'}`}
      loading={loading}
      referrerPolicy="no-referrer"
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (current !== FALLBACK_WATCH_IMAGE) setCurrent(FALLBACK_WATCH_IMAGE)
        else setLoaded(true)
      }}
    />
  )
}
