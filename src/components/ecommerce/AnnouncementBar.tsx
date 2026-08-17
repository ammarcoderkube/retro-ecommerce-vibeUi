import { Marquee } from '@/components/ui/marquee'

export function AnnouncementBar() {
  return (
    <div className="bg-foreground text-background text-[11px] font-mono font-bold tracking-wider py-2 border-b-[1.5px] border-foreground overflow-hidden select-none">
      <Marquee speed={25} pauseOnHover={true}>
        <div className="flex items-center gap-12 px-6">
          <span>✦ FREE EXPRESS SHIPPING OVER $150</span>
          <span>•</span>
          <span>USE CODE <strong className="underline text-amber-400">RETRO20</strong> FOR 20% OFF ALL APPAREL & SNEAKERS</span>
          <span>•</span>
          <span>HANDCRAFTED HERITAGE FOOTWEAR & HEAVYWEIGHT KNITS</span>
          <span>•</span>
          <span>30-DAY COMPLIMENTARY EXCHANGES & RETURNS</span>
          <span>•</span>
        </div>
      </Marquee>
    </div>
  )
}
