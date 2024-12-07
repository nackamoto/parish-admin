import { Separator } from "@/app/components/ui/separator";
import { SidebarTrigger } from "@/app/components/ui/sidebar";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnalyticsOverview } from "./_components/analytics-chart";
import { RecentMembers } from "./_components/recent-members";
import { DashboardAnalytics } from "./_components/dashboard-analytics";

export default async function Page() {
  const session = await auth();

  return (
    <main className="flex-1 bg-zinc-50 min-h-[100vh] flex flex-col">
      <header className="w-full flex flex-col">
        <div className="flex items-center justify-between p-4">
          <span className="gap-2">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-400">
              Welcome back,{" "}
              <strong className="text-blue-500 text-md">
                {session?.user?.user?.full_name}
              </strong>
            </p>
          </span>
          <SidebarTrigger />
        </div>
        <Separator />
        <DashboardAnalytics />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 p-3 flex-1">
          <Card className="col-span-4 rounded-md">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <AnalyticsOverview />
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-3 rounded-md">
            <CardHeader>
              <CardTitle>Recent Members</CardTitle>
              <CardDescription>
                Showing all top 10 recent members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentMembers />
            </CardContent>
          </Card>
        </div>
        {/* <div className="grid gap-4 md:grid-cols-2 p-3">
          <ShowRegionStats />
          <ShowRegionStats />
        </div> */}
      </header>
    </main>
  );
}
