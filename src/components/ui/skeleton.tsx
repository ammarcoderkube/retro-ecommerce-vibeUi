import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted border border-foreground/20 rounded-[2px]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
