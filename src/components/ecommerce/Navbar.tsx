import {
  ShoppingBag,
  Heart,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import { useCart } from '@/context/CartContext'

interface NavbarProps {
  onSearchChange: (search: string) => void
  searchValue: string
  selectedCategory: string
  onSelectCategory: (cat: string) => void
  onToggleMobileFilters?: () => void
}

export function Navbar({
  onSearchChange,
  searchValue,
  selectedCategory,
  onSelectCategory,
  onToggleMobileFilters,
}: NavbarProps) {
  const { totalItemCount, wishlist, setIsCartOpen, setIsWishlistOpen } = useCart()

  const navLinks = [
    { id: 'all', label: 'All Items' },
    { id: 'sneakers', label: 'Shoes & Sneakers' },
    { id: 'outerwear', label: 'Jackets' },
    { id: 'hoodies', label: 'Hoodies & Knits' },
    { id: 'pants', label: 'Pants & Denim' },
    { id: 'tees', label: 'Tees' },
    { id: 'accessories', label: 'Caps & Goods' },
  ]

  return (
    <header className="sticky top-0 z-30 bg-background text-foreground border-b-[1.5px] border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Minimalist Retro Brand Title */}
          <button
            onClick={() => onSelectCategory('all')}
            className="text-left group cursor-pointer flex items-center gap-2"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight font-heading text-foreground">
              RETRO<span className="text-primary font-normal">VIBE</span>
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-amber-400 text-black border border-foreground rounded-[2px] hidden sm:inline-block">
              EST. 1977
            </span>
          </button>

          {/* Search Box */}
          <div className="flex-1 max-w-sm hidden md:block">
            <Input
              type="text"
              placeholder="Search shoes, jackets, tees, hoodies..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="h-9 text-xs"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onToggleMobileFilters && (
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden h-9 px-2.5"
                onClick={onToggleMobileFilters}
                aria-label="Open filters"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
              </Button>
            )}

            <ThemeSwitcher />

            {/* Wishlist */}
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 gap-1.5"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View wishlist"
            >
              <Heart className="h-3.5 w-3.5 text-foreground" />
              <span className="hidden sm:inline">SAVED</span>
              {wishlist.length > 0 && (
                <Badge variant="retro" className="px-1 py-0 text-[9px] h-4 min-w-4 flex items-center justify-center">
                  {wishlist.length}
                </Badge>
              )}
            </Button>

            {/* Cart Drawer Trigger */}
            <Button
              variant="default"
              size="sm"
              className="h-9 px-4 gap-2 font-black"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>BAG</span>
              {totalItemCount > 0 && (
                <span className="bg-amber-400 text-black font-mono text-[10px] font-black px-1.5 py-0.2 rounded-[1px] border border-black ml-0.5">
                  {totalItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <Input
            type="text"
            placeholder="Search footwear & apparel..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="h-9 text-xs"
          />
        </div>

        {/* Category Navigation Bar */}
        <nav className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t-[1.5px] border-foreground/20 pt-2.5">
          {navLinks.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 transition-all cursor-pointer rounded-[2px] ${
                  isActive
                    ? 'bg-foreground text-background border-[1.5px] border-foreground shadow-[2px_2px_0px_0px_hsl(var(--primary))]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
