"use client";

import revalidate from "@/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Refresh = () => {
  const [loading, setLoading] = useState(false);

  const onClick = async (e: any) => {
    e.stopPropagation();
    setLoading(true);
    revalidate("tag", "cbs-master").then(() => {
      toast.success("Data refreshed");
      setLoading(false);
    });
  };
  return (
    <Button
      onClick={(e) => onClick(e)}
      className="h-[33px] px-5 rounded-[5px] w-full"
    >
      <RefreshCcw
        className={cn("size-6", loading && "animate-spin transform rotate-180")}
      />
    </Button>
  );
};
