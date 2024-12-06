"use client";

import { Button } from "@/app/components/ui/button";
import { LucideLoader2 } from "lucide-react";
import { useTransition } from "react";
import { churchCreateMemberTitle } from "../_actions.church";
import { useToast } from "@/hooks/use-toast";
import FieldErrorsCard from "@/app/components/dialog/list.errors";
import { useSearchValue } from "@/app/components/form/searchable.select";

import React, { forwardRef } from "react";
import { useGetMemberTitles } from "../../_hooks";

export const QuickAddMemberTitle = forwardRef<HTMLDivElement>((props, ref) => {
  const [isCreating, startToCreate] = useTransition();
  const { toast } = useToast();
  const name = useSearchValue();
  const memberTitles = useGetMemberTitles();

  async function createMemberTitle(name: string) {
    startToCreate(async () => {
      const response = await churchCreateMemberTitle({ name });
      if (response?.success) {
        toast({
          description: response.message,
        });
        memberTitles.refetch();
      }
      if (!response?.success) {
        toast({
          title: response?.message,
          description: (
            <FieldErrorsCard errors={response?.data} key={response?.message} />
          ),
        });
      }
    });
  }

  if (name || name !== "") {
    return (
      <div ref={ref} className="flex-1 space-y-3">
        <p>
          <u className="text-sm font-semibold text-blue-500">{name}</u> is not
          found
        </p>
        <Button
          disabled={isCreating}
          variant={`outline`}
          size={`sm`}
          aria-label="quick-add"
          onClick={() => createMemberTitle(name!)}
        >
          {isCreating ? (
            <div className="flex items-center space-x-1.5">
              <p className="text-sm">Creating</p>
              <LucideLoader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            `Create now`
          )}
        </Button>
      </div>
    );
  }

  return null;
});

QuickAddMemberTitle.displayName = "QuickAddMemberTitle";

export type MemberTitle = {
  name: string;
  description?: string;
};
