import { Separator } from "@/app/components/ui/separator";
import { SidebarTrigger } from "@/app/components/ui/sidebar";
import { HeaderShowQuickAdd } from "../_components/show-quick-add";

export default async function ChurchMembersPage() {
  return (
    <main className="flex-1 bg-zinc-50 min-h-[100vh] flex flex-col">
      <header className="w-full flex flex-col">
        <div className="flex items-center justify-between p-4">
          <span className="gap-2">
            <h1 className="text-2xl font-bold">Manage members</h1>
            <p className="text-sm text-gray-700">
              Manage all members and keep your member database up-to-date.
            </p>
          </span>
          <div className="flex items-center space-x-4">
            {/* Add members control here */}
            <HeaderShowQuickAdd />
            <span className="flex items-center space-x-1">
              <Separator orientation="vertical" className="h-[20px]" />
              <SidebarTrigger />
            </span>
          </div>
        </div>
        <Separator />
      </header>
    </main>
  );
}
