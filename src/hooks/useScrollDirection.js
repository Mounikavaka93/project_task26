import { useEffect, useState } from 'react'

export function useScrollDirection() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 24)
      setHidden(y > lastY && y > 80)
      setProgress(height > 0 ? y / height : 0)
      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { hidden, scrolled, progress }
}
