import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Tag,
  X,
  ShieldCheck,
} from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useCart } from '@/context/CartContext'

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    total,
    freeShippingThreshold,
    freeShippingProgress,
    appliedPromo,
    promoInput,
    setPromoInput,
    applyPromo,
    removePromo,
    promoError,
    setIsCheckoutOpen,
  } = useCart()

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  const handleOpenCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
      <DrawerContent
        side="right"
        style={{ backgroundColor: 'var(--card-color)' }}
        className="max-w-md w-full flex flex-col p-0 border-l-[2px] border-foreground rounded-none bg-card text-foreground"
      >
        
        {/* Header */}
        <DrawerHeader className="px-6 py-4 border-b-[1.5px] border-foreground text-left bg-card">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-black font-heading flex items-center gap-2 uppercase tracking-wide">
              <ShoppingBag className="h-4 w-4" />
              <span>Your Shopping Bag</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-amber-400 text-black border border-foreground">
                {cart.length} ITEMS
              </span>
            </DrawerTitle>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="mt-3 space-y-1.5 bg-secondary/50 p-2.5 border border-foreground/30">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-foreground">
                <Truck className="h-3.5 w-3.5" />
                {remainingForFreeShipping === 0 ? (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ✓ You unlocked Free Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong className="font-bold">${remainingForFreeShipping.toFixed(2)}</strong> for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <Progress value={freeShippingProgress} className="h-1.5" />
          </div>
        </DrawerHeader>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="h-12 w-12 mx-auto bg-secondary border border-foreground flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold font-heading text-foreground uppercase">
                  Your bag is empty
                </h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto font-mono">
                  Explore our handcrafted footwear, jackets, knits, and pants.
                </p>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsCartOpen(false)}
                className="font-bold text-xs"
              >
                BROWSE COLLECTION
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex items-start gap-3.5 p-3 bg-card border-[1.5px] border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]"
              >
                {/* Thumbnail */}
                <div className="relative h-20 w-20 bg-secondary shrink-0 overflow-hidden border border-foreground/30">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-foreground font-heading line-clamp-1">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-rose-600 transition-colors p-0.5"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                    {item.selectedColor && (
                      <span>Color: {item.selectedColor}</span>
                    )}
                    {item.selectedSize && (
                      <span>• Size: {item.selectedSize}</span>
                    )}
                  </div>

                  {/* Stepper & Price */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-foreground bg-background">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="h-6 w-6 flex items-center justify-center hover:bg-muted cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center font-mono text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="h-6 w-6 flex items-center justify-center hover:bg-muted cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="font-mono text-xs font-black text-foreground">
                      ${item.product.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Order Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t-[1.5px] border-foreground bg-card space-y-3.5">
            
            {/* Promo Code Input */}
            <div className="space-y-1">
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2 bg-amber-400 text-black border border-foreground text-xs font-mono font-bold">
                  <div className="flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5" />
                    <span>
                      CODE &quot;{appliedPromo.code}&quot; APPLIED ({appliedPromo.description})
                    </span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="hover:opacity-75 cursor-pointer p-0.5"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="PROMO CODE (e.g. RETRO20)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="h-8 text-xs font-mono uppercase bg-background"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPromo(promoInput)}
                    className="h-8 px-3 text-xs font-bold shrink-0"
                  >
                    APPLY
                  </Button>
                </div>
              )}
              {promoError && (
                <p className="text-[11px] font-mono text-rose-600 dark:text-rose-400">{promoError}</p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1 text-xs text-muted-foreground font-mono">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-foreground font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-600 dark:text-emerald-400">FREE</strong>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm font-black text-foreground pt-1.5 border-t border-foreground/20">
                <span>Total</span>
                <span>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Button
              variant="default"
              size="lg"
              onClick={handleOpenCheckout}
              className="w-full h-11 font-black gap-2 text-xs"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground font-mono">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Encrypted Checkout &bull; 30-Day Guarantee</span>
            </div>

          </div>
        )}

      </DrawerContent>
    </Drawer>
  )
}
