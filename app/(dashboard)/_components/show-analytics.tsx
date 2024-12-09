"use client";
// import { Users, Church } from "lucide-react";
import { ExoticComponent, ReactNode } from "react";

type ShowAnalyticsProps<TData> = {
  data: TData[];
  render: (data: TData) => React.ReactNode;
};

export function ShowAnalytics<TData>(props: ShowAnalyticsProps<TData>) {
  return props.data.map((data) => props.render(data));
}

export type AnalyticsCardDataType = {
  Icon?: ExoticComponent;
  title: string;
  value: number | undefined;
  statistics?: ReactNode | undefined;
  action?: ReactNode;
};

export function AnalyticsCard({
  title,
  Icon,
  value,
  statistics,
  action,
}: AnalyticsCardDataType) {
  return (
    <div className="flex flex-col space-y-5 rounded-lg bg-zinc-100 p-3 border">
      <div className="flex flex-col">
        <span className="flex items-center justify-between">
          <p className="text-xl font-bold text-neutral-600">{title}</p>
          {Icon && <Icon />}
        </span>
        <h1 className="text-4xl font-bold">{value}</h1>
      </div>
      <span className="flex justify-between">
        {statistics}
        {action}
      </span>
    </div>
  );
}
