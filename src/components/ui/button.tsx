import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-body",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_35px_hsl(155_50%_25%/0.5)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-accent/30 bg-transparent hover:bg-accent/10 hover:border-accent/60 text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent/10 hover:text-accent",
        link: "text-accent underline-offset-4 hover:underline",
        glow: "bg-primary text-primary-foreground hover:shadow-[0_0_50px_hsl(155_50%_25%/0.6)] hover:scale-105 active:scale-95 border border-accent/20",
        hero: "relative overflow-hidden bg-gradient-to-r from-primary via-primary-glow to-accent text-primary-foreground font-semibold hover:shadow-[0_0_60px_hsl(43_80%_55%/0.5)] hover:scale-105 active:scale-95 border border-accent/30",
        glass: "bg-card/80 backdrop-blur-xl border-2 border-accent/15 text-foreground hover:bg-card/95 hover:shadow-[0_0_40px_hsl(43_80%_55%/0.25)] hover:border-accent/30",
        luxury: "relative overflow-hidden bg-gradient-to-r from-primary to-[hsl(145_60%_30%)] text-primary-foreground font-semibold border border-accent/30 shadow-[0_4px_20px_hsl(155_50%_25%/0.3),inset_0_1px_0_hsl(43_80%_55%/0.1)] hover:shadow-[0_8px_40px_hsl(43_80%_55%/0.4)] hover:scale-105 active:scale-95",
        gold: "bg-gradient-to-r from-[hsl(43_80%_55%)] via-[hsl(45_90%_60%)] to-[hsl(38_85%_50%)] text-[hsl(150_15%_6%)] font-bold border-none shadow-[0_4px_25px_hsl(43_80%_55%/0.4),inset_0_1px_0_hsl(45_90%_70%/0.3)] hover:shadow-[0_8px_40px_hsl(43_80%_55%/0.6)] hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-4",
        lg: "h-13 rounded-xl px-10 text-base tracking-wide",
        xl: "h-16 rounded-xl px-12 text-lg tracking-wide",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };