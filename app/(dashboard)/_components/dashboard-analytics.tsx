"use client";

import { Users, Church } from "lucide-react";
import { useGetMembers, useGetUsers } from "../_hooks";
import {
  AnalyticsCard,
  AnalyticsCardDataType,
  ShowAnalytics,
} from "./show-analytics";
import Link from "next/link";

const analyticsData: AnalyticsCardDataType[] = [
  {
    Icon: Users,
    title: "New Users",
    value: 300,
    statistics: <span>+5% from last week</span>,
    action: <button>View Details</button>,
  },
  {
    Icon: Users,
    title: "New Members",
    value: 300,
    statistics: <span>+5% from last week</span>,
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
    Icon: Church,
    title: "Total Churches",
    value: 1500,
    statistics: <span>+10% from last month</span>,
    action: (
      <Link className="text-sm text-blue-400 underline" href={`#`}>
        View Details
      </Link>
    ),
  },
];

export function DashboardAnalytics() {
  const users = useGetUsers();
  const members = useGetMembers();

  const extendDefault = [
    ...analyticsData,
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
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 p-3">
      <ShowAnalytics
        data={extendDefault}
        render={(data) => <AnalyticsCard key={data.title} {...data} />}
      />
    </section>
  );
}
