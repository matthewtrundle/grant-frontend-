import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-10 w-full rounded-md px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "border border-input bg-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-2",
        dark: "border border-dark-700 bg-dark-900/50 text-dark-100 placeholder:text-dark-500 focus-visible:border-purple-600 focus-visible:ring-purple-600/50 focus-visible:ring-offset-0 focus-visible:bg-dark-800/70 hover:border-dark-600",
        "dark-glow": "border border-dark-700 bg-dark-900/50 text-dark-100 placeholder:text-dark-500 focus-visible:border-purple-600 focus-visible:ring-purple-600/50 focus-visible:ring-offset-0 focus-visible:shadow-glow-sm focus-visible:bg-dark-800/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
