"use client";

import { Switch } from "@/components/ui/switch";
import { DEVICE_REFRESH_ZONE, DEVICE_TOGGLE_ZONE } from "@/endpoints";
import { postRequest } from "@/lib/api";
import { useState } from "react";
import { Zone } from "./zone-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ZoneDiscoverToggleProps {
  cbs_id: string;
  zone: Zone;
}

export const ZoneDiscoverToggle = ({
  cbs_id,
  zone,
}: ZoneDiscoverToggleProps) => {
  const [enabled, setEnabled] = useState<boolean>(zone.zone_status);

  const refreshZone = async () => {
    await postRequest(DEVICE_REFRESH_ZONE, {
      cbs_id,
      zone_no: zone?.zone_no,
    }).then(() => toast.success("Triggered zone refresh"));
  };

  const onClick = async () => {
    await postRequest(DEVICE_TOGGLE_ZONE, {
      cbs_id,
      zone_status: !enabled,
      zone_no: zone.zone_no,
    }).then(() => {
      toast.success("Zone triggered successfully");
      setEnabled(!enabled);
    });
  };

  return (
    <div className="flex items-center gap-x-4">
      <Button
        onClick={refreshZone}
        variant="outline"
        className="h-[33px] w-[125px]"
      >
        Discover Zone
      </Button>
      <Switch
        id={`zone-${zone.zone_no.toString()}`}
        checked={enabled}
        onClick={onClick}
      />
    </div>
  );
};
