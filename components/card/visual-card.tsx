import { Card, CardTitle } from "@/components/ui/card";
import DoughnutChart, { DoughnutData } from "../visuals-charts/doughnut";
import { cn } from "@/lib/utils";
import MultiAxisLineChart, {
  MultiAxisLineData,
} from "../visuals-charts/multi-axis-line";
import { Skeleton } from "../ui/skeleton";

interface VisualCardProps {
  title?: string;
  type?: "doughnut" | "multiAxisLine";
  data?: DoughnutData | MultiAxisLineData;
  total?: boolean;
  legend?: boolean;
  device?: boolean;
  gauge?: boolean;
  singleValue?: "percentage" | "current" | "temperature" | "voltage";
  className?: string;
}

export function VisualCard({
  type = "doughnut",
  data,
  title = "Total CBS",
  total = true,
  legend = false,
  gauge = false,
  device = false,
  singleValue,
  className,
}: VisualCardProps) {
  return (
    <Card
      className={cn(
        "h-[380px]",
        type === "doughnut" && singleValue && "h-[240px]",
        type === "multiAxisLine" && "h-[280px]",
        className
      )}
    >
      <CardTitle>{title}</CardTitle>
      {type === "doughnut" && data && (
        <DoughnutChart
          data={data as DoughnutData}
          total={total}
          legend={legend}
          gauge={gauge}
          device={device}
          singleValue={singleValue}
          className={className}
        />
      )}
      {type === "multiAxisLine" && data && (
        <MultiAxisLineChart
          data={data as MultiAxisLineData}
          className={className}
        />
      )}
    </Card>
  );
}

export const VisualCardSkeleton = ({
  type,
  singleValue,
  className,
}: VisualCardProps) => {
  return (
    <Skeleton
      className={cn(
        "h-[380px]",
        type === "doughnut" && singleValue && "h-[240px]",
        type === "multiAxisLine" && "h-[280px]",
        className
      )}
    />
  );
};
