import { useState } from 'react'
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react'
import type { Product } from '@/types/ecommerce'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
  layoutMode?: 'grid' | 'list'
}

export function ProductCard({ product, layoutMode = 'grid' }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name)
  const [isAddedRecently, setIsAddedRecently] = useState(false)

  const isWishlisted = isInWishlist(product.id)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product, 1, selectedColor)
    setIsAddedRecently(true)
    setTimeout(() => setIsAddedRecently(false), 2000)
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.stopPropagation()
    setQuickViewProduct(product)
  }

  if (layoutMode === 'list') {
    return (
      <div
        onClick={handleOpenQuickView}
        className="retro-card p-4 flex flex-col sm:flex-row items-center gap-5 cursor-pointer text-left bg-card group"
      >
        <div className="relative h-44 w-full sm:w-48 shrink-0 overflow-hidden bg-secondary border border-foreground/30">
          <img
            src={product.images[currentImageIndex] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <div className="absolute top-2.5 left-2.5">
              <Badge variant="retro">{product.badge}</Badge>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2 text-left w-full">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-muted-foreground font-bold tracking-wider">
              {product.categoryLabel}
            </span>
            <div className="flex items-center text-amber-500 gap-1 text-xs font-mono font-bold">
              <Star className="h-3 w-3 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors font-heading">
            {product.name}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-foreground/15">
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-lg font-black text-foreground">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleWishlistClick}
                className="h-8 w-8 p-0"
              >
                <Heart
                  className={`h-3.5 w-3.5 ${
                    isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-foreground'
                  }`}
                />
              </Button>

              <Button
                variant={isAddedRecently ? 'outline' : 'default'}
                size="sm"
                onClick={handleQuickAdd}
                className="h-8 px-3 text-[11px] font-bold"
              >
                {isAddedRecently ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span>ADDED</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3 w-3" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={handleOpenQuickView}
      className="retro-card flex flex-col justify-between cursor-pointer bg-card group overflow-hidden text-left"
    >
      {/* Product Image */}
      <div
        className="relative h-64 sm:h-72 w-full overflow-hidden bg-secondary border-b-[1.5px] border-foreground"
        onMouseEnter={() => {
          if (product.images.length > 1) setCurrentImageIndex(1)
        }}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <Badge variant="retro">{product.badge}</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <button
            onClick={handleWishlistClick}
            className="h-7 w-7 bg-background border border-foreground flex items-center justify-center text-foreground hover:bg-amber-400 hover:text-black transition-colors cursor-pointer shadow-[1.5px_1.5px_0px_0px_hsl(var(--foreground))]"
            aria-label="Save to Wishlist"
          >
            <Heart
              className={`h-3.5 w-3.5 ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-foreground'
              }`}
            />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="glass"
            size="sm"
            onClick={handleOpenQuickView}
            className="flex-1 text-[11px] font-bold h-8 bg-background/95"
          >
            <Eye className="h-3 w-3 mr-1" />
            QUICK LOOK
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={handleQuickAdd}
            className="h-8 px-2.5 text-[11px] font-bold"
          >
            {isAddedRecently ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <ShoppingBag className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground uppercase font-bold tracking-wider mb-1">
            <span>{product.categoryLabel}</span>
            <div className="flex items-center text-amber-500 gap-1">
              <Star className="h-3 w-3 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors font-heading leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-1 font-mono mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Colors & Sizes preview */}
        <div className="flex items-center justify-between pt-1">
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedColor(c.name)
                  }}
                  className={`h-3.5 w-3.5 rounded-full border border-foreground/60 transition-all cursor-pointer ${
                    selectedColor === c.name
                      ? 'ring-1.5 ring-foreground ring-offset-1 ring-offset-background scale-110'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          )}

          {product.sizes && (
            <span className="text-[10px] font-mono text-muted-foreground">
              {product.sizes.length} sizes
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="pt-2 border-t-[1.5px] border-foreground/20 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-base font-black text-foreground">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <Button
            variant={isAddedRecently ? 'outline' : 'default'}
            size="sm"
            onClick={handleQuickAdd}
            className="h-7 px-2.5 text-[10px] font-bold sm:hidden"
          >
            {isAddedRecently ? 'ADDED' : 'ADD'}
          </Button>
        </div>
      </div>
    </div>
  )
}
