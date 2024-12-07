"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { QuickAddMemberTitle } from "@/app/(dashboard)/church/_components/member-title";
import FormInputCountries from "@/app/components/form/form-country-select";
import FormPhoneInput from "@/app/components/form/form-phone-input";
import { FormSelectSearch } from "@/app/components/form/searchable.select";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";
import {
  MembershipformSchema,
  MembershipformSchemaType,
} from "@/app/(dashboard)/church/_components/membership-form";
import FormInput from "@/app/components/form/form-input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddressSection } from "./form.address-section";
import { OccupationsSection } from "./form.occupation-section";
import { useGetMemberTitles } from "@/app/(dashboard)/_hooks";
import { useMemo } from "react";

export default function MemberForm() {
  const memberTitles = useGetMemberTitles();
  const form = useForm<MembershipformSchemaType>({
    resolver: zodResolver(MembershipformSchema),
    defaultValues: {
      membership_number: "testin1",
      member_title: "",
      date_of_birth: "",
      email: "email@gmail.com",
      first_name: "peter 1",
      last_name: "last name 2",
      middle_name: "not found name",
      maiden_name: "not maiden name",
      gender: "M",
      hometown: "HO",
      marital_status: "Single",
      nationality: "GH",
      other_phone_number: "+2332987445122",
      phone_number: "+2337895552455",
      place_of_birth: "china",
      address: {
        address_line1: "",
        address_line2: "",
        city: 0,
        region: 0, // use api to get regions
        country: "",
        postal_code: "",
        digital_address: "",
      },
      occupations: [
        {
          industry: 0, // use api to get industries
          institution_of_employment: "",
          job_title: 0, // use api to get job titles
          start_date: "",
          end_date: "",
        },
      ],
    },
  });

  function onSubmit(values: MembershipformSchemaType) {
    console.log("values", values);
    console.log(values);
    console.log("errors", form.formState.errors);
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl border py-4 rounded-md">
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
            <Accordion
              type="multiple"
              // value={openSections}
              // onValueChange={setOpenSections}
            >
              <AccordionItem value="address">
                <AccordionTrigger>Address</AccordionTrigger>
                <AccordionContent>
                  <AddressSection form={form} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="occupations">
                <AccordionTrigger>Occupations</AccordionTrigger>
                <AccordionContent>
                  <OccupationsSection form={form} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="col-span-full mt-6">
            <Button
              type="submit"
              // onClick={() => {
              //   console.log("errors", form.formState.errors);
              //   console.log("values", form.getValues());
              // }}
              size={`lg`}
              className="w-full sm:w-auto"
              // disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
