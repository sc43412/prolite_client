"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type CBSDeviceDetail = {
  index?: number;
  device_UID: string;
  createdAt: Date;
  coil_value: number;
  type: string;
  voltage: number;
  temperature: number;
  issue: string[];
};

export const columns: ColumnDef<CBSDeviceDetail>[] = [
  {
    accessorKey: "index",
    header: () => "Sr. No.",
    cell: ({ row }) => <span>{row.original.index}.</span>,
  },
  {
    accessorKey: "device_UID",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Device UID
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Timestamp
      </Button>
    ),
    cell: ({ row }) => (
      <span>{format(row.original.createdAt, "dd/MM/yyyy, hh:mm a")}</span>
    ),
  },
  {
    accessorKey: "coil_value",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
      </Button>
    ),
    cell: ({ row }) => (
      <span
        className={cn(
          row.original.coil_value ? "text-[#FF3131]" : "text-[#58B761]"
        )}
      >
        {row.original.coil_value ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
      </Button>
    ),
    cell: ({ row }) => (
      <span
        className={cn(
          row.original.type === "NM" ? "text-[#919191]" : "text-primary"
        )}
      >
        {row.original.type}
      </span>
    ),
  },
  {
    accessorKey: "voltage",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Voltage
      </Button>
    ),
  },
  {
    accessorKey: "temperature",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Temperature
      </Button>
    ),
  },

  {
    accessorKey: "issue",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Issue
      </Button>
    ),
    cell: ({ row }) => (
      <span>{row.original.issue.length ? row.original.issue : "None"}</span>
    ),
  },
];
