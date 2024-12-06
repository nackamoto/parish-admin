"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import { churchCreateMember } from "../_actions.church";
import { useToast } from "@/hooks/use-toast";
import FieldErrorsCard from "@/app/components/dialog/list.errors";
import { useGetMembers, useGetMemberTitles } from "../../_hooks";
import { FormSelectSearch } from "@/app/components/form/searchable.select";
import FormInput from "@/app/components/form/form-input";
import { QuickAddMemberTitle } from "./member-title";
import FormPhoneInput from "@/app/components/form/form-phone-input";
import FormInputCountries from "@/app/components/form/form-country-select";

export default function MembershipForm() {
  const members = useGetMembers();
  const memberTitles = useGetMemberTitles();

  const form = useForm<MembershipformSchemaType>({
    resolver: zodResolver(MembershipformSchema),
    defaultValues: {
      membership_number: "",
      member_title: "",
      create_user: false,
      date_of_birth: "",
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      maiden_name: "",
      gender: "M",
      hometown: "",
      marital_status: "Single",
      nationality: "GH",
      other_phone_number: "",
      phone_number: "",
      place_of_birth: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(values: MembershipformSchemaType) {
    const response = await churchCreateMember(values);
    if (response?.success) {
      toast({
        description: response?.message,
      });
      form.reset();
      members.refetch();
    } else {
      toast({
        description: <FieldErrorsCard errors={response?.data} />,
      });
    }
  }

  const cacheMemberTitles = useMemo(() => {
    if (memberTitles?.data) {
      return memberTitles?.data?.data?.results.map((item) => ({
        label: item.name,
        value: item.name,
      }));
    }
    return [];
  }, [memberTitles?.data]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <FormInput
            name="membership_number"
            label="Membership No."
            placeholder="Provide membership no."
          />
          <FormSelectSearch
            data={cacheMemberTitles}
            name="member_title"
            label="Title"
            formItemClassname="mt-1.5"
            description="This is the language that will be used in the dashboard."
            placeholder="Search or add title..."
            EmptyIndicator={QuickAddMemberTitle}
          />
          <FormField
            control={form.control}
            name="create_user"
            render={({ field }) => (
              <FormItem className="col-span-full sm:col-span-2 lg:col-span-3 flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Create User</FormLabel>
                  <FormDescription>
                    Create a user account for this member
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormInput
            name="date_of_birth"
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
            type="date"
          />
          <FormInput
            name="email"
            label="Email"
            placeholder="Email address"
            type="email"
          />
          <FormInput
            name="first_name"
            label="First Name"
            placeholder="First name"
          />
          <FormInput
            name="last_name"
            label="Last Name"
            placeholder="Last name"
          />
          <FormInput
            name="middle_name"
            label="Middle Name"
            placeholder="Middle name"
          />
          <FormInput
            name="maiden_name"
            label="Maiden Name"
            placeholder="Maiden name"
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormInput name="hometown" label="Hometown" placeholder="Hometown" />
          <FormField
            control={form.control}
            name="marital_status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Marital Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Separated">Separated</SelectItem>
                    <SelectItem value="Widower">Widower</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormInputCountries
            name="nationality"
            label="Nationality"
            placeholder="Select country"
          />
          <FormPhoneInput
            name="other_phone_number"
            label="Other Phone Number"
            placeholder="Other phone number"
          />
          <FormPhoneInput
            name="phone_number"
            label="Phone Number"
            placeholder="Phone number"
          />
          <FormInput
            name="place_of_birth"
            label="Place of Birth"
            placeholder="Place of birth"
          />
          <div className="col-span-full mt-6">
            <Button
              type="submit"
              size={`lg`}
              className="w-full sm:w-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export const MembershipformSchema = z.object({
  membership_number: z.string().min(1, "Membership number is required"),
  member_title: z.string().min(1, "Title is required"),
  create_user: z.boolean(),
  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  middle_name: z.string().optional(),
  maiden_name: z.string().optional(),
  gender: z.enum(["M", "F"], {
    required_error: "Please select a gender",
  }),
  hometown: z.string().min(1, "Hometown is required"),
  marital_status: z.string().min(1, "Marital status is required"),
  nationality: z.string().min(1, "Nationality is required"),
  other_phone_number: z.string().optional(),
  phone_number: z.string().min(1, "Phone number is required"),
  place_of_birth: z.string().min(1, "Place of birth is required"),
});
export type MembershipformSchemaType = z.infer<typeof MembershipformSchema>;
