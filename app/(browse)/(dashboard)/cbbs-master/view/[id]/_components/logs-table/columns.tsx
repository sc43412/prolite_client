"use client";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { BatteryStatus } from "./battery-status";
import { format } from "date-fns";

export type CBSLogs = {
  cbs_UID: string;
  createdAt: Date;
  total_zones: number;
  total_devices: number;
  battery_current: number;
  battery_voltage: number;
  battery_temperature: number;
  battery_percentage: number;
  charging_status: number;
  index?: number;
  emergency_trigger : string[];
};

export const columns: ColumnDef<CBSLogs>[] = [
  {
    accessorKey: "index",
    header: () => "Sr. No.",
    cell: ({ row }) => <span>{row.original.index}.</span>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        TimeStamp
      </Button>
    ),
    cell: ({ row }) => (
      <span>{format(row.original.createdAt, "dd/MM/yyyy, hh:mm a")}</span>
    ),
  },
  {
    accessorKey: "total_zones",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        No. of zones
      </Button>
    ),
  },
  {
    accessorKey: "total_devices",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        No. of devices
      </Button>
    ),
  },
  {
    accessorKey: "battery_current",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amp.
      </Button>
    ),
    cell: ({ row }) => <span>{row.original?.battery_current?.toFixed(3)}</span>,
  },
  {
    accessorKey: "battery_voltage",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Volt.
      </Button>
    ),
    cell: ({ row }) => <span>{row.original?.battery_voltage?.toFixed(1)}</span>,
  },
  {
    accessorKey: "battery_temperature",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Temp.
      </Button>
    ),
  },
  {
    accessorKey: "battery_percentage",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Battery %
      </Button>
    ),
  },
  {
    accessorKey: "emergency_trigger",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Emergency Triggers
      </Button>
    ),
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.emergency_trigger.length ? row.original.emergency_trigger.join(', ') : "None"}
      </span>
    )
  },

  {
    accessorKey: "charging_status",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Battery Charging Status
      </Button>
    ),
    cell: ({ row }) => <BatteryStatus state={row.original.charging_status} />,
  },
];
