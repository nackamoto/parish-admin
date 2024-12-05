"use client";

import { Member } from "@/app/(dashboard)/_types";
import { DataTableColumnHeader } from "@/app/components/data-table/data-table-column-header";
import { SideDrawer } from "@/app/components/dialog/side-drawer";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "lucide-react";

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
      return <div className="text-ellipsis">{`${row.original.email}`}</div>;
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
        <>
          <div className="flex space-x-2 items-center justify-end">
            {/* <SideDrawer
              noHeader
              hasTrigger
              side={`right`}
              SheetContent={<ViewPatientDetails />}
              className="md:max-w-4xl border-2 border-_p-ocean-green rounded-l-xl"
              SheetTrigger={<AppEditIcon onClick={undefined} />}
            />
            <AppDeleteIcon onClick={undefined} /> */}
          </div>
        </>
      );
    },
  },
];
