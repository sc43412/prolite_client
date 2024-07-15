import { DetailsCard } from "@/components/card/details-card";
import { VisualCard } from "@/components/card/visual-card";
import { DataTable } from "./_components/device-table/data-table";
import { columns } from "./_components/device-table/columns";
import { Card } from "@/components/ui/card";

import {
  Notifications,
  NotificationsSkeleton,
} from "@/components/notifications";
import { DoughnutData } from "@/components/visuals-charts/doughnut";
import { postRequest } from "@/lib/api";
import { DEVICE_COIL_TOGGLE, DEVICE_GRAPH, DEVICE_LOGS_TABLE, DEVICE_MAINTAIN_TOGGLE, DEVICE_VIEW } from "@/endpoints";
import { Suspense } from "react";
import { Switch } from "@/components/ui/switch";
import SwitchComponent from "./_components/view/switchComponent";
import ExportButtonForDevice from "./_components/view/export.table";

const ViewPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { clearNotifications: boolean };
}) => {
  const data = await postRequest(
    DEVICE_GRAPH,
    {
      device_id: params.id,
    },
    { revalidate: 1800 }
  );

  const table = await postRequest(DEVICE_LOGS_TABLE, {
    page: 0,
    size: 10,
    device_id: params.id,
  });

  const lineChart = {
    labels: [...data.graphsData?.timestamps],
    datasets: [
      {
        label: "Voltage",
        data: [...data.graphsData?.voltages],
        borderColor: "#FFB800",
        yAxisID: "y-axis-2",
        tension: 0.2,
        borderDash: [],
        borderWidth: 5,
        pointRadius: 0,
      },
      {
        label: "Temperature",
        data: [...data.graphsData?.temperatures],
        borderColor: "#0357A6",
        yAxisID: "y-axis-3",
        tension: 0.2,
        borderDash: [15, 5],
        borderWidth: 5,
        pointRadius: 2,
      },
    ],
  };

  const { deviceData } = await postRequest(DEVICE_VIEW, {
    device_id: params.id,
  }, { revalidate: 25 });

  const formatValue = (value:any) => {
    if (typeof value === 'number') {
        return Number.isInteger(value) ? value : parseFloat(value.toFixed(2));
    }
    return 0;
};
  const battery_voltage: DoughnutData = {
    title: "Device Voltage",
    labels: ["Voltage"],
    datasets: [
      {
        label: "Voltage",
        data: [formatValue(deviceData?.voltage)],
        backgroundColor: [deviceData?.voltage_fill_color],
      },
    ],
  };

  const battery_temperature: DoughnutData = {
    title: "Device Temperature",
    labels: ["Percentage"],
    datasets: [
      {
        label: "Temperature",
        data: [formatValue(deviceData?.temperature)],
        backgroundColor: [deviceData?.temperature_fill_color],
      },
    ],
  };

  const generateCoilPayload = async (deviceId: string, coilValue: boolean) => {
    "use server"
    return {
    
    url: DEVICE_COIL_TOGGLE,
    body: {
      device_id: deviceId,
      coil_value: coilValue==true? 1 : 0,
    },
    
  }};

  const generateMaintainPayload = async (deviceId: string, maintainValue: boolean) => {
    "use server"
    return {
    url: DEVICE_MAINTAIN_TOGGLE,
    body: {
      device_id: deviceId,
      maintain_value: maintainValue,
    },
  }};

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-5">
        <DetailsCard
          device_id={params.id}
          className="w-full"
          type="device"
          title="Device Details"
          headerItems={
            <div className="flex text-xs gap-x-4">
              <div className="flex items-center gap-x-2">
                <span>Status : </span>
                <SwitchComponent
          deviceId={params.id}
          type={"coil"}
          initialChecked={deviceData?.coil_value===1 ? true : false}
          className="h-[13.64px]"
          generatePayload={generateCoilPayload}
        />
                {/* <Switch
                  className="h-[13.64px]"
                  checked={deviceData?.coil_value}
                  onClick={async ()=>{
                    await postRequest(DEVICE_COIL_TOGGLE, {
                      device_id: params.id,
                      coil_value: !deviceData?.coil_value,
                    });
                  }}
                /> */}
              </div>
              <div className="flex items-center gap-x-2">
                <span>Type : </span>
                {/* <Switch
                  className="h-[13.64px]"
                  checked={deviceData?.is_maintain}
                  onClick={async () => {
                    await postRequest(DEVICE_MAINTAIN_TOGGLE, {
                      device_id: params.id,
                      maintain_value: deviceData?.is_maintain,
                    });
                  }}
                /> */}
                  <SwitchComponent
          deviceId={params.id}
          type="maintain"
          initialChecked={deviceData?.is_maintain}
          className="h-[13.64px]"
          generatePayload={generateMaintainPayload}
        />
              </div>
            </div>
          }
        />
      </div>
      <div className="flex lg:flex-row flex-col gap-5">
        <div className="size-full lg:w-9/12">
          <VisualCard
            data={lineChart}
            type="multiAxisLine"
            title="Voltage Temperature"
            className="h-[500px]"
          />
        </div>
        <div className="flex lg:flex-col flex-col  gap-5 w-full lg:w-3/12 ml-auto">
          <VisualCard
            type="doughnut"
            singleValue="voltage"
            device
            gauge
            data={battery_voltage}
            title={battery_voltage.title}
          />
          <VisualCard
            type="doughnut"
            device
            gauge
            singleValue="temperature"
            data={battery_temperature}
            title={battery_temperature.title}
          />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-5">
        <Card className="w-[380px] sm:w-[700px] md:w-full p-3 md:p-5 mx-auto lg:w-9/12">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-xl mb-5 w-fit">Device Details</h2>
            <ExportButtonForDevice device_id={params.id}/>
          </div>
          <DataTable
            columns={columns}
            initialData={table.device_logs || []}
            device_id={params.id}
            initialPageSize={20}
            totalCount={table?.totalCount || 0}
          />
        </Card>
        <Suspense fallback={<NotificationsSkeleton className="lg:w-3/12" />}>
          <Notifications
            className="lg:w-3/12"
            clear={searchParams.clearNotifications}
            device_id={params.id}
            type="device"
          />
        </Suspense>
      </div>
    </div>
  );
};

export default ViewPage;
