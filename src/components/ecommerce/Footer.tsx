import { useState } from 'react'
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Share2,
  MessageSquare,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/CartContext'

export function Footer() {
  const { addToast } = useCart()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubscribed(true)
    addToast('Subscribed!', 'Use code RETRO20 at checkout for 20% off.', 'success')
  }

  return (
    <footer className="bg-card border-t-[1.5px] border-foreground text-foreground pt-12 pb-10 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Newsletter Box */}
        <div className="retro-card p-6 sm:p-8 bg-card text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              ✦ NEWSLETTER &amp; DISPATCHES
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-foreground uppercase">
              SUBSCRIBE FOR SEASONAL DROPS
            </h3>
            <p className="text-xs text-muted-foreground font-sans">
              Get notified when limited Portuguese footwear batches and Japanese selvedge denim restock.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {isSubscribed ? (
              <div className="flex items-center gap-2 p-3 bg-amber-400 text-black border border-foreground text-xs font-bold">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Subscribed! Use code &quot;RETRO20&quot; for 20% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <Input
                  type="email"
                  required
                  placeholder="Your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="h-4 w-4" />}
                  className="h-10 text-xs bg-background"
                />
                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  className="h-10 px-5 font-black text-xs shrink-0"
                >
                  <span>JOIN</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
          
          {/* Brand Info */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black font-heading tracking-tight">
                RETRO<span className="text-primary font-normal">VIBE</span>
              </span>
              <span className="text-[9px] font-bold px-1 bg-amber-400 text-black border border-foreground">
                EST. 1977
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed font-sans">
              Handcrafted footwear, heavy loopback knits, and honest workwear essentials. Built with code ownership & modern web primitives.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a href="#" className="p-1.5 border border-foreground bg-card hover:bg-amber-400 hover:text-black transition-colors" aria-label="Explore">
                <Compass className="h-3.5 w-3.5" />
              </a>
              <a href="#" className="p-1.5 border border-foreground bg-card hover:bg-amber-400 hover:text-black transition-colors" aria-label="Community">
                <MessageSquare className="h-3.5 w-3.5" />
              </a>
              <a href="#" className="p-1.5 border border-foreground bg-card hover:bg-amber-400 hover:text-black transition-colors" aria-label="Share">
                <Share2 className="h-3.5 w-3.5" />
              </a>
              <a href="#" className="p-1.5 border border-foreground bg-card hover:bg-amber-400 hover:text-black transition-colors" aria-label="Global">
                <Globe className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Department */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-foreground text-xs">
              Departments
            </h4>
            <ul className="space-y-1.5 text-muted-foreground text-xs">
              <li><a href="#" className="hover:text-foreground transition-colors">Shoes & Sneakers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Jackets & Chore Coats</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">500 GSM Hoodies</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Japanese Selvedge Denim</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">280 GSM Boxy Tees</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-foreground text-xs">
              Customer Care
            </h4>
            <ul className="space-y-1.5 text-muted-foreground text-xs">
              <li><a href="#" className="hover:text-foreground transition-colors">Size Guide & Fit Advice</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">30-Day Free Exchanges</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Global Express Shipping</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Shoe Leather Care Guide</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Order Tracking Portal</a></li>
            </ul>
          </div>

          {/* Sustainability */}
          <div className="space-y-2.5">
            <h4 className="font-bold uppercase tracking-wider text-foreground text-xs">
              Craft & Origin
            </h4>
            <ul className="space-y-1.5 text-muted-foreground text-xs">
              <li><a href="#" className="hover:text-foreground transition-colors">Porto Footwear Atelier</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Kuroki Mills Japan</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Organic GOTS Cotton</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Plastic-Free Packaging</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t-[1.5px] border-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-foreground" />
            <span>&copy; 2026 RETRO VIBE CO. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-3">
            <span>APPLE PAY</span>
            <span>&bull;</span>
            <span>VISA</span>
            <span>&bull;</span>
            <span>MASTERCARD</span>
            <span>&bull;</span>
            <span>AMEX</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
