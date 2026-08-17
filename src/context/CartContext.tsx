import { createContext, useContext, useState, useEffect } from 'react'
import type { Product, CartItem } from '@/types/ecommerce'

interface PromoCode {
  code: string
  discountPercentage?: number
  discountFlat?: number
  description: string
}

const AVAILABLE_PROMOS: Record<string, PromoCode> = {
  RETRO20: { code: 'RETRO20', discountPercentage: 20, description: '20% Off All Items' },
  WELCOME15: { code: 'WELCOME15', discountPercentage: 15, description: '15% Off Welcome' },
  FREESHIP: { code: 'FREESHIP', description: 'Free Express Shipping' },
}

interface ToastMessage {
  id: string
  title: string
  description?: string
  type?: 'success' | 'info' | 'destructive'
}

interface CartContextType {
  cart: CartItem[]
  wishlist: Product[]
  isCartOpen: boolean
  isWishlistOpen: boolean
  isCheckoutOpen: boolean
  quickViewProduct: Product | null
  appliedPromo: PromoCode | null
  promoInput: string
  promoError: string | null
  toasts: ToastMessage[]
  
  // Actions
  setIsCartOpen: (open: boolean) => void
  setIsWishlistOpen: (open: boolean) => void
  setIsCheckoutOpen: (open: boolean) => void
  setQuickViewProduct: (product: Product | null) => void
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
  applyPromo: (code: string) => boolean
  removePromo: () => void
  setPromoInput: (val: string) => void
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'destructive') => void
  removeToast: (id: string) => void

  // Calculations
  subtotal: number
  discountAmount: number
  shippingFee: number
  taxAmount: number
  total: number
  totalItemCount: number
  freeShippingThreshold: number
  freeShippingProgress: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vibe-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('vibe-wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null)
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState<string | null>(null)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    localStorage.setItem('vibe-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('vibe-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'destructive' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, type }])
    setTimeout(() => {
      removeToast(id)
    }, 4000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    const color = selectedColor || product.colors[0]?.name
    const size = selectedSize || (product.sizes ? product.sizes[0] : undefined)

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      )

      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      } else {
        return [...prev, { product, quantity, selectedColor: color, selectedSize: size }]
      }
    })

    addToast(`Added to Cart`, `${product.name} (x${quantity})`, 'success')
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
    addToast('Removed from cart', undefined, 'info')
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) {
        addToast('Removed from Wishlist', product.name, 'info')
        return prev.filter((p) => p.id !== product.id)
      } else {
        addToast('Saved to Wishlist', product.name, 'success')
        return [...prev, product]
      }
    })
  }

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId)
  }

  const applyPromo = (code: string): boolean => {
    const upper = code.trim().toUpperCase()
    if (AVAILABLE_PROMOS[upper]) {
      setAppliedPromo(AVAILABLE_PROMOS[upper])
      setPromoError(null)
      setPromoInput('')
      addToast('Promo Code Applied!', AVAILABLE_PROMOS[upper].description, 'success')
      return true
    } else {
      setPromoError('Invalid coupon code. Try "VIBE20" or "CYBER50"')
      addToast('Invalid Coupon', 'Code not found or expired', 'destructive')
      return false
    }
  }

  const removePromo = () => {
    setAppliedPromo(null)
    setPromoError(null)
    addToast('Promo removed', undefined, 'info')
  }

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const freeShippingThreshold = 250

  let discountAmount = 0
  if (appliedPromo?.discountPercentage) {
    discountAmount = (subtotal * appliedPromo.discountPercentage) / 100
  } else if (appliedPromo?.discountFlat) {
    discountAmount = Math.min(appliedPromo.discountFlat, subtotal)
  }

  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold || appliedPromo?.code === 'FREESHIP'
  const shippingFee = cart.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : 15
  const taxAmount = (subtotal - discountAmount) * 0.08 // 8% estimated tax
  const total = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount)
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100)

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        isCheckoutOpen,
        quickViewProduct,
        appliedPromo,
        promoInput,
        promoError,
        toasts,
        setIsCartOpen,
        setIsWishlistOpen,
        setIsCheckoutOpen,
        setQuickViewProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyPromo,
        removePromo,
        setPromoInput,
        addToast,
        removeToast,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        total,
        totalItemCount,
        freeShippingThreshold,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
