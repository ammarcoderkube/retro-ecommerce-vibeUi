import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border-[1px] border-foreground rounded-[2px] transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-foreground shadow-[1.5px_1.5px_0px_0px_hsl(var(--foreground))]",
        retro:
          "bg-amber-400 text-black shadow-[1.5px_1.5px_0px_0px_hsl(var(--foreground))]",
        secondary:
          "bg-card text-muted-foreground shadow-[1px_1px_0px_0px_hsl(var(--foreground))]",
        destructive:
          "bg-rose-500 text-white shadow-[1.5px_1.5px_0px_0px_hsl(var(--foreground))]",
        outline:
          "text-foreground bg-transparent",
        warning:
          "bg-orange-400 text-black shadow-[1.5px_1.5px_0px_0px_hsl(var(--foreground))]",
        glow:
          "bg-amber-300 text-black shadow-[1.5px_1.5px_0px_0px_hsl(var(--foreground))]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
