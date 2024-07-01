"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { cn } from "@/lib/utils";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";

ChartJS.register(ArcElement, Tooltip, Legend);

export type DoughnutData = {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
};

type Totals = {
  label: string;
  value: number;
  color: string;
};

interface DoughnutChartProps {
  data?: DoughnutData;
  className?: string;
  legend?: boolean;
  total?: boolean;
  gauge?: boolean;
  device?: boolean;
  singleValue?: "percentage" | "current" | "temperature" | "voltage";
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  legend = false,
  total = true,
  gauge = false,
  singleValue,
  className,
  device = false,
}) => {
  if (!data) {
    data = {
      title: "Doughnut Chart",
      labels: ["Active CBS", "Inactive CBS"],
      datasets: [
        {
          label: "devices",
          data: [2, 1],
          backgroundColor: ["#20DF7F", "#ED553B"],
        },
      ],
    };
  }

  const { collapsed } = useDashboardSidebar((state) => state);

  const totalDevices = data.datasets.reduce((acc, dataset) => {
    return acc + dataset.data.reduce((sum, value) => sum + value, 0);
  }, 0);

  let totals: Totals = { label: "", value: +"", color: "#000" };

  const maxValue = (() => {
    switch (singleValue) {
      case "percentage":
        return 100;
      case "current":
        return 100;
      case "voltage":
        return device ? 5 : 60;
      case "temperature":
        return device ? 100 : 35;
      default:
        return 100;
    }
  })();

  const units = (() => {
    switch (singleValue) {
      case "percentage":
        return "%";
      case "current":
        return "A";
      case "voltage":
        return "V";
      case "temperature":
        return (
          <>
            <sup>°</sup> C
          </>
        );
      default:
        return "";
    }
  })();

  if (singleValue) {
    totals.value = data.datasets[0].data[0];
    totals.color = data.datasets[0].backgroundColor[0];
    data.datasets[0].backgroundColor.push("#EFF1F3");

    if (data.datasets[0].data.length < 2) {
      data.datasets[0].data.push(maxValue - data.datasets[0].data[0]);
    }
  } else {
    totals.label = data?.datasets[0]?.label;
    totals.value = totalDevices;
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        filter: (tooltipItem: any) => {
          return tooltipItem.label.length !== 0;
        },
        callbacks: {
          label: (tooltipItem: any) =>
            `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    layout: {
      padding: {
        bottom: singleValue ? (gauge ? 20 : 0) : 130,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    circumference: gauge ? 180 : 360,
    rotation: gauge ? 270 : undefined,
    cutout: gauge ? "90%" : "80%",
    radius: "85%",
  };

  return (
    <div className="relative w-[320px] sm:w-auto h-full flex justify-center mx-auto">
      <Doughnut
        data={data}
        options={options}
        fallbackContent={<div className="size-full">Visual Unavailable</div>}
      />
      {total && (
        <div
          className={cn(
            "absolute top-[80px] left-1/2 -translate-x-1/2 flex flex-col justify-center items-center",
            className?.startsWith("3xl") && "3xl:top-[200px]",
            gauge && "top-[90px]"
          )}
        >
          {!singleValue && (
            <h3 className="text-xs text-nowrap">{totals?.label}</h3>
          )}
          <span
            className="text-2xl lg:text-base xl:text-2xl font-medium"
            style={{ color: totals?.color }}
          >
            {singleValue && singleValue === "current"
              ? totals?.value?.toFixed(2)
              : totals.value}
            {units}
          </span>
        </div>
      )}
      {gauge && (
        <div
          className={cn(
            "absolute bottom-[12%] lg:bottom-[25%] w-full px-6 sm:bottom-[8%] md:px-[27%] sm:px-[32%] lg:px-[7.5%] xl:px-[7.5%] xl:bottom-[13%] 2xl:bottom-[11.5%] flex flex-col 2xl:px-[7.5%] 3xl:px-[15%] 3xl:bottom-[7.5%]",
            !collapsed &&
              "2xl:bottom-[17%] 2xl:px-[7.5%] lg:px-[8%] xl:bottom-[19%] xl:px-[7.5%] lg:bottom-[31%] 3xl:bottom-[7.5%] 3xl:px-[10.5%]"
          )}
        >
          <hr className="h-[3px] bg-[#EFF1F3] left-10 -translate-y-1/2 border-0" />
          <div className="flex justify-between items-center text-xs">
            {singleValue && (
              <>
                <span>
                  {0}
                  {units}
                </span>
                <span>
                  {maxValue}
                  {units}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {legend && (
        <div className="absolute bottom-10 md:bottom-3 left-0 w-full flex justify-center space-x-2">
          <div
            className={cn(
              "grid grid-flow-col w-full gap-y-3",
              data.labels.length < 3 && "grid-cols-2 sm:grid-rows-2",
              data.labels.length >= 3 && "grid-rows-2 grid-cols-2"
            )}
          >
            {data.labels.map((label, index) => (
              <div key={index} className="flex items-start gap-2">
                <span
                  className="min-w-[10px] h-[10px] rounded-full mt-[5px]"
                  style={{
                    backgroundColor: data.datasets[0].backgroundColor[index],
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-xs text-[#707070] text-nowrap">
                    {label}
                  </span>
                  <span
                    style={{ color: data.datasets[0].backgroundColor[index] }}
                  >
                    {data.datasets[0].data[index] ?? 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoughnutChart;
