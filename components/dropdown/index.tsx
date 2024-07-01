"use client";

import * as React from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface DropdownProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

export function Dropdown({ children, trigger }: DropdownProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant="outline" className="h-5 w-fit">
            <EllipsisVertical className="size-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-auto w-[230px]">
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()} asChild>
              {child}
            </DropdownMenuItem>
            {index < childrenArray.length - 1 && (
              <DropdownMenuSeparator className="lg:hidden" />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
