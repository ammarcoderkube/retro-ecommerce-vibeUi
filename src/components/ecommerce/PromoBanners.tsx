import { Copy, Check, Tag } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'

export function PromoBanners() {
  const { applyPromo } = useCart()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleApplyOrCopy = (code: string) => {
    applyPromo(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2500)
  }

  return (
    <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="retro-card p-5 sm:p-6 bg-amber-400 text-black flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 bg-black text-amber-400 flex items-center justify-center font-bold text-lg shrink-0 border border-black">
            <Tag className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest font-black text-black/80">
              LIMITED VINTAGE WELCOME OFFER
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-black">
              TAKE 20% OFF YOUR FIRST PAIR OR PIECE
            </h3>
            <p className="text-xs text-black/80 font-medium">
              Applicable across all handcrafted footwear, jackets, knits, and pants.
            </p>
          </div>
        </div>

        <Button
          variant="default"
          size="default"
          onClick={() => handleApplyOrCopy('RETRO20')}
          className="h-10 px-5 gap-2 font-mono text-xs font-black shrink-0 bg-black text-amber-400 border-black hover:bg-neutral-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          {copiedCode === 'RETRO20' ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span>APPLIED RETRO20</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>APPLY: RETRO20</span>
            </>
          )}
        </Button>
      </div>
    </section>
  )
}
