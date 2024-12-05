import { ReactNode } from "react";
import { Separator } from "../ui/separator";

export const SheetContentWrapper = (props: ComponentProps) => {
  return (
    <div className="min-h-[100vh] flex-1 space-y-4">
      <header className="w-full flex flex-col">
        <div className="flex items-center justify-between">
          <span className="gap-2 pb-2">
            <h1 className="text-2xl font-bold">{props.title}</h1>
            <p className="text-sm text-gray-700">{props.description}</p>
          </span>
        </div>
        <Separator />
      </header>
      {props.form}
    </div>
  );
};

type ComponentProps = {
  title: string;
  description: string;
  form?: ReactNode;
};
