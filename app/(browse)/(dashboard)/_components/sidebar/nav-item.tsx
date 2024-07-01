"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface NavItemProps {
  icon: StaticImageData;
  label: string;
  href: string;
  isActive: boolean;
}

export const NavItem = ({ href, icon, isActive, label }: NavItemProps) => {
  const { collapsed } = useDashboardSidebar((state) => state);
  return (
    <Hint label={label} side="right" asChild mobileOnly>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "w-full h-12 !rounded-l-full hover:bg-[#20DF7F1A]/30",
          collapsed ? "justify-center" : "justify-start",
          isActive && "bg-[#20DF7F1A]  lg:border-r-2 border-secondary"
        )}
      >
        <Link href={href}>
          <div className="flex items-center gap-x-4">
            <Image src={icon} alt={label} className="size-[18px]" />
            <span className="lg:block hidden">{label}</span>
          </div>
        </Link>
      </Button>
    </Hint>
  );
};
