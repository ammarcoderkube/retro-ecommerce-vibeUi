import { useState, useMemo, useRef } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { CartProvider } from '@/context/CartContext'
import { PRODUCTS } from '@/data/products'
import { AnnouncementBar } from '@/components/ecommerce/AnnouncementBar'
import { Navbar } from '@/components/ecommerce/Navbar'
import { HeroSection } from '@/components/ecommerce/HeroSection'
import { PromoBanners } from '@/components/ecommerce/PromoBanners'
import { CategoryGrid } from '@/components/ecommerce/CategoryGrid'
import { FilterSidebar } from '@/components/ecommerce/FilterSidebar'
import { ProductGrid } from '@/components/ecommerce/ProductGrid'
import { ProductQuickViewModal } from '@/components/ecommerce/ProductQuickViewModal'
import { CartDrawer } from '@/components/ecommerce/CartDrawer'
import { WishlistDrawer } from '@/components/ecommerce/WishlistDrawer'
import { CheckoutModal } from '@/components/ecommerce/CheckoutModal'
import { ReviewsSection } from '@/components/ecommerce/ReviewsSection'
import { Footer } from '@/components/ecommerce/Footer'
import { ToastContainer } from '@/components/ecommerce/ToastContainer'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { SlidersHorizontal } from 'lucide-react'

function StoreApp() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([30, 300])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const catalogRef = useRef<HTMLDivElement>(null)

  const handleShopNowScroll = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setPriceRange([30, 300])
    setInStockOnly(false)
    setSortBy('featured')
  }

  // Filtered & Sorted Products calculation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS]

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      )
    }

    // Price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // In Stock Only
    if (inStockOnly) {
      result = result.filter((p) => p.inStock && p.stockCount > 0)
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'newest') {
      result.sort((_a, b) => (b.badge === 'NEW' ? 1 : -1))
    }

    return result
  }, [searchTerm, selectedCategory, priceRange, inStockOnly, sortBy])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Top Ticker */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <Navbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat)
          handleShopNowScroll()
        }}
        onToggleMobileFilters={() => setIsMobileFiltersOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 space-y-2">
        {/* Hero Section */}
        <HeroSection onShopNow={handleShopNowScroll} />

        {/* Promo Banner */}
        <PromoBanners />

        {/* Curated Categories */}
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat)
            handleShopNowScroll()
          }}
        />

        {/* Product Catalog Matrix */}
        <section
          ref={catalogRef}
          className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t-[1.5px] border-foreground/30 scroll-mt-24"
        >
          <div className="mb-6 pb-2 border-b-[1.5px] border-foreground/20 text-left">
            <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">
              ✦ CATALOGUE &amp; ARCHIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-foreground uppercase">
              {selectedCategory === 'all'
                ? 'ALL FOOTWEAR & APPAREL'
                : selectedCategory.toUpperCase().replace('-', ' ') + ' COLLECTION'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block lg:col-span-3 sticky top-28">
              <div className="retro-card-flat p-5 bg-card text-left">
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  inStockOnly={inStockOnly}
                  onInStockChange={setInStockOnly}
                  onResetFilters={handleResetFilters}
                  totalFilteredCount={filteredProducts.length}
                />
              </div>
            </div>

            {/* Main Product Grid */}
            <div className="lg:col-span-9">
              <ProductGrid
                products={filteredProducts}
                searchTerm={searchTerm}
                onClearSearch={() => setSearchTerm('')}
                selectedCategory={selectedCategory}
                onClearCategory={() => setSelectedCategory('all')}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onToggleMobileFilters={() => setIsMobileFiltersOpen(true)}
                totalCount={filteredProducts.length}
              />
            </div>
          </div>
        </section>

        {/* Customer Reviews & Feedback */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductQuickViewModal />
      <CheckoutModal />
      <ToastContainer />

      {/* Mobile Filters Drawer */}
      <Drawer
        open={isMobileFiltersOpen}
        onOpenChange={setIsMobileFiltersOpen}
      >
        <DrawerContent
          side="left"
          style={{ backgroundColor: 'var(--card-color)' }}
          className="p-5 max-w-xs w-full border-r-[2px] border-foreground rounded-none bg-card text-foreground"
        >
          <DrawerHeader className="p-0 pb-3 text-left border-b-[1.5px] border-foreground">
            <DrawerTitle className="text-base font-mono font-bold uppercase flex items-center gap-2 text-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter Items</span>
            </DrawerTitle>
          </DrawerHeader>

          <div className="py-3 overflow-y-auto max-h-[calc(100vh-120px)] bg-card text-foreground">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat)
                setIsMobileFiltersOpen(false)
              }}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              onResetFilters={handleResetFilters}
              totalFilteredCount={filteredProducts.length}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <StoreApp />
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
