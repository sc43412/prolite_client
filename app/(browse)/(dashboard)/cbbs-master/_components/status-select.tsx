import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StatusSelect({
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
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Active</SelectItem>
        <SelectItem value="0">Inactive</SelectItem>
        <SelectItem value="all">All</SelectItem>
      </SelectContent>
    </Select>
  );
}
