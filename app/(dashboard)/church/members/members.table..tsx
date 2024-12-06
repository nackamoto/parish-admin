"use client";
import { DataTable } from "@/app/components/data-table/data-table";
import { useMemo } from "react";
import { useMembersTableColumns } from "./_components/table-columns";
import { useGetMembers } from "../../_hooks";
import { DataTableSkeleton } from "@/app/components/data-table/data-table-skeleton";
import { MembersToolbar } from "./_components/toolbar";
import { Member } from "../../_types";

export function MembersTable() {
  const memoizedTabletoolbar = useMemo(() => MembersToolbar, []);

  const membersColulmns = useMembersTableColumns();

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
          columns={membersColulmns}
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
