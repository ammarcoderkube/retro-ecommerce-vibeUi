import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  pauseOnHover?: boolean
  speed?: number
  reverse?: boolean
}

export function Marquee({
  children,
  pauseOnHover = true,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] select-none",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)] animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
