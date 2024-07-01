interface DevicesStateProps {
  type: "maintain" | "nonMaintain" | "inactive";
  value: number;
}

export const DeviceState = ({ type, value }: DevicesStateProps) => {
  const types = [
    { type: "maintain", label: "Maintain", color: "#20DF7F" },
    { type: "nonMaintain", label: "Non-Maintain", color: "#0357A6" },
    { type: "inactive", label: "Inactive", color: "#ED553B" },
  ];

  const item = types.find((item) => item.type === type);

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-[3px] h-[14px]"
          style={{ backgroundColor: item?.color }}
        />
        <span className="text-xs text-[#9E9E9E] font-medium">
          {item?.label}
        </span>
      </div>
      <span style={{ color: item?.color }}>{value}</span>
    </div>
  );
};
