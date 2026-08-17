export type ProductCategory =
  | 'all'
  | 'sneakers'
  | 'outerwear'
  | 'hoodies'
  | 'pants'
  | 'tees'
  | 'accessories'

export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  rating: number
  reviewsCount: number
  category: ProductCategory
  categoryLabel: string
  images: string[]
  badge?: 'NEW' | 'BESTSELLER' | 'SALE' | 'ARCHIVE' | 'VINTAGE'
  badgeVariant?: 'default' | 'retro' | 'destructive' | 'warning'
  inStock: boolean
  stockCount: number
  description: string
  features: string[]
  colors: { name: string; hex: string; bgClass?: string }[]
  sizes?: string[]
  specs: { label: string; value: string }[]
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

export interface FilterState {
  search: string
  category: string
  priceRange: [number, number]
  inStockOnly: boolean
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'
}

export interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  date: string
  title: string
  content: string
  productName: string
  verified: boolean
  helpful: number
}
