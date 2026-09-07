import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add('smooth-scroll')
    return () => document.documentElement.classList.remove('smooth-scroll')
  }, [])
}
