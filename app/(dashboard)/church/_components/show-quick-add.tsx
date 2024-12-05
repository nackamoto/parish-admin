import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ChevronDown, LucidePlus } from "lucide-react";
import MembershipForm from "./membership-form";
import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Separator } from "@/app/components/ui/separator";

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
          <li className="hover:bg-stone-100  w-full cursor-pointer">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="w-full font-medium text-sm text-blue-800"
                  variant="outline"
                >
                  Add a new Member
                </Button>
              </SheetTrigger>
              <SheetContent className="md:max-w-4xl border-2">
                <SheetHeader className="pb-4">
                  <SheetTitle>Add Member</SheetTitle>
                  <SheetDescription>
                    Add a new member to the church database, fill in the form
                  </SheetDescription>
                </SheetHeader>
                <Separator className="mb-6" />
                <MembershipForm />
              </SheetContent>
            </Sheet>
          </li>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
