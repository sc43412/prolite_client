interface BatteryStatusProps {
  state: number;
}

export const BatteryStatus = ({ state }: BatteryStatusProps) => {
  const states = [
    // { state: "resting", label: "Resting", color: "#58B761" },
    { state: 1, label: "Charging", color: "#0357A6" },
    { state: 0, label: "Discharging", color: "#ED553B" },
  ];

  let item = states.find((item) => item.state === state);

  return (
    <span className="text-xs" style={{ color: item?.color }}>
      {item?.label}
    </span>
  );
};
