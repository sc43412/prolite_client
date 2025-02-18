export const CLIENT_API_BASE = "/client";

export const CLIENT_USER_PROFILE = CLIENT_API_BASE + "/user/profile";

export const DASHBOARD_LIST = CLIENT_API_BASE + "/dashboard/list";
export const DASHBOARD_NOTIFICATION =
  CLIENT_API_BASE + "/dashboard/fetch/notifications";
export const DASHBOARD_NOTIFICATION_CLEAR =
  CLIENT_API_BASE + "/dashboard/clear/notifications";

export const CBS_LIST = CLIENT_API_BASE + "/cbs/list";
export const CBS_VIEW = CLIENT_API_BASE + "/cbs/view";
export const CBS_GRAPH = CLIENT_API_BASE + "/cbs/graphs";
export const CBS_LOGS_TABLE = CLIENT_API_BASE + "/cbs/logs";
export const CBS_SET_REMARK = CLIENT_API_BASE + "/cbs/set/remark/cbs"

export const CBS_TOGGLE_AUTO_TEST =
  CLIENT_API_BASE + "/device/toggle/auto/test";
export const CBS_BACKUP_TIMER = CLIENT_API_BASE + "/device/set/backup/timer"  
export const CBS_CANCEL_SCHEDULED_AUTOTEST = CLIENT_API_BASE + "/device/toggle/cancel/scheduled/auto/test"
export const CBS_SCHEDULED_AUTO_TEST = CLIENT_API_BASE + "/device/set/scheduledauto/timer" 

export const DEVICE_LIST = CLIENT_API_BASE + "/device/list";
export const DEVICE_VIEW = CLIENT_API_BASE + "/device/view";
export const DEVICE_COIL_TOGGLE = CLIENT_API_BASE + "/device/toggle/device";
export const DEVICE_POST_REMARK = CLIENT_API_BASE + "/device/set/remark/device"
export const DEVICE_MAINTAIN_TOGGLE =
  CLIENT_API_BASE + "/device/toggle/maintain";

export const DEVICE_GRAPH = CLIENT_API_BASE + "/device/graphs";
export const DEVICE_NOTIFICATION =
  CLIENT_API_BASE + "/device/fetch/notifications";
export const DEVICE_NOTIFICATION_CLEAR =
  CLIENT_API_BASE + "/device/clear/notifications";
export const DEVICE_LOGS_TABLE = CLIENT_API_BASE + "/device/logs";

export const DEVICE_DATA_GROUP_BY_ZONES =
  CLIENT_API_BASE + "/device/data/group/by/zones";
export const DEVICE_TOGGLE_ZONE = CLIENT_API_BASE + "/device/toggle/zone";
export const DEVICE_REFRESH_ZONE = CLIENT_API_BASE + "/device/refresh/by/zone";

export const CBS_MAKE_DOWNLOAD_URL = CLIENT_API_BASE + "/download/make/presigned/url/cbs"
export const DEVICE_MAKE_DOWNLOAD_URL = CLIENT_API_BASE + "/download/make/presigned/url/device"
export const NOTIFICATION_MAKE_DOWNLOAD_URL = CLIENT_API_BASE + "/download/make/presigned/url/notification"

