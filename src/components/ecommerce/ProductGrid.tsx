import { useState } from 'react'
import { LayoutGrid, List, SlidersHorizontal, X, PackageOpen } from 'lucide-react'
import type { Product } from '@/types/ecommerce'
import { ProductCard } from './ProductCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProductGridProps {
  products: Product[]
  searchTerm: string
  onClearSearch: () => void
  selectedCategory: string
  onClearCategory: () => void
  sortBy: string
  onSortChange: (value: string) => void
  onToggleMobileFilters?: () => void
  totalCount: number
  isLoading?: boolean
}

export function ProductSkeletonGrid({ layoutMode = 'grid' }: { layoutMode?: 'grid' | 'list' }) {
  return (
    <div
      className={
        layoutMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
          : 'flex flex-col gap-3.5'
      }
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="retro-card p-4 space-y-3 bg-card border-[1.5px] border-foreground text-left"
        >
          <Skeleton className="h-64 w-full" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <div className="pt-2 border-t border-foreground/20 flex justify-between items-center">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-7 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProductGrid({
  products,
  searchTerm,
  onClearSearch,
  selectedCategory,
  onClearCategory,
  sortBy,
  onSortChange,
  onToggleMobileFilters,
  isLoading = false,
}: ProductGridProps) {
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="space-y-5">
      {/* Top Filter Bar & Layout Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-card border-[1.5px] border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] text-left">
        
        {/* Left: Mobile Filters Trigger & Total Results */}
        <div className="flex items-center gap-3">
          {onToggleMobileFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleMobileFilters}
              className="lg:hidden h-8 px-2.5 text-xs font-bold gap-1.5"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>FILTERS</span>
            </Button>
          )}

          <div className="text-xs font-mono text-muted-foreground uppercase">
            Showing <strong className="text-foreground">{products.length}</strong> items
          </div>
        </div>

        {/* Right: Sort Dropdown & Layout Mode Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <div className="w-44">
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="h-8 text-xs font-mono rounded-[2px] bg-background border-[1.5px] border-foreground">
                <SelectValue placeholder="Sort items" />
              </SelectTrigger>
              <SelectContent className="border-[1.5px] border-foreground rounded-[2px]">
                <SelectItem value="featured">✦ Featured First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated (★ 5.0)</SelectItem>
                <SelectItem value="newest">New Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid vs List View toggle */}
          <div className="flex items-center bg-secondary p-0.5 border-[1.5px] border-foreground rounded-[2px]">
            <Button
              variant={layoutMode === 'grid' ? 'default' : 'ghost'}
              size="icon-sm"
              onClick={() => setLayoutMode('grid')}
              className="h-7 w-7 rounded-[1px] p-0"
              aria-label="Grid layout"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={layoutMode === 'list' ? 'default' : 'ghost'}
              size="icon-sm"
              onClick={() => setLayoutMode('list')}
              className="h-7 w-7 rounded-[1px] p-0"
              aria-label="List layout"
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filter Badges */}
      {(searchTerm || selectedCategory !== 'all') && (
        <div className="flex flex-wrap items-center gap-2 text-left">
          <span className="text-xs font-mono text-muted-foreground uppercase font-bold">
            Active:
          </span>
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-amber-400 text-black border border-foreground rounded-[2px]">
              <span>&quot;{searchTerm}&quot;</span>
              <button
                onClick={onClearSearch}
                className="hover:opacity-75 cursor-pointer ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-foreground text-background border border-foreground rounded-[2px]">
              <span className="capitalize">{selectedCategory.replace('-', ' ')}</span>
              <button
                onClick={onClearCategory}
                className="hover:opacity-75 cursor-pointer ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading ? (
        <ProductSkeletonGrid layoutMode={layoutMode} />
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="retro-card p-12 text-center bg-card space-y-4">
          <div className="h-12 w-12 mx-auto rounded-[2px] bg-secondary border border-foreground flex items-center justify-center text-foreground">
            <PackageOpen className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-heading text-foreground uppercase">
              No matching apparel or footwear found
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto font-mono">
              Try adjusting your price range, search query, or selecting another department.
            </p>
          </div>
          <div className="flex justify-center gap-2 pt-2">
            {searchTerm && (
              <Button variant="outline" size="sm" onClick={onClearSearch}>
                CLEAR SEARCH
              </Button>
            )}
            {selectedCategory !== 'all' && (
              <Button variant="default" size="sm" onClick={onClearCategory}>
                VIEW ALL ITEMS
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div
          className={
            layoutMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'flex flex-col gap-3.5'
          }
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              layoutMode={layoutMode}
            />
          ))}
        </div>
      )}
    </div>
  )
}
