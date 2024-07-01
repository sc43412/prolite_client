import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

import Cbs from "./../../app/(browse)/(dashboard)/dashboard/assets/cbs.svg";
import Zones from "./../../app/(browse)/(dashboard)/dashboard/assets/zones.svg";
import Devices from "./../../app/(browse)/(dashboard)/dashboard/assets/devices.svg";
import { Skeleton } from "../ui/skeleton";

type MetricType = "cbs" | "zones" | "devices";

type MetricCardProps = {
  type: MetricType;
  value: number;
};

const metricCardConfig: Record<
  MetricType,
  {
    label: string;
    border: string;
    cardBg: string;
    iconBg: string;
    icon: any;
  }
> = {
  cbs: {
    label: "Total CBBS",
    border: "#8B6400",
    cardBg: "#FFB80033",
    iconBg: "#FFB800",
    icon: Cbs,
  },
  zones: {
    label: "Total Zones",
    border: "#004585",
    cardBg: "#B2DAFF",
    iconBg: "#66B6FF",
    icon: Zones,
  },
  devices: {
    label: "Total Devices",
    border: "#DCFCE7",
    cardBg: "#DCFCE7",
    iconBg: "#20DF7F80",
    icon: Devices,
  },
};

export function MetricCard({ type, value }: MetricCardProps) {
  const config = metricCardConfig[type];

  return (
    <Card
      className={cn(
        "min-w-[187px] w-full md:w-1/3 h-[131px] flex flex-col items-start justify-between shrink"
      )}
      style={{
        borderColor: config.border,
        backgroundColor: config.cardBg,
      }}
    >
      <div
        className="rounded-full p-2 flex justify-center items-center"
        style={{ backgroundColor: config.iconBg }}
      >
        <Image src={config.icon} alt={config.label} className="size-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl text-[#0E0E0E] font-medium">{value}</span>
        <span className="text-[#575757] text-xs leading-[12.5px]">
          {config.label}
        </span>
      </div>
    </Card>
  );
}

export const MetricCardSkeleton = () => {
  return (
    <Skeleton
      className={cn(
        "min-w-[187px] w-full md:w-1/3 h-[131px] flex flex-col items-start justify-between shrink"
      )}
    />
  );
};
