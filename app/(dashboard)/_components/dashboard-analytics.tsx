"use client";

import { Users } from "lucide-react";
import { useGetMembers, useGetUsers } from "../_hooks";
import { AnalyticsCard, ShowAnalytics } from "./show-analytics";
import Link from "next/link";
import { useCallback } from "react";

export function DashboardAnalytics() {
  const users = useGetUsers();
  const members = useGetMembers();

  const getMembersToday = useCallback(() => {
    if (true) {
      const now = new Date().toLocaleDateString();
      const createdToday = members.data?.data?.results?.filter((member) => {
        const toLocaleDateString = new Date(
          member.created_at
        ).toLocaleDateString();
        const isCreatedToday = now === toLocaleDateString;
        if (isCreatedToday) {
          return member;
        }
      });
      return createdToday;
    }
  }, [members.data?.data.results]);

  const extendDefault = [
    {
      Icon: Users,
      title: "New Members",
      value: getMembersToday()?.length || 0,
      statistics: <span>+5% from last week</span>,
      // action: <button>View Details</button>,
    },
    {
      Icon: Users,
      title: "Total Users",
      value: users.data?.count,
      statistics: <span>+10% from last month</span>,
      action: (
        <Link
          className="text-sm text-blue-400 underline"
          href={`/church/members`}
        >
          View Details
        </Link>
      ),
    },
    {
      Icon: Users,
      title: "Total Members",
      value: members?.data?.data?.count,
      statistics: <span>+10% from last month</span>,
      action: (
        <Link
          className="text-sm text-blue-400 underline"
          href={`/church/members`}
        >
          View Details
        </Link>
      ),
    },
  ];
  return (
    <section className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 p-3">
      <ShowAnalytics
        data={extendDefault}
        render={(data) => <AnalyticsCard key={data.title} {...data} />}
      />
    </section>
  );
}
