"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export type MultiAxisLineData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    yAxisID: string;
    tension: number;
    borderDash: number[];
    borderWidth: number;
    pointRadius: number;
  }[];
};

interface MultiAxisLineChartProps {
  className?: string;
  data?: MultiAxisLineData;
}

const MultiAxisLineChart = ({ className, data }: MultiAxisLineChartProps) => {
  if (!data) {
    const datasets = [
      {
        label: "Current (A)",
        data: [0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0],
        borderColor: "#58B761",
        yAxisID: "y-axis-1",
        tension: 0.2,
        borderDash: [6, 3],
        borderWidth: 3,
        pointRadius: 0,
      },
      {
        label: "Voltage (V)",
        data: [0, 2, 4, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4, 3],
        borderColor: "#62A3F1",
        yAxisID: "y-axis-2",
        tension: 0.2,
        borderDash: [],
        borderWidth: 5,
        pointRadius: 0,
      },
      {
        label: "Temperature",
        data: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.2, 0],
        borderColor: "#0357A6",
        yAxisID: "y-axis-3",
        tension: 0.2,
        borderDash: [15, 5],
        borderWidth: 5,
        pointRadius: 0,
      },
    ];

    const maxLength = Math.max(...datasets.map((item) => item.data.length));
    const labels = Array.from({ length: maxLength }, (_, i) => i.toString());

    data = {
      labels,
      datasets,
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
      },
      title: {
        display: false,
      },
    },
    elements: {
      point: {
        pointStyle: "star",
      },
    },
    scales: {
      "y-axis-1": {
        min: 0,
        max: 100,
        stepSize: 20,
        type: "linear" as const,
        color: "#fff",
        display: true,
        position: "left" as const,
        border: {
          display: true,
          color: "#fff",
        },
        grid: {
          drawOnChartArea: true,
          drawTicks: false,
          align: "start",
        },
        ticks: {
          stepSize: 20,
        },
      },
      "y-axis-2": {
        min: 0,
        max: 100,
        stepSize: 20,
        beginAtZero: true,
        type: "linear" as const,
        display: false,
        position: "left" as const,
        border: {
          display: false,
          color: "#fff",
        },
        grid: {
          drawOnChartArea: false,
          drawTicks: false,
        },
      },
      "y-axis-3": {
        min: 0,
        max: 100,
        stepSize: 20,
        beginAtZero: true,
        type: "linear" as const,
        display: false,
        grid: {
          drawOnChartArea: false,
          drawTicks: false,
        },
      },
      "x-axis-1": {
        beginAtZero: true,
        type: "category" as const,
        display: false,
        position: "bottom" as const,
        grid: {
          drawOnChartArea: false, // Hide vertical grid lines
          drawTicks: false,
        },
      },
    },
  };

  return (
    <div
      className={cn("w-full h-full mt-4 relative", className && "h-[380px]")}
    >
      <Line data={data} options={options} className="w-full" />
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs">
        Time (h)
      </div>

      <div className="absolute -bottom-10 left-10 w-full flex space-x-2">
        <div className={cn("grid grid-cols-3 w-[280px]")}>
          {data.datasets.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <span
                className="min-w-[10px] h-[10px] rounded-full"
                style={{
                  backgroundColor: item.borderColor,
                }}
              />
              <div className="flex flex-col">
                <span className="text-xs text-[#707070] text-nowrap">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiAxisLineChart;
