import { SheetContentWrapper } from "@/app/components/dialog/content.wrapper";
import { SideDrawer } from "@/app/components/dialog/side-drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ChevronDown, LucidePlus } from "lucide-react";
import MembershipForm from "./membership-form";
import { Button } from "@/app/components/ui/button";

export const HeaderShowQuickAdd = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="px-2 shadow-none space-x-2 border border-stone-50"
        >
          <LucidePlus className="text-secondary-foreground" />
          <ChevronDown className="text-secondary-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-5}
        className="w-[200px] rounded-xl"
        forceMount
      >
        <ul className="flex flex-col space-y-2">
          <li className="hover:bg-stone-100 px-2 w-full cursor-pointer">
            <SideDrawer
              noHeader
              SheetTitle="Add Member"
              SheetDescription="Add a new member to the church"
              hasTrigger
              side={`right`}
              SheetContent={
                <SheetContentWrapper
                  title="Add member"
                  description="Add a new member to the church"
                  form={<MembershipForm />}
                />
              }
              className="md:max-w-4xl border-2"
              SheetTrigger={<div className="w-full">Member</div>}
            />
          </li>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
