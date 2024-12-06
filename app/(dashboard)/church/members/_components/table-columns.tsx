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
import {
  Edit3,
  EyeIcon,
  LucideDelete,
  LucideLoader2,
  LucideView,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { MutableRefObject, RefObject, useRef, useTransition } from "react";
import {
  SideDrawer,
  SideDrawerMethods,
} from "@/app/components/dialog/side-drawer";
import MembershipForm from "../../_components/membership-form";
import { ViewUserDetails } from "./user-details";
import { Separator } from "@/app/components/ui/separator";
import { churchDeleteMember } from "../../_actions.church";
import { ChurchServices } from "../../_services.church";
import { useToast } from "@/hooks/use-toast";
import { useGetMembers } from "@/app/(dashboard)/_hooks";
import { usePathname, useRouter } from "next/navigation";
import { encrypt } from "@/lib/utils";

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

export const useMembersTableColumns = () => {
  const [isDeletePending, startDeleting] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const members = useGetMembers();

  async function deleteMember(id: string) {
    startDeleting(async () => {
      const response = await churchDeleteMember(id);
      toast({
        description: response?.message,
      });
      if (response?.success) {
        members.refetch();
      }
    });
  }

  const UserActions = (user: Member) => {
    return (
      <main className="w-full py-2 ">
        <Separator />
        <div className="flex items-center flex-1 py-2 space-x-3 justify-end mt-5">
          <Button variant="destructive" onClick={() => deleteMember(user.id)}>
            {isDeletePending ? (
              <LucideLoader2 className="mr-2 size-3 animate-spin" />
            ) : (
              <LucideDelete className="mr-2 size-3" />
            )}

            {isDeletePending ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              router.push(`${pathname}/${user.id}/edit`);
            }}
          >
            <Edit3 className="mr-2 size-3" />
            Edit
          </Button>
        </div>
      </main>
    );
  };

  const MembersTableColumns: ColumnDef<Member>[] = [
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
          <div className="text-ellipsis">{`${
            row.original.email || "N/A"
          }`}</div>
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
      cell: function Cell({ row }) {
        return (
          <div className="flex justify-center">
            <SideDrawer
              hasTrigger
              onClickOutside={() => {}}
              SheetTrigger={
                <button aria-label="Open menu" className="flex items-center">
                  <EyeIcon className="mr-2 size-3" />
                  View
                </button>
              }
              SheetClose={<UserActions {...row.original} />}
              noHeader
              side={`right`}
              SheetContent={<ViewUserDetails {...row.original} />}
              className="md:max-w-xl"
            />
          </div>
        );
      },
    },
  ];

  return MembersTableColumns;
};
