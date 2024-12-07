"use client";
import { useGetCities, useGetRegions } from "@/app/(dashboard)/_hooks";
import { MembershipformSchemaType } from "@/app/(dashboard)/church/_components/membership-form";
import FormInputCountries from "@/app/components/form/form-country-select";
import { FormSelectSearch } from "@/app/components/form/searchable.select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface AddressSectionProps {
  form: UseFormReturn<MembershipformSchemaType>;
}

export function AddressSection({ form }: AddressSectionProps) {
  const regions = useGetRegions();
  const cities = useGetCities();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 border p-2 rounded-md bg-amber-50">
      <FormField
        control={form.control}
        name="address.address_line1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address Line 1</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address.address_line2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address Line 2</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormSelectSearch
        data={cities?.results || []}
        name="address.city"
        label="City"
        description="This is the language that will be used in the dashboard."
        placeholder="Search or add title..."
        EmptyIndicator={undefined}
      />
      <FormSelectSearch
        data={regions?.results || []}
        name="address.region"
        label="Region"
        description="This is the language that will be used in the dashboard."
        placeholder="Search or add title..."
        EmptyIndicator={undefined}
      />

      <FormInputCountries
        name="address.country"
        label="Country"
        placeholder="Select country"
      />
      <FormField
        control={form.control}
        name="address.postal_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal Code</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address.digital_address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Digital Address</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
