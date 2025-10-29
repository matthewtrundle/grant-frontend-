import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        dark: "border-dark-700 bg-dark-900/50 text-dark-200 hover:bg-dark-800/70 hover:border-purple-600/50",
        "dark-purple": "border-purple-600/30 bg-purple-950/30 text-purple-300 hover:bg-purple-900/40 hover:border-purple-500/50",
        "dark-blue": "border-blue-600/30 bg-blue-950/30 text-blue-300 hover:bg-blue-900/40 hover:border-blue-500/50",
        success: "border-green-600/30 bg-green-950/30 text-green-300 hover:bg-green-900/40",
        warning: "border-yellow-600/30 bg-yellow-950/30 text-yellow-300 hover:bg-yellow-900/40",
        glow: "border-purple-600/50 bg-purple-950/50 text-purple-200 shadow-glow-sm hover:shadow-glow",
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
