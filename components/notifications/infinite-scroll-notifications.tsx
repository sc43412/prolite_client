"use client";

import { Loader } from "lucide-react";
import { Notification, NotificationItem } from "./notification-item";
import { useEffect, useRef, useState } from "react";
import {
  fetchDashboardNotifications,
  fetchDeviceNotifications,
} from "@/actions/notifications";
import useInView from "@/hooks/useInView";
import { NotificationsType, transformNotifications } from ".";

interface InfiniteScrollNotificationsProps {
  initializeNotifications: Notification[];
  clear?: boolean;
  device_id?: string;
  type: NotificationsType;
}

export const InfiniteScrollNotifications = ({
  initializeNotifications,
  device_id,
  clear = false,
  type,
}: InfiniteScrollNotificationsProps) => {
  const [notifications, setNotifications] = useState(
    clear ? [] : initializeNotifications
  );
  const [page, setPage] = useState(1);
  const ref = useRef(null);
  const inView = useInView({}, ref);

  const loadMoreNotifications = async () => {
    const next = page + 1;
    let data = [];
    if (type === "dashboard")
      data = await fetchDashboardNotifications({ page: next });
    if (type === "device")
      data = await fetchDeviceNotifications({ page: next, device_id });

    const notifications: Notification[] = transformNotifications(data);

    if (notifications?.length) {
      setPage(next);
      setNotifications((prev: Notification[]) => [
        ...(prev?.length ? prev : []),
        ...notifications,
      ]);
    }
  };

  useEffect(() => {
    if (clear) {
      return setNotifications([]);
    }
    if (inView) {
      loadMoreNotifications();
    }
  }, [inView, clear]);

  if (clear) {
    return (
      <div className="text-center">
        <span>Cleared notifications</span>
      </div>
    );
  }

  return (
    <>
      {notifications?.map((item, index) => (
        <NotificationItem data={item} key={index} />
      ))}

      {/* loading spinner */}
      <div className="mx-auto" ref={ref}>
        <Loader className="animate-spin mx-auto" />
      </div>
    </>
  );
};
