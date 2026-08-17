import {
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'

export function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
  } = useCart()

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1)
    })
    setIsWishlistOpen(false)
  }

  return (
    <Drawer open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
      <DrawerContent
        side="right"
        style={{ backgroundColor: 'var(--card-color)' }}
        className="max-w-md w-full flex flex-col p-0 border-l-[2px] border-foreground rounded-none bg-card text-foreground"
      >
        
        {/* Header */}
        <DrawerHeader className="px-6 py-4 border-b-[1.5px] border-foreground text-left bg-secondary">
          <DrawerTitle className="text-xl font-extrabold font-heading flex items-center gap-2">
            <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
            <span>Saved Wishlist</span>
            <span className="text-xs font-mono font-normal text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
              {wishlist.length} items
            </span>
          </DrawerTitle>
        </DrawerHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
                <Heart className="h-8 w-8 text-rose-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold font-heading text-foreground">
                  Your wishlist is empty
                </h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Click the heart icon on any drop to bookmark your favorite techwear and hardware.
                </p>
              </div>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-muted/30 border border-border/70 hover:border-border transition-colors group"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => {
                    setIsWishlistOpen(false)
                    setQuickViewProduct(product)
                  }}
                  className="relative h-20 w-20 rounded-xl overflow-hidden bg-zinc-900 shrink-0 cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      onClick={() => {
                        setIsWishlistOpen(false)
                        setQuickViewProduct(product)
                      }}
                      className="text-xs font-bold text-foreground font-heading line-clamp-1 hover:text-primary cursor-pointer"
                    >
                      {product.name}
                    </h4>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="text-muted-foreground hover:text-rose-400 transition-colors p-1"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] font-mono text-primary font-bold">
                    ${product.price}
                  </p>

                  <div className="pt-1 flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => {
                        addToCart(product, 1)
                      }}
                      className="h-8 px-3 rounded-lg text-xs font-bold gap-1.5"
                    >
                      <ShoppingBag className="h-3 w-3" />
                      <span>Move to Bag</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Actions */}
        {wishlist.length > 0 && (
          <div className="p-6 border-t border-border/80 bg-zinc-950/60 space-y-3">
            <Button
              variant="glow"
              size="lg"
              onClick={handleMoveAllToCart}
              className="w-full h-11 rounded-xl font-bold gap-2 text-sm"
            >
              <span>Add All to Cart</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

      </DrawerContent>
    </Drawer>
  )
}
