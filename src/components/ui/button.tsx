import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background border-[1.5px] border-foreground shadow-[2.5px_2.5px_0px_0px_hsl(var(--primary))] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3.5px_3.5px_0px_0px_hsl(var(--primary))] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_hsl(var(--primary))] rounded-[2px]",
        primary:
          "bg-primary text-primary-foreground border-[1.5px] border-foreground shadow-[2.5px_2.5px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1px_1px_0px_0px_hsl(var(--foreground))] rounded-[2px]",
        retro:
          "bg-amber-400 text-black border-[1.5px] border-foreground shadow-[2.5px_2.5px_0px_0px_hsl(var(--foreground))] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_hsl(var(--foreground))] active:translate-x-[1.5px] active:translate-y-[1.5px] rounded-[2px]",
        glow:
          "bg-foreground text-background border-[1.5px] border-foreground shadow-[2.5px_2.5px_0px_0px_hsl(var(--primary))] hover:translate-x-[-1px] hover:translate-y-[-1px] rounded-[2px]",
        glass:
          "bg-card/90 text-foreground border-[1.5px] border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:bg-muted/80 rounded-[2px]",
        secondary:
          "bg-secondary text-secondary-foreground border-[1.5px] border-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:bg-muted rounded-[2px]",
        outline:
          "border-[1.5px] border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background shadow-[2px_2px_0px_0px_hsl(var(--foreground))] rounded-[2px]",
        ghost:
          "hover:bg-muted text-foreground hover:text-foreground rounded-[2px]",
        destructive:
          "bg-rose-600 text-white border-[1.5px] border-foreground shadow-[2.5px_2.5px_0px_0px_hsl(var(--foreground))] hover:bg-rose-500 rounded-[2px]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3.5 text-[11px]",
        lg: "h-12 px-7 text-sm font-extrabold",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-7.5 w-7.5 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
