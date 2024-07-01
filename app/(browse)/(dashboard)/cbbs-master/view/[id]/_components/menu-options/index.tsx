import { Dropdown } from "@/components/dropdown";
import { Refresh } from "./refresh";
import { BackupTimingForm } from "./backup-timing-form";
import { Button } from "@/components/ui/button";
import { AutoTest } from "./auto-test";

interface MenuOptionsProps {
  cbs_id: string;
}

export const MenuOptions = ({ cbs_id }: MenuOptionsProps) => {
  return (
    <div>
      <div className="hidden lg:flex gap-[10px] items-center">
        <BackupTimingForm cbs_id={cbs_id} />
        <AutoTest />
        <Refresh />
      </div>
      <div className="lg:hidden">
        <Dropdown>
          <BackupTimingForm cbs_id={cbs_id} />
          <AutoTest />
          <Refresh />
        </Dropdown>
      </div>
    </div>
  );
};
