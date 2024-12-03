"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LoaderIcon,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { authSignOut } from "@/app/(auth)/_actions";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data } = useSession();

  const [isLoggingOut, startLogoutTransition] = useTransition();

  function handleLogout() {
    startLogoutTransition(async () => {
      await authSignOut();
    });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={`https://github.com/shadcn.png`}
                  alt={data?.user.user.full_name}
                />
                <AvatarFallback className="rounded-lg font-bold">{`${data?.user?.user?.first_name[0].toLocaleUpperCase()}${data?.user?.user?.last_name[0].toLocaleUpperCase()}`}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {data?.user?.user?.first_name}
                </span>
                <span className="truncate text-xs">
                  {data?.user?.user.phone_number || `Add phone number`}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={`https://github.com/shadcn.png`}
                    alt={data?.user.user.full_name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data?.user?.user?.full_name}
                  </span>
                  <span className="truncate text-xs">
                    {data?.user?.user?.phone_number || `Add phone number`}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup></DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={isLoggingOut} onClick={handleLogout}>
              {isLoggingOut ? <LoaderIcon size={16} /> : <LogOut />}
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
