"use client";

import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { TaskViewButton } from "@/components/task-view-button";
import { Switch } from "@/components/ui/switch";
import { postRequest } from "@/lib/api";
import { DEVICE_COIL_TOGGLE, DEVICE_MAINTAIN_TOGGLE, DEVICE_POST_REMARK } from "@/endpoints";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  remark : string;
  index?: number;
};

const RemarkCell = ({ row } : any) => {
  const [inputValue, setInputValue] = useState(row.original.remark || "N/A");

  const onSubmit = async () => {
    const data = await postRequest(
      DEVICE_POST_REMARK,
      {
        device_id: row.original._id,
        remark: inputValue
      },
    );
    toast.success(`Remark added to Device ID ${row.original._id}`);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Enter Description"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ marginRight: "8px" }}
      />
      <button onClick={onSubmit} style={{ cursor: "pointer" }}>
        <i className="icon-class">✅</i> {/* Replace with an actual icon class if needed */}
      </button>
    </div>
  );
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
        <span  className={cn(
          row.original.coil_value ?   "text-[#58B761]" : "text-[#FF3131]"
        )}>
          {row.original.coil_value ? "A" : "IN"}
        </span>
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
        {row.original.issue.length ? row.original.issue.join(', ') : "None"}
      </span>
    ),
  },

  // {
  //   accessorKey: "remark",
  //   header: ({ column }) => (
  //     <Button
  //       size="table"
  //       variant="tableHeader"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Description
  //     </Button>
  //   ),
  // },

  // {
  //   accessorKey: "remark",
  //   header: ({ column }) => (
  //     <Button
  //       size="table"
  //       variant="tableHeader"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Description
  //     </Button>
  //   ),
  //   cell: ({ row }) =>{ 
  //   const [inputValue, setInputValue] = useState(row.original.remark || "N/A");
  //   const onSubmit = async()=>{
  //     const data = await postRequest(
  //       DEVICE_POST_REMARK,
  //       {
  //         device_id: row.original._id,
  //         remark : inputValue
  //       },
        
  //     );
  //     toast.success(`remark added in the Device id ${row.original._id}`);


  //   }

  //   return (
  //     <div style={{ display: "flex", alignItems: "center" }}>
  //     <input
  //       type="text"
  //       placeholder="Enter Description"
  //       value={inputValue}
  //       onChange={(e) => setInputValue(e.target.value)}
  //       // placeholder="Enter remark"
  //       style={{ marginRight: "8px" }}
  //     />
  //     <button onClick={onSubmit}  style={{ cursor: "pointer" }}>
  //       <i className="icon-class">✅</i> {/* Replace with an actual icon class if needed */}
  //     </button>
  //   </div>
  //   )
  //   // <span>{row.original.remark || "No remark."}</span>,
  // }},
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
  cell: ({ row }) => <RemarkCell row={row} />,  // Use the RemarkCell component here
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
