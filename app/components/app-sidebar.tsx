"use client";

import * as React from "react";
import { LucideChurch, LucideLayoutDashboard } from "lucide-react";

import { NavMain } from "@/app/components/nav-main";
import { NavUser } from "@/app/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/app/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LucideLayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/",
        },
        {
          title: "Settings",
          url: "/settings/account",
        },
      ],
    },
    // {
    //   title: "Users",
    //   url: "/users",
    //   icon: LucideUsers2,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Add User",
    //       url: "/users/add-user",
    //     },
    //   ],
    // },
    {
      title: "Church",
      url: "/church",
      icon: LucideChurch,
      isActive: true,
      items: [
        {
          title: "Members",
          url: "/church/members",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
