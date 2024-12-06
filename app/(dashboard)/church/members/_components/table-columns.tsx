"use client";

import { Member } from "@/app/(dashboard)/_types";
import { DataTableColumnHeader } from "@/app/components/data-table/data-table-column-header";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3, LucideDelete, LucideView } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export const MembersTableColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "membership_number",
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Membership No." />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-ellipsis">{row.original.membership_number}</div>
      );
    },
  },
  {
    accessorKey: "full_name",
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-ellipsis">{`${row.original.title || ""} ${
          row.original.full_name
        }`}</div>
      );
    },
  },
  {
    accessorKey: "age",
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => {
      return <div className="text-ellipsis">{`${row.original.age}`}</div>;
    },
  },
  {
    accessorKey: "phone_number",
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-ellipsis">{`${row.original.phone_number}`}</div>
      );
    },
  },
  {
    accessorKey: "email",
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-ellipsis">{`${row.original.email || "N/A"}`}</div>
      );
    },
  },
  {
    accessorKey: "date_of_birth",
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date of Birth" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-ellipsis">{`${row.original.date_of_birth}`}</div>
      );
    },
  },
  {
    accessorKey: "nationality",
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nationality" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-ellipsis pl-3">{`${row.original.nationality}`}</div>
      );
    },
  },
  {
    accessorKey: "is_active",
    enableSorting: true,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center pl-5">
          <Checkbox checked={row.original.is_active} disabled className="" />
        </div>
      );
    },
  },

  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="text-right"
      />
    ),
    cell: function Cell({}) {
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none focus:outline-none">
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="hover:bg-violet-200">
                <LucideView className="mr-2 size-3" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-violet-200">
                <Edit3 className="mr-2 size-3" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-violet-200">
                <LucideDelete className="mr-2 size-3" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
