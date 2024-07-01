"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";

import Image from "next/image";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useDashboardSidebar(
    (state) => state
  );

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      <div>
        <Hint label={label} side="right" asChild>
          <Button
            onClick={collapsed ? onExpand : onCollapse}
            variant="ghost"
            className="w-fit p-2"
          >
            <Image src="/hamburger.svg" alt="" width={19.5} height={12} />
          </Button>
        </Hint>
      </div>
    </>
  );
};
