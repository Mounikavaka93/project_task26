import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { watches } from '../data/watches'

const CartContext = createContext(null)
const STORAGE_KEY = 'aureum-cart'

const fallbackColor = { name: 'Obsidian', hex: '#141416' }

const lineIdFor = (watch, color) => `${watch.id}::${color?.name || fallbackColor.name}`

const normalizeItem = (item) => {
  const live = watches.find((watch) => watch.id === item.id)
  const selectedColor =
    live?.colors?.find((color) => color.id === item.selectedColor?.id || color.name === item.selectedColor?.name) ||
    live?.colors?.[0] ||
    item.selectedColor ||
    fallbackColor

  return {
    ...item,
    ...live,
    quantity: item.quantity,
    selectedColor,
    images: selectedColor.images || live?.images || item.images,
    lineId: item.lineId || lineIdFor(item, selectedColor),
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved).map(normalizeItem) : []
    } catch {
      return []
    }
  })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const showToast = (message) => {
    setToast({ id: Date.now(), message })
  }

  const addToCart = (watch, quantity = 1, color) => {
    const selectedColor = color || watch.colors?.[0] || fallbackColor
    const lineId = lineIdFor(watch, selectedColor)
    const variantImages = selectedColor.images?.length ? selectedColor.images : watch.images

    setItems((current) => {
      const existing = current.find((item) => item.lineId === lineId)
      if (existing) {
        return current.map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: Math.min(item.quantity + quantity, watch.stock || 20) }
            : item,
        )
      }
      return [
        ...current,
        {
          ...watch,
          quantity,
          selectedColor,
          lineId,
          images: variantImages,
        },
      ]
    })
    showToast(`${watch.name} · ${selectedColor.name} added to cart`)
  }

  const removeFromCart = (lineId) => {
    setItems((current) => current.filter((item) => item.lineId !== lineId))
    showToast('Piece removed from cart')
  }

  const updateQuantity = (lineId, quantity) => {
    setItems((current) =>
      current
        .map((item) => (item.lineId === lineId ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => setItems([])

  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal === 0 || subtotal >= 8000 ? 0 : 85
  const total = subtotal + shipping

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      count,
      subtotal,
      shipping,
      total,
      toast,
      setToast,
    }),
    [items, count, subtotal, shipping, total, toast],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
