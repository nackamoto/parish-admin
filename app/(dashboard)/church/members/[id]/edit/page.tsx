import { UserServices } from "@/app/(dashboard)/_services";
import { Member, MembersResponse } from "@/app/(dashboard)/_types";
import { query } from "@/app/_axios";
import { Separator } from "@/app/components/ui/separator";
import { SidebarTrigger } from "@/app/components/ui/sidebar";
import type { PageProps } from "@/.next/types/app/layout";

export default async function EditMember({ params }: PageProps) {
  const { id } = await params;

  const response = await query<MembersResponse>(UserServices.GetMember(id));
  if (!response.data.hasOwnProperty("id")) return <>Loading...</>;

  const member = response.data as unknown as Member;
  return (
    <main className="flex-1 bg-zinc-50 min-h-[100vh] flex flex-col">
      <header className="w-full flex flex-col">
        <div className="flex items-center justify-between p-4">
          <span className="gap-2">
            <h1 className="text-2xl font-bold">{member.full_name}</h1>
            <p className="text-base text-gray-400">
              Editing,{" "}
              <strong className="text-blue-500 text-md">
                {member.full_name}
              </strong>
            </p>
          </span>
          <SidebarTrigger />
        </div>
        <Separator />
      </header>
    </main>
  );
}
