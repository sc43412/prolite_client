"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  FilterFn,
  getPaginationRowModel,
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
import { StatusSelect } from "./status-select";
import Pagination from "@/components/table/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CBSMaster } from "./columns";
import { cn } from "@/lib/utils";
import { postRequest } from "@/lib/api";
import { CBS_LIST } from "@/endpoints";
import { useDebounceCallback } from "usehooks-ts"; // Use usehooks-ts for debounce utility

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
  totalCount: number;
  initialPageSize: number;
}

const filterData: FilterFn<CBSMaster> = (row, columnId, filterValue) => {
  const value = row.getValue<string>(columnId);
  return value.toLowerCase().includes(filterValue.toLowerCase());
};

export function DataTable<TData, TValue>({
  columns,
  initialData,
  totalCount,
  initialPageSize = 10,
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
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const fetchData = async (
    pageIndex: number,
    pageSize: number,
    search: string,
    status: string | null
  ) => {
    const body: any = {
      page: pageIndex,
      size: pageSize,
    };

    if (search) {
      body.search = search;
    }

    if (status !== null) {
      body.status = +status;
    }

    const response = await postRequest(CBS_LIST, body);

    const indexedData = response.cbs_list.map((item: any, idx: number) => ({
      ...item,
      index: pageIndex * pageSize + idx + 1,
    }));

    setData(indexedData);
    setPageCount(Math.ceil(response.totalCount / pageSize));
  };

  const debouncedFetchData = useDebounceCallback(fetchData, 500);

  useEffect(() => {
    debouncedFetchData(
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
      statusFilter
    );
  }, [pagination, globalFilter, statusFilter]);

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
      const cbs_name = row.getValue<string>("cbs_name");
      return cbs_name.toLowerCase().includes(filterValue.toLowerCase());
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
            placeholder="Search by CBS Name..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="text-xs w-full bg-white h-[34px]"
          />
        </div>
        <StatusSelect onChange={setStatusFilter} />
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
