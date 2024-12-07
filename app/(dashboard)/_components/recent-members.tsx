"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { useGetMembers } from "../_hooks";
import { formatDate } from "@/lib/utils";

export function RecentMembers() {
  const query = useGetMembers();
  let members;
  if (query.isFetched) {
    members = query.data?.data.results.slice(0, 5);
  }
  return (
    <div className="space-y-8">
      {members?.map((member) => (
        <div className="flex items-center" key={member.user}>
          <Avatar className="h-9 w-9 border-2">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{member.middle_name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {member.full_name}
            </p>
            <p className="text-sm text-muted-foreground">{member.email}</p>
          </div>
          <div className="ml-auto text-sm text-neutral-700">
            Created at{" "}
            <b className="text-blue-500 tracking-tighter">
              {formatDate(member.created_at)}
            </b>
          </div>
        </div>
      ))}
    </div>
  );
}
