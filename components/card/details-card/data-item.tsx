import { Hint } from "@/components/hint";
import { CBS_VIEW, DEVICE_VIEW } from "@/endpoints";
import { postRequest } from "@/lib/api";

interface DataItemProps {
  columns: number;
  rows: number;
  type: "cbs" | "device";
  device_id?: string;
  cbs_id?: string;
}

type DataItem = { type: string; label: string; value: string | number };

export const DataItem = async ({
  columns,
  rows,
  type,
  device_id,
  cbs_id
}: DataItemProps) => {
  const data = await (type === "cbs"
    ? postRequest(CBS_VIEW, { cbs_id: cbs_id }, { tags: ["cbs-master"] })
    : postRequest(DEVICE_VIEW, { device_id }));

  const values = {
    cbs: [
      { type: "cbs_name", label: "CBBS Name", value: data.cbs_name || "N/A" },
      { type: "_id", label: "CBBS ID", value: data._id || "N/A" },
      { type: "remark", label: "Remark", value: data.remark || "N/A" },
      {
        type: "main_supply_status",
        label: "Main Supply Status",
        value: data.mains_status !== 0 ? "On" : "Off",
      },
      {
        type: "no_of_devices",
        label: "No. of devices",
        value: data.no_of_devices || 0,
      },
      {
        type: "no_of_zones",
        label: "No. of zones",
        value: data.no_of_zones || 0,
      },
      {
        type: "client_name",
        label: "Client Name",
        value: data.client_name || "Joshi Enterprises ",
      },
      {
        type: "battery_status",
        label: "Battery Status",
        value: data.battery_status !== 0 ? "On" : "Off",
      },
      {
        type: "charging_status",
        label: "Charging Status",
        value: data.charging_status !== 0 ? "On" : "Off",
      },
    ],
    device: [
      {
        type: "deivce_id",
        label: "Device ID",
        value: data.deviceData?._id ?? "N/A",
      },
      {
        type: "slave_address",
        label: "Slave ID",
        value: data.deviceData?.slave_address ?? "N/A",
      },
      {
        type: "remark",
        label: "Remark",
        value: data.deviceData?.remark ?? "N/A",
      },
      {
        type: "cbbs_name",
        label: "CBBS Name",
        value: data.deviceData?.cbs_name ?? "N/A",
      },

      {
        type: "no_of_zones",
        label: "Zone No.",
        value: data.deviceData?.zone_no ?? "N/A",
      },
    ],
  };

  const value = values[type] || [];

  return (
    <div
      className="xl:grid items-center justify-items-start lg:gap-x-5 xl:gap-x-10 w-full"
      style={{
        gridTemplateColumns:
          type === "cbs"
            ? `minmax(200px, auto) repeat(${columns - 1}, 1fr)`
            : "repeat(3, minmax(0, 1fr))",
      }}
    >
      {value.map((item, index) => (
        <div
          key={index}
          className="text-xs mt-2 rounded-2xl grid grid-cols-2 overflow-hidden"
          style={{ gridTemplateColumns: "minmax(150px, auto) 1fr" }}
        >
          <span className="text-[#707070] text-nowrap">{item.label}</span>
          <Hint label={item.value.toString()} side="right" asChild>
            <span className="font-medium text-[#222222] capitalize truncate cursor-help">
              : {item.value}
            </span>
          </Hint>
        </div>
      ))}
    </div>
  );
};
