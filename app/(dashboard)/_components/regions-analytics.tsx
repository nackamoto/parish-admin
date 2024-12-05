import {
  CheckCircle,
  ChevronDown,
  Circle,
  LocateFixedIcon,
} from "lucide-react";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Separator } from "@/app/components/ui/separator";
import { Input } from "@/app/components/ui/input";

export function ShowRegionStats() {
  return (
    <Card className="rounded-md">
      <CardHeader className="grid grid-cols-[1fr_210px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>Create Region</CardTitle>
          <CardDescription>
            <p>Enter the name of the region you want to create</p>
            <span className="flex items-center space-x-2">
              <Input placeholder="Region Name" className="w-1/2" />
              <Button size={`default`}>Save</Button>
            </span>
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-3 shadow-none">
            <CheckCircle />
            Region
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 shadow-none">
                <ChevronDown className="text-secondary-foreground" />
                <p>Add</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Region
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Church</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Group</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            Regions
          </div>
          <div className="flex items-center">
            <LocateFixedIcon className="mr-1 h-3 w-3" />
            20
          </div>
          <div>There are 20 Regions here</div>
        </div>

        <p className="text-sm font-bold text-blue-500 underline">
          Manage All Regions
        </p>
      </CardContent>
    </Card>
  );
}
