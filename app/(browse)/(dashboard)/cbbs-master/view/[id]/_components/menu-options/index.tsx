import { Dropdown } from "@/components/dropdown";
import { Refresh } from "./refresh";
import { BackupTimingForm } from "./backup-timing-form";
import { Button } from "@/components/ui/button";
import { AutoTest } from "./auto-test";

interface MenuOptionsProps {
  cbs_id: string;
  backupTimer : number
}

export const MenuOptions = ({ cbs_id,backupTimer }: MenuOptionsProps) => {
  return (
    <div>
      <div className="hidden lg:flex gap-[10px] items-center">
        <BackupTimingForm cbs_id={cbs_id} backupTimer={backupTimer} />
        <AutoTest cbs_id={cbs_id} />
        <Refresh />
      </div>
      <div className="lg:hidden">
        <Dropdown>
          <BackupTimingForm cbs_id={cbs_id} backupTimer={backupTimer} />
          <AutoTest cbs_id={cbs_id} />
          <Refresh />
        </Dropdown>
      </div>
    </div>
  );
};
