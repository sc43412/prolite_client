import { Card, CardTitle } from "@/components/ui/card";
import { ZoneCard } from "./_components/zone-card";
import { DEVICE_DATA_GROUP_BY_ZONES } from "@/endpoints";
import { getRequest } from "@/lib/api";

const ClientMasterPage = async () => {
  const { devicelist } = await getRequest(DEVICE_DATA_GROUP_BY_ZONES);

  return (
    <div className="flex flex-col gap-5">
      {devicelist?.map((device: any, index: number) => (
        <Card className="p-5" key={index}>
          <CardTitle>CBS: {device.cbs_id}</CardTitle>
          {device.zones.map((zone: any, idx: number) => (
            <ZoneCard zone={zone} key={idx} cbs_id={device.cbs_id} />
          ))}
        </Card>
      ))}
    </div>
  );
};

export default ClientMasterPage;
