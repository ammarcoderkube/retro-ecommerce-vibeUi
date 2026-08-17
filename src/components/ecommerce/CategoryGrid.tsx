import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES } from '@/data/products'

interface CategoryGridProps {
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
}

export function CategoryGrid({ selectedCategory, onSelectCategory }: CategoryGridProps) {
  // Exclude 'all' from cards
  const categoriesToShow = CATEGORIES.filter((c) => c.id !== 'all')

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b-[1.5px] border-foreground/30 text-left">
        <div>
          <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">
            ✦ SHOP BY DEPARTMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-foreground">
            CURATED DEPARTMENTS
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1 sm:mt-0 font-mono">
          FOOTWEAR &bull; OUTERWEAR &bull; KNITS &bull; DENIM &bull; TOPS
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categoriesToShow.map((category) => {
          const isSelected = selectedCategory === category.id

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`group relative overflow-hidden text-left border-[1.5px] transition-all duration-200 cursor-pointer h-48 flex flex-col justify-between p-3 rounded-[2px] ${
                isSelected
                  ? 'border-foreground bg-amber-400 text-black shadow-[3px_3px_0px_0px_hsl(var(--foreground))] translate-x-[-1px] translate-y-[-1px]'
                  : 'border-foreground bg-card text-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-[3.5px_3.5px_0px_0px_hsl(var(--foreground))]'
              }`}
            >
              {/* Image thumbnail background with subtle overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              </div>

              {/* Icon */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-lg p-1 bg-black/60 text-white rounded-[2px] border border-white/20">
                  {category.icon}
                </span>
                <ArrowUpRight className="h-4 w-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Bottom Label */}
              <div className="relative z-10 text-left">
                <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider leading-tight">
                  {category.label}
                </h3>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
