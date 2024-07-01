import { Card, CardTitle } from "@/components/ui/card";
import { Device } from "./device";
import { ZoneDiscoverToggle } from "./zone-discover-toggle";

export type Zone = {
  zone_no: number;
  devices: Device[];
  zone_status: boolean;
};

interface ZoneCardProps {
  cbs_id: string;
  zone: Zone;
}

export const ZoneCard = ({ zone, cbs_id }: ZoneCardProps) => {
  return (
    <Card className="flex flex-col w-full">
      <div className="flex justify-between items-center">
        <CardTitle>Zone {zone?.zone_no}</CardTitle>
        <ZoneDiscoverToggle cbs_id={cbs_id} zone={zone} />
      </div>
      <div className="flex gap-10 overflow-x-auto w-full">
        {zone.devices.map((device, index) => (
          <Device data={device} key={index} />
        ))}
      </div>
    </Card>
  );
};
