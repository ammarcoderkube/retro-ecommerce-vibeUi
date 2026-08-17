import { Star, CheckCircle, ThumbsUp } from 'lucide-react'
import { REVIEWS } from '@/data/products'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function ReviewsSection() {
  return (
    <section className="py-14 border-t-[1.5px] border-foreground/30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b-[1.5px] border-foreground/30 text-left">
        <div>
          <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase">
            ✦ CUSTOMER EXPERIENCES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-foreground">
            WHAT WEARERS SAY
          </h2>
        </div>

        {/* Global Rating Score Pill */}
        <div className="flex items-center gap-2.5 mt-3 sm:mt-0 p-2.5 bg-card border-[1.5px] border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
          <div className="text-xl font-black font-heading text-foreground">4.9 / 5.0</div>
          <div className="border-l border-foreground/30 pl-2.5 space-y-0.5 font-mono text-[10px]">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-500" />
              ))}
            </div>
            <div className="text-muted-foreground">
              420+ Verified Reviews
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            className="retro-card p-4 flex flex-col justify-between space-y-3 text-left bg-card"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-8 w-8 border border-foreground">
                    <AvatarImage src={review.avatar} alt={review.author} />
                    <AvatarFallback>{review.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xs font-bold text-foreground font-heading">
                      {review.author}
                    </h4>
                    <div className="flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono">
                      <CheckCircle className="h-2.5 w-2.5" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-2.5 w-2.5 fill-amber-500" />
                  ))}
                </div>
              </div>

              <Badge variant="secondary" className="text-[9px] line-clamp-1 py-0 px-1.5 font-mono">
                {review.productName}
              </Badge>

              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-foreground font-heading">
                  &quot;{review.title}&quot;
                </h5>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {review.content}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-foreground/15 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>{review.date}</span>
              <button className="flex items-center gap-1 hover:text-foreground cursor-pointer">
                <ThumbsUp className="h-2.5 w-2.5" />
                <span>({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
