"use server";

import {
  DASHBOARD_NOTIFICATION,
  DASHBOARD_NOTIFICATION_CLEAR,
  DEVICE_NOTIFICATION,
  DEVICE_NOTIFICATION_CLEAR,
} from "@/endpoints";
import { postRequest } from "@/lib/api";
import { revalidatePath, revalidateTag } from "next/cache";

interface fetchNotificationsProps {
  page?: number;
  size?: number;
  clear?: boolean;
}

export async function fetchDashboardNotifications({
  page = 0,
  size = 15,
  clear = false,
}: fetchNotificationsProps) {
  let notifications: any = [];
  if (!clear) {
    const data = await postRequest(
      DASHBOARD_NOTIFICATION,
      {
        page,
        size,
      },
      { tags: ["notifications"] }
    );
    notifications = data.notifications;
  }

  revalidatePath("/dashboard");

  return notifications;
}

export async function clearDashboardNotifications() {
  const data = await postRequest(DASHBOARD_NOTIFICATION_CLEAR);
  return data;
}

export async function fetchDeviceNotifications({
  page = 0,
  size = 15,
  device_id = "DWL20124PL10010",
  clear = false,
}: fetchNotificationsProps & { device_id?: string }) {
  let notifications: any = [];
  if (!clear) {
    const data = await postRequest(
      DEVICE_NOTIFICATION,
      {
        page,
        size,
        device_id,
      },
      { tags: ["notifications"] }
    );
    notifications = data.notifications;
  }

  revalidatePath("/devices/view");

  return notifications;
}

export async function clearDeviceNotifications({
  device_id = "DWL20124PL10010",
}: {
  device_id: string;
}) {
  const data = await postRequest(DEVICE_NOTIFICATION_CLEAR, {
    device_id,
  });
  return data;
}
