import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StatusZone({
  onChange,
}: {
  onChange: (value: string | null) => void;
}) {
  const handleStatusChange = (value: string) => {
    onChange(value === "all" ? null : value);
  };

  return (
    <Select onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[140px] h-[34px]">
        <SelectValue placeholder="Select Zone" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {Array.from({ length: 8 }, (_, index) => (
          <SelectItem key={index} value={(index + 1).toString()}>
            {(index + 1).toString()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
