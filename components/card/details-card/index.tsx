import { DataItem } from "./data-item";
import { HeaderCard } from "../header-card";
import { cn } from "@/lib/utils";

interface DetailsCardProps {
  title: string;
  children?: React.ReactNode;
  headerItems?: React.ReactNode;
  device_id?: string;
  cbs_id? : string;
  className?: string;
  type: "cbs" | "device";
}

export const DetailsCard = ({
  title,
  className,
  type,
  device_id,
  cbs_id,
  children,
  headerItems,
}: DetailsCardProps) => {
  return (
    <HeaderCard
      headerItems={headerItems}
      title={title}
      className={cn("relative", className)}
    >
      {children}
      <DataItem type={type} columns={3} rows={3} device_id={device_id} cbs_id={cbs_id} />
    </HeaderCard>
  );
};
