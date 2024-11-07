import { MetricCard, MetricCardSkeleton } from "@/components/card/metric-card";
import { VisualCard, VisualCardSkeleton } from "@/components/card/visual-card";
import {
  Notifications,
  NotificationsSkeleton,
} from "@/components/notifications";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DoughnutData } from "@/components/visuals-charts/doughnut";
import { DASHBOARD_LIST } from "@/endpoints";
import { postRequest } from "@/lib/api";
import { Download } from "lucide-react";
import { Suspense } from "react";
import DownloadButton from "./_components/downloadButton";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams: { clearNotifications: boolean };
}) => {
  const data = await postRequest(DASHBOARD_LIST);

let { maintainDevices, nonMaintainDevices, inactiveDevices,activeDevices } = data.data.devices;

// Set `inactiveDevices` to 0 if `maintainDevices` or `nonMaintainDevices` is present
// if (maintainDevices || nonMaintainDevices) {
//   inactiveDevices = 0;
// }

  const devices_doughnut: DoughnutData[] = [
    {
      title: "Total CBBS",
      labels: ["Active CBBS", "Inactive CBBS"],
      datasets: [
        {
          label: "Total CBBS",
          data: [data.data.cbs.activeCbs, data.data.cbs.nonActiveCbs],
          backgroundColor: ["#20DF7F", "#ED553B"],
        },
      ],
    },
    {
      title: "Zones",
      labels: ["Connected Zones", "Disconnected Zones"],
      datasets: [
        {
          label: "Total Zones",
          data: [
            data.data.zones.connectedZones,
            data.data.zones.disconnectedZones,
          ],
          backgroundColor: ["#0357A6", "#7DB2E5"],
        },
      ],
    },
    {
      title: "Devices",
      labels: ["Maintained", "Non-Maintened"],
      datasets: [
        {
          label: "Total Devices",
          data: [
            maintainDevices || 0,
            nonMaintainDevices || 0,
            
          ],
          backgroundColor: ["#3F2381", "#BDB1D9"],
        },
        
      ],
    },
    {
      title: "Devices",
      labels: [ "Active", "Inactive"],
      datasets: [
        {
          label: "Total Devices",
          data: [
           
            activeDevices || 0,
            inactiveDevices || 0,
          ],
          backgroundColor: [ "#BDB1D9", "#8A58FF"],
        },
        
      ],
    },
  ];

  return (
    <div className="relative">
      {/* <Button
        className="flex gap-2 absolute -right-3 -top-12 md:-top-14"
        variant="ghost"
      >
        <Download className="size-5" /> Download
      </Button> */}
      <DownloadButton/>
      <div className="flex flex-col lg:flex-row gap-5 justify-center md:justify-start">
        <div className="flex flex-col gap-5 w-full lg:w-3/4">
          <Card className="flex flex-col sm:flex-row gap-5 w-full items-center">
            <Suspense fallback={<MetricCardSkeleton />}>
              <MetricCard type="cbs" value={data?.data?.cbs?.totalCbs ?? 0} />
            </Suspense>
            <Suspense fallback={<MetricCardSkeleton />}>
              <MetricCard
                type="zones"
                value={data?.data?.zones?.totalZones ?? 0}
              />
            </Suspense>
            <Suspense fallback={<MetricCardSkeleton />}>
              <MetricCard
                type="devices"
                value={data?.data?.devices?.totalDevices ?? 0}
              />
            </Suspense>
          </Card>
          <div className="grid grid-row-3 sm:grid-cols-3 gap-5 w-full h-full">
            {devices_doughnut.map((item, index) => (
              <Suspense
                key={index}
                fallback={
                  <VisualCardSkeleton
                    type="doughnut"
                    className="3xl:h-[60vh]"
                  />
                }
              >
                <VisualCard
                  type="doughnut"
                  key={index}
                  data={item}
                  title={item.title}
                  total
                  legend
                  className="3xl:h-[60vh]"
                />
              </Suspense>
            ))}
          </div>
        </div>
        <Suspense fallback={<NotificationsSkeleton className="lg:w-1/4" />}>
          <Notifications
            className="lg:w-1/4"
            clear={searchParams.clearNotifications}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
