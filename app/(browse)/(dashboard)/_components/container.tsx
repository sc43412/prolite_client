"use client";

import {
  BreadcrumbWithCustomSeparator,
  BreadcrumbsSkeleton,
} from "@/components/breadcrumb-custom-separator";
import { cn } from "@/lib/utils";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const pathname = usePathname();
  const { collapsed, onCollapse, onExpand } = useDashboardSidebar(
    (state) => state
  );

  const containerHeight = {
    height: `calc(100vh - 58px)`,
  };

  const matches = useMediaQuery(`(max-width:1024px)`);

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      onTouchStart={onCollapse}
      className={cn(
        "flex-1 p-3 md:p-[26px] lg:!pb-0 bg-[#F8F9FE] overflow-x-hidden",
        collapsed ? "ml-0" : "ml-16 lg:ml-[215px] "
      )}
      style={containerHeight}
    >
      <div className="p-3 md:pt-2 md:pb-6">
        <Suspense fallback={<BreadcrumbsSkeleton />}>
          <BreadcrumbWithCustomSeparator pathname={pathname} />
        </Suspense>
      </div>
      {children}
    </div>
  );
};
