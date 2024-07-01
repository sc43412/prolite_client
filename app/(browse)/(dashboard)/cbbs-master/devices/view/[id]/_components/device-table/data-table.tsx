"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/table/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEVICE_LOGS_TABLE } from "@/endpoints";
import { postRequest } from "@/lib/api";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
  totalCount: number;
  initialPageSize: number;
  device_id: string;
}

export function DataTable<TData, TValue>({
  columns,
  initialData,
  totalCount,
  initialPageSize = 10,
  device_id,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>(initialData);
  const [pageCount, setPageCount] = useState(
    Math.ceil(totalCount / initialPageSize)
  );
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const fetchData = async (pageIndex: number, pageSize: number) => {
    const response = await postRequest(DEVICE_LOGS_TABLE, {
      page: pageIndex,
      size: pageSize,
      device_id,
    });

    const indexedData = response.device_logs.map((item: any, idx: number) => ({
      ...item,
      index: pageIndex * pageSize + idx + 1,
    }));

    setData(indexedData);
    setPageCount(Math.ceil(response.totalCount / pageSize));
  };

  useEffect(() => {
    fetchData(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
      pagination,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const cbs_name = row.getValue<string>("cbs_name");
      return cbs_name.toLowerCase().includes(filterValue.toLowerCase());
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-max">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    i === 0 && "rounded-l-[6px]",
                    i === headerGroup.headers.length - 1 && "rounded-r-[6px]"
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="!py-3" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-y-4 md:flex-row justify-between items-center pt-4">
        <div className="text-xs">{totalCount} Results Found</div>
        <div className="flex items-center justify-center gap-x-3">
          <Button
            variant="ghost"
            className="text-xs flex gap-5"
            size="table"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft /> Previous
          </Button>
          <Pagination
            totalPages={table.getPageCount()}
            currentPage={table.getState().pagination.pageIndex + 1}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
          <Button
            variant="ghost"
            className="text-xs flex gap-5"
            size="table"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
