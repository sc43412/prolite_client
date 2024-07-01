"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  getFilteredRowModel,
  FilterFn,
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
import { Input } from "@/components/ui/input";
import { StatusZone } from "./status-zone";
import Pagination from "@/components/table/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CBSDevice } from "./columns";
import { cn } from "@/lib/utils";
import { useDebounceCallback } from "usehooks-ts";
import { postRequest } from "@/lib/api";
import { DEVICE_LIST } from "@/endpoints";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
  totalCount: number;
  initialPageSize: number;
  cbs_id: string;
}

const filterData: FilterFn<CBSDevice> = (row, columnId, filterValue) => {
  const value = row.getValue<string>(columnId);
  return value.toLowerCase().includes(filterValue.toLowerCase());
};

export function DataTable<TData, TValue>({
  columns,
  initialData,
  totalCount,
  initialPageSize = 10,
  cbs_id,
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
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [zoneFilter, setZoneFilter] = useState<string | null>(null);

  const fetchData = async (
    pageIndex: number,
    pageSize: number,
    search: string,
    zone: string | null
  ) => {
    const body: any = {
      page: pageIndex,
      size: pageSize,
      cbs_id,
    };

    if (search) {
      body.search = search;
    }

    if (zone !== null) {
      body.zone_no = +zone;
    }

    const response = await postRequest(DEVICE_LIST, body);

    const indexedData = response.device_list.map((item: any, idx: number) => ({
      ...item,
      index: pageIndex * pageSize + idx + 1,
    }));

    setData(indexedData);
    setPageCount(Math.ceil(response.totalCount / pageSize));
  };

  const debouncedFetchData = useDebounceCallback(fetchData, 500);

  // useEffect(() => {
  //   debouncedFetchData(
  //     pagination.pageIndex,
  //     pagination.pageSize,
  //     globalFilter,
  //     zoneFilter
  //   );
  // }, [pagination, globalFilter, zoneFilter]);

  useEffect(() => {
    // Define the fetch function
    const fetchData = () => {
      debouncedFetchData(
        pagination.pageIndex,
        pagination.pageSize,
        globalFilter,
        zoneFilter
      );
    };

    // Fetch data immediately when the component mounts or dependencies change
    fetchData();

    // Set up the interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Clean up the interval on unmount or when dependencies change
    return () => clearInterval(intervalId);
  }, [pagination, globalFilter, zoneFilter]);

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
    filterFns: {
      customFilter: filterData,
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const device_id = row.getValue<string>("_id");
      return device_id.toLowerCase().includes(filterValue.toLowerCase());
    },
    onPaginationChange: setPagination,
  });

  const resultsCount = data.length;

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center pb-2 justify-between">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search by Device IDs..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="text-xs w-full bg-white h-[34px]"
          />
        </div>
        <StatusZone onChange={setZoneFilter} />
      </div>

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
          {resultsCount ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
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
        <div className="text-xs">{resultsCount} Results Found</div>
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
