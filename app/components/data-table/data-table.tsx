"use client";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";
import { cn } from "@/lib/utils";
import { useDataTable } from "./use-data-table";
import { ExtendDataTableRefMethods, ExtendDataTableProps } from "./types";

interface TasksTableProps<TData, TValue>
  extends ExtendDataTableRefMethods<TData> {
  data: TData[];
  count: number;
  limit: number;
  pageSizeOptions?: number[];
  columns: ColumnDef<TData, TValue>[];
  Toolbar?: React.ForwardRefExoticComponent<
    ExtendDataTableProps<TData> &
      React.RefAttributes<ExtendDataTableRefMethods<TData>>
  >;
  className?: string;
  toolbarClassName?: string;
  hasToolbar?: boolean;
}
export function DataTable<TData, TValue>({
  data,
  count,
  limit,
  columns,
  className,
  Toolbar,
  onRowClick,
  onRowDoubleClick,
  onRowHover,
}: TasksTableProps<TData, TValue>) {
  const defaultPerPage = limit;
  const pageCount = count;

  const { table } = useDataTable({ data, columns, pageCount, defaultPerPage });

  return (
    <div>
      {Toolbar && (
        <Toolbar
          filterFields={[
            { value: "name", label: "Name" },
            { value: "description", label: "Description" },
            { value: "status", label: "Status" },
            { value: "createdAt", label: "Created At" },
          ]}
          table={table}
        />
      )}
      <div className={cn(className)}>
        <Table>
          <TableHeader className=" font-bold">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row)}
                  onDoubleClick={() => onRowDoubleClick?.(row)}
                  onMouseEnter={() => onRowHover?.(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No record found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-col gap-2.5 mt-4">
          {/* <DataTablePagination
            table={table}
            pageSizeOptions={pageSizeOptions}
          /> */}
        </div>
      </div>
    </div>
  );
}
