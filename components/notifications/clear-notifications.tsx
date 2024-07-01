"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  clearDashboardNotifications,
  clearDeviceNotifications,
} from "@/actions/notifications";
import { NotificationsType } from ".";

interface ClearNotificationsProps {
  clear?: boolean;
  type: NotificationsType;
  device_id?: string;
}

export const ClearNotifications = ({
  clear = false,
  type,
  device_id,
}: ClearNotificationsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = async () => {
    if (clear) {
      router.push(pathname + "#notifications");
      router.refresh();
    } else {
      if (type === "dashboard") clearDashboardNotifications();
      if (type === "device")
        clearDeviceNotifications({ device_id: device_id ?? "" });
      router.push(pathname + "?clearNotifications=true#notifications");
      router.refresh();
    }
  };

  return (
    <Button onClick={onClick} variant="ghost" className="text-xs h-6 w-12">
      {clear ? "Load" : "Clear"}
    </Button>
  );
};
