import { Manrope } from "next/font/google";
import { Card, CardTitle } from "../ui/card";

import { cn } from "@/lib/utils";
import {
  fetchDashboardNotifications,
  fetchDeviceNotifications,
} from "@/actions/notifications";

import { InfiniteScrollNotifications } from "./infinite-scroll-notifications";
import { Notification } from "./notification-item";

import { ClearNotifications } from "./clear-notifications";
import { Skeleton } from "../ui/skeleton";

const manrope = Manrope({
  weight: ["800"],
  subsets: ["latin"],
});

interface NotificationData {
  message_type: string;
  message: string;
  description?: string;
  background_color?: string;
}

export function transformNotifications(
  data: NotificationData[]
): Notification[] {
  return data.map((notification) => ({
    type: notification.message_type,
    title: notification.message,
    description: notification.description || undefined,
    background_color: notification.background_color || "#808080",
  }));
}

export type NotificationsType = "dashboard" | "device";

interface NotificationsProps {
  className?: string;
  clear?: boolean;
  type?: NotificationsType;
  device_id?: string;
}

export const Notifications = async ({
  className,
  clear,
  type = "dashboard",
  device_id,
}: NotificationsProps) => {
  let data: NotificationData[] = [
    {
      message: "",
      message_type: "",
      description: "",
      background_color: "#0000ff",
    },
  ];

  if (type === "dashboard") {
    data = await fetchDashboardNotifications({
      clear: clear ?? false,
    });
  } else if (type === "device") {
    data = await fetchDeviceNotifications({
      clear: clear ?? false,
      device_id,
    });
  }

  const notifications: Notification[] = transformNotifications(data);

  return (
    <Card className={cn("w-full", className)} id="notifications">
      <div className="flex justify-between items-center">
        <CardTitle className={`font-extrabold ${manrope.className}`}>
          Notifications
        </CardTitle>
        <ClearNotifications clear={clear} type={type} device_id={device_id} />
      </div>
      <div className="mt-5 space-y-7 overflow-y-auto h-[65vh] w-full min-w-[305px] pr-10">
        <InfiniteScrollNotifications
          device_id={device_id}
          type={type}
          initializeNotifications={notifications}
          clear={clear}
        />
      </div>
    </Card>
  );
};

export const NotificationsSkeleton = ({ className }: { className: string }) => {
  return <Skeleton className={cn("w-full", className)} />;
};
