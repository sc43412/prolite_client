"use client";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { TaskViewButton } from "@/components/task-view-button";
import { Switch } from "@/components/ui/switch";
import { postRequest } from "@/lib/api";
import { DEVICE_COIL_TOGGLE, DEVICE_MAINTAIN_TOGGLE } from "@/endpoints";
import { toast } from "sonner";

export type CBSDevice = {
  _id: string;
  zone_no: number;
  slave_address: string;
  device_id: string;
  cbs_id: string;
  voltage: number;
  temperature: number;
  coil_value: number;
  is_maintain: boolean;
  issue: string[];
  Temperature_Issue: number;
  index?: number;
};

export const columns: ColumnDef<CBSDevice>[] = [
  {
    accessorKey: "zone_id",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Zone No.
      </Button>
    ),
    cell: ({ row }) => <span>{row.original.zone_no}.</span>,
  },
  {
    accessorKey: "slave_address",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Slave ID
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
        Device ID
      </Button>
    ),
  },
  {
    accessorKey: "cbs_id",
    header: ({ column }) => (
      <Button
        size="table"
        variant="tableHeader"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CBBS ID
      </Button>
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
      <div className="flex items-center gap-x-4">
        <Switch
          variant={row.original.coil_value ? "green" : "red"}
          onClick={async () => {
            await postRequest(DEVICE_COIL_TOGGLE, {
              device_id: row.original._id,
              coil_value: row.original.coil_value ? 0 : 1,
            });
            toast.success("Triggered Device Status Toggle");
          }}
          checked={!!row.original.coil_value}
        />
      </div>
    ),
  },
  {
    accessorKey: "is_maintain",
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
      <div className="flex items-center gap-x-1">
        <Switch
          onClick={async () => {
            await postRequest(DEVICE_MAINTAIN_TOGGLE, {
              device_id: row.original._id,
              maintain_value: !row.original.is_maintain,
            });
            toast.success("Triggered Device Type Toggle");
          }}
          checked={row.original.is_maintain}
        />
        <span className="text-[#707070]">
          {row.original.is_maintain ? "M" : "NM"}
        </span>
      </div>
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
      <span className="capitalize">
        {row.original.issue.length ? row.original.issue : "None"}
      </span>
    ),
  },

  {
    accessorKey: "Actions",
    cell: ({ row }) => (
      <TaskViewButton
        cbs_id={row.original._id}
        path="cbbs-master/devices/view"
      />
    ),
  },
];
