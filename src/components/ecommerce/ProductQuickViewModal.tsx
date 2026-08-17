import { useState, useEffect } from 'react'
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Check,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useCart } from '@/context/CartContext'

export function ProductQuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
  } = useCart()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0)
      setSelectedColor(quickViewProduct.colors[0]?.name || '')
      setSelectedSize(quickViewProduct.sizes ? quickViewProduct.sizes[0] : '')
      setQuantity(1)
      setIsAdded(false)
    }
  }, [quickViewProduct])

  if (!quickViewProduct) return null

  const isWishlisted = isInWishlist(quickViewProduct.id)

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize)
    setQuickViewProduct(null)
    setIsCheckoutOpen(true)
  }

  return (
    <Dialog
      open={!!quickViewProduct}
      onOpenChange={(open) => !open && setQuickViewProduct(null)}
    >
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card text-foreground border-[2px] border-foreground rounded-[2px] shadow-[6px_6px_0px_0px_hsl(var(--foreground))]">
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto bg-card text-foreground">
          
          {/* Left Column: Product Images */}
          <div className="md:col-span-6 p-6 bg-secondary text-foreground flex flex-col justify-between space-y-4 border-b md:border-b-0 md:border-r-[2px] border-foreground">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-card border-[1.5px] border-foreground shadow-[2px_2px_0px_0px_var(--border-color)]">
              <img
                src={
                  quickViewProduct.images[selectedImageIndex] ||
                  quickViewProduct.images[0]
                }
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              {quickViewProduct.badge && (
                <div className="absolute top-3 left-3">
                  <Badge variant="retro">
                    {quickViewProduct.badge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden border-[1.5px] cursor-pointer transition-all ${
                      selectedImageIndex === idx
                        ? 'border-foreground ring-2 ring-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] scale-105'
                        : 'border-foreground/40 opacity-70 hover:opacity-100 bg-card'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees (Solid Box) */}
            <div className="grid grid-cols-2 gap-2.5 text-center pt-1 font-mono text-xs text-foreground">
              <div className="p-2.5 border-[1.5px] border-foreground bg-card flex items-center justify-center gap-1.5 shadow-[1.5px_1.5px_0px_0px_hsl(var(--foreground))]">
                <Truck className="h-4 w-4 text-foreground" />
                <span className="font-bold">Express 2-3 Days</span>
              </div>
              <div className="p-2.5 border-[1.5px] border-foreground bg-card flex items-center justify-center gap-1.5 shadow-[1.5px_1.5px_0px_0px_hsl(var(--foreground))]">
                <RotateCcw className="h-4 w-4 text-foreground" />
                <span className="font-bold">30-Day Free Return</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Configuration (100% Solid Card Background) */}
          <div className="md:col-span-6 p-6 sm:p-7 space-y-4 text-left bg-card text-foreground">
            <DialogHeader className="p-0 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary font-black uppercase tracking-widest">
                  {quickViewProduct.categoryLabel}
                </span>
                <div className="flex items-center text-amber-500 gap-1 text-xs font-mono font-bold">
                  <Star className="h-3.5 w-3.5 fill-amber-500" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-muted-foreground font-normal">
                    ({quickViewProduct.reviewsCount})
                  </span>
                </div>
              </div>

              <DialogTitle className="text-2xl sm:text-3xl font-black font-heading text-foreground mt-1">
                {quickViewProduct.name}
              </DialogTitle>

              <p className="text-xs text-muted-foreground font-mono">
                {quickViewProduct.subtitle}
              </p>
            </DialogHeader>

            {/* Price Line */}
            <div className="flex items-baseline gap-2.5 font-mono pb-3 border-b-[1.5px] border-foreground/30">
              <span className="text-3xl font-black text-foreground">
                ${quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${quickViewProduct.originalPrice}
                </span>
              )}
              {quickViewProduct.originalPrice && (
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-500 text-white border border-foreground ml-2">
                  SAVE ${quickViewProduct.originalPrice - quickViewProduct.price}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-sans">
              {quickViewProduct.description}
            </p>

            {/* Color Selection */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold uppercase text-foreground">Color Option:</span>
                  <span className="text-foreground font-bold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`h-7 w-7 rounded-full border-[1.5px] border-foreground transition-all flex items-center justify-center cursor-pointer ${
                        selectedColor === c.name
                          ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110 shadow-sm'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className="h-3.5 w-3.5 text-white drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Selection */}
            {quickViewProduct.sizes && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold uppercase text-foreground">Select Size:</span>
                  <span className="text-foreground font-bold">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold border-[1.5px] transition-all cursor-pointer rounded-[2px] ${
                        selectedSize === s
                          ? 'bg-foreground text-background border-foreground shadow-[2.5px_2.5px_0px_0px_hsl(var(--primary))]'
                          : 'bg-card text-foreground border-foreground/40 hover:border-foreground hover:bg-secondary'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-2.5 pt-3">
              <div className="flex items-center gap-2.5">
                {/* Stepper (Solid Opaque) */}
                <div className="flex items-center border-[1.5px] border-foreground bg-secondary p-0.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-9 w-9 flex items-center justify-center text-foreground hover:bg-card cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center font-mono text-xs font-black text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-9 w-9 flex items-center justify-center text-foreground hover:bg-card cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Add to Bag */}
                <Button
                  variant={isAdded ? 'outline' : 'default'}
                  size="default"
                  onClick={handleAddToCart}
                  className="flex-1 h-11 font-black text-xs"
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>ADDED TO BAG!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>ADD TO BAG</span>
                    </>
                  )}
                </Button>

                {/* Wishlist */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className="h-11 w-11 shrink-0"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-foreground'
                    }`}
                  />
                </Button>
              </div>

              {/* Instant Buy Now */}
              <Button
                variant="primary"
                size="default"
                onClick={handleBuyNow}
                className="w-full h-11 font-black text-xs"
              >
                <span>INSTANT CHECKOUT</span>
              </Button>
            </div>

            {/* Accordion Specs */}
            <div className="pt-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="features" className="border-b-[1.5px] border-foreground/30">
                  <AccordionTrigger className="text-xs font-mono font-bold uppercase py-2.5 text-foreground hover:text-primary">
                    Materials &amp; Craftsmanship
                  </AccordionTrigger>
                  <AccordionContent className="bg-secondary p-3 border-[1.5px] border-foreground/30 mb-2">
                    <ul className="space-y-1.5 list-disc list-inside text-xs text-foreground font-mono">
                      {quickViewProduct.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="specs" className="border-b-[1.5px] border-foreground/30">
                  <AccordionTrigger className="text-xs font-mono font-bold uppercase py-2.5 text-foreground hover:text-primary">
                    Specifications &amp; Origin
                  </AccordionTrigger>
                  <AccordionContent className="bg-secondary p-3 border-[1.5px] border-foreground/30 mb-2">
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      {quickViewProduct.specs.map((s, i) => (
                        <div key={i} className="p-2 bg-card border-[1.5px] border-foreground/30">
                          <span className="text-[10px] text-muted-foreground block uppercase font-bold">
                            {s.label}
                          </span>
                          <span className="font-bold text-foreground">
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
