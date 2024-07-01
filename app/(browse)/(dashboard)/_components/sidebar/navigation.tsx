"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "./nav-item";
import { Skeleton } from "@/components/ui/skeleton";

import Cbs from "./assets/cbs-master.svg";
import Client from "./assets/client-master.svg";
import Dashboard from "./assets/dashboard.svg";

export const routes = {
  user: [
    {
      label: "Settings",
      href: `/user/dashboard`,
      icon: Dashboard,
    },
  ],
  sidebar: [
    {
      label: "Dashboard",
      href: `/dashboard`,
      icon: Dashboard,
    },
    {
      label: "CBBS Master",
      href: `/cbbs-master`,
      icon: Cbs,
    },
    {
      label: "Device Master",
      href: `/device-master`,
      icon: Client,
    },
  ],
};

export const Navigation = () => {
  const pathname = usePathname();
  const user = { username: "" };

  // if (!user?.username) {
  //   return (
  //     <ul className="space-y-2">
  //       {[...Array(3)].map((_, i) => (
  //         <NavItemSkeleton key={i} />
  //       ))}
  //     </ul>
  //   );
  // }

  return (
    <ul className="space-y-2 pt-4 pl-2 lg:pl-4">
      {routes.sidebar.map((route) => (
        <div key={route.href}>
          <NavItem
            key={route.href}
            label={route.label}
            icon={route.icon}
            href={route.href}
            isActive={pathname === route.href}
          />
        </div>
      ))}
    </ul>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
