import { RotateCcw, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { CATEGORIES, PRODUCTS } from '@/data/products'

interface FilterSidebarProps {
  selectedCategory: string
  onSelectCategory: (cat: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (val: [number, number]) => void
  inStockOnly: boolean
  onInStockChange: (val: boolean) => void
  onResetFilters: () => void
  totalFilteredCount: number
}

export function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockChange,
  onResetFilters,
  totalFilteredCount,
}: FilterSidebarProps) {
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return PRODUCTS.length
    return PRODUCTS.filter((p) => p.category === categoryId).length
  }

  return (
    <aside className="w-full space-y-6 text-foreground text-left">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b-[1.5px] border-foreground/30">
        <div>
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-foreground">
            Filters ({totalFilteredCount})
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          className="h-7 px-2 text-[10px] font-mono text-muted-foreground hover:text-foreground gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          <span>RESET</span>
        </Button>
      </div>

      {/* Category Facet */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
          Department
        </label>
        <div className="space-y-1 font-mono text-xs">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id
            const count = getCategoryCount(cat.id)

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[2px] transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-foreground text-background font-black shadow-[1.5px_1.5px_0px_0px_hsl(var(--primary))]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-4 border-t-[1.5px] border-foreground/20">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-[11px] font-bold uppercase text-muted-foreground">
            Price Range
          </span>
          <span className="font-bold text-foreground">
            ${priceRange[0]} — ${priceRange[1]}
          </span>
        </div>

        <Slider
          value={[priceRange[1]]}
          max={300}
          min={30}
          step={5}
          onValueChange={(val) => onPriceRangeChange([priceRange[0], val[0]])}
        />

        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
          <span>Min: $30</span>
          <span>Max: $300</span>
        </div>
      </div>

      {/* In-Stock Filter Switch */}
      <div className="pt-4 border-t-[1.5px] border-foreground/20 flex items-center justify-between font-mono text-xs">
        <div>
          <span className="font-bold block text-foreground uppercase text-[11px]">
            In-Stock Only
          </span>
          <span className="text-[10px] text-muted-foreground">
            Ships within 24 hours
          </span>
        </div>
        <Switch checked={inStockOnly} onCheckedChange={onInStockChange} />
      </div>

      {/* Retro Guarantees */}
      <div className="pt-4 border-t-[1.5px] border-foreground/20 space-y-2 font-mono text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <Check className="h-3.5 w-3.5 text-foreground" />
          <span>Handcrafted In Small Batches</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-3.5 w-3.5 text-foreground" />
          <span>Complimentary Size Exchanges</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-3.5 w-3.5 text-foreground" />
          <span>Ethical European & Japanese Mills</span>
        </div>
      </div>
    </aside>
  )
}
