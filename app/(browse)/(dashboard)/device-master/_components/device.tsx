import { Hint } from "@/components/hint";

export type Device = {
  coil_value: number;
  device_id: string;
  is_maintain: boolean;
  slave_address: number;
};

interface DataItemProps {
  data: Device;
}

export const Device = ({ data }: DataItemProps) => {
  return (
    <div
      className="text-xs md:text-base mt-2 rounded-2xl p-5 gap-y-2 grid grid-cols-2 grid-rows-3 min-w-[300px] md:min-w-[400px] bg-[#0357A6]/10 max-h-32 mb-2"
      style={{ backgroundColor: data.coil_value ? "#0357A61A" : "#0000000D" }}
    >
      <span className="text-[#707070]">Device ID</span>
      <Hint label={data.device_id} side="top" asChild>
        <span className="font-medium text-[#222222] uppercase truncate cursor-help">
          : {data.device_id}
        </span>
      </Hint>

      <span className="text-[#707070]">Maintain</span>
      <span className="font-medium text-[#222222] capitalize">
        : {data.is_maintain ? "Yes" : "No"}
      </span>

      <span className="text-[#707070]">SlaveAddress</span>
      <span className="font-medium text-[#222222]">: {data.slave_address}</span>
    </div>
  );
};
