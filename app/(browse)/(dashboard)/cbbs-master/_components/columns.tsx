"use client";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { TaskViewButton } from "@/components/task-view-button";

export type CBSMaster = {
  _id: string;
  cbs_name: string;
  cbs_id: string;
  connected_zones: number;
  no_of_devices: number;
  remark: string;
  status: string;
  index?: number;
  
};

export const columns: ColumnDef<CBSMaster>[] = [
  {
    accessorKey: "index",
    header: () => "Sr. No.",
    cell: ({ row }) => <span>{row.original.index}.</span>,
  },
  {
    accessorKey: "cbs_name",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CBBS Name
      </Button>
    ),
  },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CBS ID
      </Button>
    ),
  },
  {
    accessorKey: "connected_zones",
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
    accessorKey: "no_of_devices",
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
    accessorKey: "remark",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Description
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.remark || "No remark."}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.status || "N/A"}</span>,
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => (
      <TaskViewButton cbs_id={row.original._id} path="cbbs-master/view" />
    ),
  },
];
