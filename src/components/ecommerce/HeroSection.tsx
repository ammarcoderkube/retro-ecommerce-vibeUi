import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/context/CartContext'
import { PRODUCTS } from '@/data/products'

interface HeroSectionProps {
  onShopNow: () => void
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  const { setQuickViewProduct } = useCart()
  const heroFeaturedProduct = PRODUCTS[0] // Heritage Court 77

  return (
    <section className="relative overflow-hidden py-10 md:py-16 border-b-[1.5px] border-foreground bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Minimalist Typography & Philosophy */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2">
              <Badge variant="retro" className="text-xs px-2.5 py-0.5">
                ✦ AUTUMN / WINTER 2026
              </Badge>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                PORTUGAL & JAPAN EDITION
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-foreground font-heading uppercase">
              TIMELESS FOOTWEAR <br />
              <span className="text-primary font-serif italic font-normal tracking-normal lowercase">
                &amp; everyday
              </span>{' '}
              CLOTHING.
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
              Crafted with split Italian suede, 500 GSM loopback organic cotton, and Japanese selvedge denim. Built with honest materials designed to get better with every year of wear.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onShopNow}
                className="gap-2 text-xs"
              >
                <span>SHOP NEW DROPS</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setQuickViewProduct(heroFeaturedProduct)}
                className="text-xs"
              >
                <span>VIEW COURT 77 HIGH-TOP</span>
              </Button>
            </div>

            {/* Minimalist Stat Line */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t-[1.5px] border-foreground/20 max-w-md font-mono text-xs">
              <div>
                <div className="text-lg font-black text-foreground">100%</div>
                <div className="text-muted-foreground text-[11px]">Organic & Natural</div>
              </div>
              <div>
                <div className="text-lg font-black text-foreground">PORTO</div>
                <div className="text-muted-foreground text-[11px]">Handmade Origin</div>
              </div>
              <div>
                <div className="text-lg font-black text-foreground">30-DAY</div>
                <div className="text-muted-foreground text-[11px]">Easy Returns</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Product Image */}
          <div className="lg:col-span-5">
            <div
              onClick={() => setQuickViewProduct(heroFeaturedProduct)}
              className="retro-card p-4 sm:p-5 bg-card group cursor-pointer text-left"
            >
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-secondary border border-foreground/30">
                <img
                  src={heroFeaturedProduct.images[0]}
                  alt={heroFeaturedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="retro">SPOTLIGHT</Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-background/90 px-2.5 py-1 text-xs font-mono font-bold border border-foreground">
                  ${heroFeaturedProduct.price}
                </div>
              </div>

              <div className="mt-3.5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors font-heading">
                    {heroFeaturedProduct.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 font-mono">
                    {heroFeaturedProduct.subtitle}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setQuickViewProduct(heroFeaturedProduct)
                  }}
                  className="shrink-0 h-8 text-[11px]"
                >
                  DETAILS
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
