import { useEffect, useState } from 'react'

export function useMouseParallax(strength = 18) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * strength
      const y = (event.clientY / window.innerHeight - 0.5) * strength
      setOffset({ x, y })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [strength])

  return offset
}
