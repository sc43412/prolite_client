"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  password?: boolean;
  mins?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, password, mins, disabled, ...props }, ref) => {
    const isPlaceholderShown = !props.value;
    const isSearch = type === "search";

    const [showPassword, setShowPassword] = React.useState(!password);

    return (
      <div className={cn("relative w-full", isSearch && "md:w-[223px]")}>
        <input
          type={!showPassword ? "password" : type}
          className={cn(
            "flex h-10 w-full rounded-md border bg-[#0000000D] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BEBEBE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            disabled && "cursor-not-allowed opacity-50",
            (isSearch || password) && "px-3 shrink pr-10"
          )}
          ref={ref}
          {...props}
        />
        {isPlaceholderShown && isSearch && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Search className="text-[#BEBEBE] size-4" />
          </span>
        )}
        {mins && (
          <span
            className={cn(
              "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-primary font-semibold text-[13px] disabled:cursor-not-allowed disabled:opacity-50",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            mins
          </span>
        )}
        {password && (
          <span
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {!showPassword ? (
              <Eye className="text-primary size-5" />
            ) : (
              <EyeOff className="text-primary size-5 scale-x-[-1]" />
            )}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
