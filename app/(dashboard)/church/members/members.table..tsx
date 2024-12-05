"use client";
import { DataTable } from "@/app/components/data-table/data-table";
import { useMemo } from "react";
import { MembersTableColumns } from "./_components/table-columns";
import { useGetMembers } from "../../_hooks";
import { DataTableSkeleton } from "@/app/components/data-table/data-table-skeleton";
import { MembersToolbar } from "./_components/toolbar";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { SideDrawer } from "@/app/components/dialog/side-drawer";
import MembershipForm from "../_components/membership-form";

export function MembersTable() {
  const memoizedTableColumns = useMemo(() => MembersTableColumns, []);
  const memoizedTabletoolbar = useMemo(() => MembersToolbar, []);

  const members = useGetMembers();

  let data;
  if (!members.isLoading) {
    data = members.data?.data.results;
  }

  return (
    <>
      {members?.isLoading ? (
        <DataTableSkeleton
          columnCount={5}
          searchableColumnCount={1}
          filterableColumnCount={2}
          cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
          shrinkZero
        />
      ) : (
        <DataTable
          columns={memoizedTableColumns}
          Toolbar={memoizedTabletoolbar}
          data={data || []}
          count={0}
          limit={10}
          onRowClick={(e) => {
            console.log(e.original);
          }}
        />
      )}
    </>
  );
}
