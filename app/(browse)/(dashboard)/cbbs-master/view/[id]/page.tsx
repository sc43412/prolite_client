import { DetailsCard } from "@/components/card/details-card";
import { HeaderCard } from "@/components/card/header-card";
import { DeviceState } from "./_components/device-state";
import { VisualCard, VisualCardSkeleton } from "@/components/card/visual-card";
import { DataTable } from "./_components/logs-table/data-table";
import { columns } from "./_components/logs-table/columns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { MenuOptions } from "./_components/menu-options";
import { DoughnutData } from "@/components/visuals-charts/doughnut";
import { postRequest } from "@/lib/api";
import { CBS_GRAPH, CBS_LOGS_TABLE, CBS_VIEW } from "@/endpoints";
import { Suspense } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DetailsCardHeader } from "./_components/details-card-header";
import ExportButton from "./_components/export-button";

const ViewPage = async ({ params }: { params: { id: string } }) => {
  const data = await postRequest(
    CBS_VIEW,
    {
      cbs_id: params.id,
    },
    { tags: ["cbs-master"] }
  );

  const graph = await postRequest(
    CBS_GRAPH,
    {
      cbs_id: params.id,
    }
  );

  console.log(graph)

  const table = await postRequest(CBS_LOGS_TABLE, {
    page: 0,
    size: 10,
    cbs_id: params.id,
  });

  const formatValue = (value:any) => {
    if (typeof value === 'number') {
        return Number.isInteger(value) ? value : parseFloat(value.toFixed(2));
    }
    return 0;
};

const battery_voltage: DoughnutData = {
    title: "Battery Voltage",
    labels: ["Voltage"],
    datasets: [
        {
            label: "Voltage",
            data: [formatValue(data?.battery_voltage)],
            backgroundColor: [data?.battery_voltage_fill_color],
        },
    ],
};

const battery_percentage: DoughnutData = {
    title: "Battery Percentage",
    labels: ["Percentage"],
    datasets: [
        {
            label: "Percentage",
            data: [formatValue(data?.battery_percentage)],
            backgroundColor: [data?.battery_percentage_fill_color],
        },
    ],
};

const battery_temperature: DoughnutData = {
    title: "Battery Temperature",
    labels: ["Temperature"],
    datasets: [
        {
            label: "Temperature",
            data: [formatValue(data?.battery_temperature)],
            backgroundColor: [data?.battery_temperature_fill_color],
        },
    ],
};

const battery_current: DoughnutData = {
    title: "Battery Current",
    labels: ["Current"],
    datasets: [
        {
            label: "Current",
            data: [formatValue(data?.battery_current)],
            backgroundColor: [data?.battery_current_fill_color],
        },
    ],
};

  const lineChart = {
    labels: [...graph.graphsData.timestamps],
    datasets: [
      {
        label: "Current",
        data: [...graph.graphsData.currents],
        borderColor: "#FF3131",
        yAxisID: "y-axis-1",
        tension: 0.2,
        borderDash: [6, 3],
        borderWidth: 3,
        pointRadius: 0,
      },
      {
        label: "Voltage",
        data: [...graph.graphsData.voltages],
        borderColor: "#FFB800",
        yAxisID: "y-axis-2",
        tension: 0.2,
        borderDash: [],
        borderWidth: 5,
        pointRadius: 0,
      },
      {
        label: "Temperature",
        data: [...graph.graphsData.temperatures],
        borderColor: "#006EC6",
        yAxisID: "y-axis-3",
        tension: 0.2,
        borderDash: [15, 5],
        borderWidth: 5,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="relative">
      <div className="absolute right-0 -top-9 lg:-top-12 ">
        <MenuOptions cbs_id={params.id} backupTimer = {data.backupTimer} />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <DetailsCard
            className="md:w-1/2 xl:w-3/4"
            type="cbs"
            title="CBBS Details"
            cbs_id={params.id}
            headerItems={
              <div className="flex items-center gap-x-2">
                <DetailsCardHeader tiggered_db={data?.db_cutoff} triggered_fire={data?.fire_signal} triggered_ac={data?.mains_status===0 ? true : false } cbs_id={params.id} />
                <Link href={`/cbbs-master/devices/${params.id}`}>
                  <Button className={cn("h-8 w-[122px]")} variant="outline">
                    All devices
                  </Button>
                </Link>
              </div>
            }
          />
          <HeaderCard
            className="md:w-1/2 xl:w-1/4 h-[166px] shrink"
            title="Devices"
          >
            <div className="flex flex-col gap-y-2">
              <DeviceState type="maintain" value={data?.maintain_devices || 0} />
              <DeviceState
                type="nonMaintain"
                value={data?.non_maintain_devices || 0}
              />
              <DeviceState type="inactive" value={data?.inactive_devices || 0} />
            </div>
          </HeaderCard>
        </div>

        <div className="grid grid-row-4 lg:grid-cols-4 gap-5 w-full">
          <Suspense
            fallback={
              <VisualCardSkeleton type="doughnut" singleValue="voltage" />
            }
          >
            <VisualCard
              data={battery_voltage}
              title={battery_voltage?.title}
              type="doughnut"
              singleValue="voltage"
              gauge
            />
          </Suspense>
          <Suspense
            fallback={
              <VisualCardSkeleton type="doughnut" singleValue="current" />
            }
          >
            <VisualCard
              data={battery_current}
              title={battery_current?.title}
              type="doughnut"
              singleValue="current"
              gauge
            />
          </Suspense>
          <Suspense
            fallback={
              <VisualCardSkeleton type="doughnut" singleValue="percentage" />
            }
          >
            <VisualCard
              data={battery_percentage}
              title={battery_percentage?.title}
              type="doughnut"
              singleValue="percentage"
              gauge
            />
          </Suspense>
          <Suspense
            fallback={
              <VisualCardSkeleton type="doughnut" singleValue="temperature" />
            }
          >
            <VisualCard
              data={battery_temperature}
              title={battery_temperature?.title}
              type="doughnut"
              singleValue="temperature"
              gauge
            />
          </Suspense>
        </div>

        <Card className="p-5">
          <Suspense fallback={<VisualCardSkeleton type="multiAxisLine" />}>
            <VisualCard
              type="multiAxisLine"
              title="Voltage Temperature Current"
              data={lineChart}
            />
          </Suspense>

          <hr className="h-[3px] bg-[#D6D6D6] top-[400px] mt-20 w-full" />

          <Card className="w-[380px] sm:w-[700px] md:w-full p-3 md:p-5 mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-xl my-5 w-fit">Logs</h2>
              {/* <Button
                className="flex gap-x-2 items-center h-8 w-[102px]"
                variant="outline"
              >
                <Upload className="size-4 font-bold" /> Export
              </Button> */}
              <ExportButton cbs_id={params.id}/>
            </div>
            <DataTable
              initialData={table.cbs_logs || []}
              columns={columns}
              initialPageSize={20}
              totalCount={table.totalCount}
              cbs_id={params.id}
            />
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default ViewPage;
