"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { MembershipformSchemaType } from "@/app/(dashboard)/church/_components/membership-form";
import {
  useGetJobTitles,
  useGetOccupationIndustries,
} from "@/app/(dashboard)/_hooks";
import { FormSelectSearch } from "@/app/components/form/searchable.select";

interface OccupationsSectionProps {
  form: UseFormReturn<MembershipformSchemaType>;
}

export function OccupationsSection({ form }: OccupationsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    name: "occupations",
  });
  const jobTitles = useGetJobTitles();
  const industries = useGetOccupationIndustries();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-4 p-3 border rounded-md bg-amber-50 relative"
        >
          <FormSelectSearch
            data={industries?.results || []}
            name={`occupations.${index}.industry`}
            label="Industry"
            description="This is the language that will be used in the dashboard."
            placeholder="Search or add title..."
            EmptyIndicator={undefined}
          />
          <FormField
            control={form.control}
            name={`occupations.${index}.institution_of_employment`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution of Employment</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSelectSearch
            data={jobTitles?.results || []}
            name={`occupations.${index}.job_title`}
            label="Job Title"
            description="This is the language that will be used in the dashboard."
            placeholder="Search or add title..."
            EmptyIndicator={undefined}
          />

          <FormField
            control={form.control}
            name={`occupations.${index}.start_date`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`occupations.${index}.end_date`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="underline text-rose-600 text-sm absolute top-0 -mt-4 right-5"
          >
            Remove
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            industry: 0,
            institution_of_employment: "",
            job_title: 0,
            start_date: "",
            end_date: "",
          })
        }
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Occupation
      </Button>
    </div>
  );
}
