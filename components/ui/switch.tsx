import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define variants for Switch component
const switchVariants = cva(
  "peer inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      variant: {
        default:
          "data-[state=unchecked]:bg-input data-[state=checked]:bg-primary",
        red: "data-[state=unchecked]:bg-input data-[state=checked]:bg-[#FF3131]",
        green:
          "data-[state=unchecked]:bg-input data-[state=checked]:bg-[#58B761]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <SwitchPrimitives.Root
        className={cn(switchVariants({ variant, className }))}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb className="pointer-events-none block size-3 rounded-full data-[state=unchecked]:bg-[#22222280] data-[state=checked]:bg-[#fff] shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0" />
      </SwitchPrimitives.Root>
    );
  }
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, switchVariants };
