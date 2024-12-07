"use client";
import { FieldValues, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import { cn } from "@/lib/utils";
import { FormInputProps } from "@/app/components/form/types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  Command,
} from "@/app/components/ui/command";
import { ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useMemo } from "react";
import {
  countries,
  CountrySelectOption,
  FlagComponent,
} from "../common/phone-input";

export default function FormInputCountries<T extends FieldValues>(
  props: FormInputProps<T>
) {
  const memoizedCountries = useMemo(() => countries, []);

  const { control, setValue } = useFormContext();
  return (
    <FormField
      control={control}
      disabled={props.disabled}
      name={props.name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-col gap-1",
            !field.value && "text-muted-foreground"
          )}
        >
          <FormLabel className="">{props.label}</FormLabel>
          <FormControl className="placeholder-zinc-500">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  // className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10"
                  disabled={false}
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <FlagComponent
                    country={field.value}
                    countryName={field.value}
                  />
                  {field.value
                    ? memoizedCountries.find(
                        (datum) => datum.value === field.value
                      )?.label
                    : props.placeholder || "Select ..."}
                  <ChevronDown
                    className={cn(
                      "-mr-2 size-4 opacity-50",
                      props.disabled ? "hidden" : "opacity-100"
                    )}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <ScrollArea className="h-72">
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {memoizedCountries.map(({ value, label }) =>
                          value ? (
                            <CountrySelectOption
                              key={value}
                              country={value}
                              countryName={label}
                              selectedCountry={field.value}
                              onChange={(country) => {
                                setValue(props.name, country as any);
                              }}
                            />
                          ) : null
                        )}
                      </CommandGroup>
                    </ScrollArea>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
