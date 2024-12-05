import { Input } from "@/app/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";
import { forwardRef } from "react";
import { Button } from "@/app/components/ui/button";
import { ExtendDataTableProps } from "@/app/components/data-table/types";
import { DialogModal } from "@/app/components/dialog/dialog-modal";

export interface MembersToolbarProps<TData>
  extends ExtendDataTableProps<TData> {
  //   table: Table<TData>;
}

export type MembersTableMethods = {};

export const MembersToolbar = forwardRef<
  MembersTableMethods,
  MembersToolbarProps<any>
>(function MembersToolbar<TData>({ table }: MembersToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <section className="w-full bg-_gray-200 mt-4 p-1 flex justify-start items-center">
      {/* Toolbar */}
      <aside className="flex space-x-6 items-center w-full ">
        <Input
          type="text"
          placeholder="Search members"
          value={
            (table.getColumn("full_name")?.getFilterValue() as string) ?? ""
          }
          className="w-1/5 rounded-md bg-white"
          onChange={(event) => {
            table.getColumn("full_name")?.setFilterValue(event.target.value);
          }}
        />
        {isFiltered && (
          <Button
            className="border"
            variant={`ghost`}
            onClick={() => {
              table.resetColumnFilters();
            }}
          >
            Clear
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </aside>
    </section>
  );
});
