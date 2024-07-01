"use client";

import { cn } from "@/lib/utils";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useDashboardSidebar((state) => state);
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col h-full bg-background z-50 w-16 lg:w-[215px] transition-all",
        collapsed && "w-0 hidden"
      )}
    >
      {children}
    </aside>
  );
};
