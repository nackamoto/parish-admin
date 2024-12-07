"use client";

import { cn } from "@/lib/utils";
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
  CommandItem,
  Command,
} from "@/app/components/ui/command";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FieldValues, useFormContext } from "react-hook-form";
import type { FormSelectSearch } from "./types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

const SearchContext = createContext<{ value: string | undefined }>({
  value: "",
});
type SearchContextProps = PropsWithChildren & {
  value: string | undefined;
};
const SearchProvider = ({ children, value }: SearchContextProps) => {
  return (
    <SearchContext.Provider value={{ value }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchValue = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchValue must be used within a SearchProvider");
  }
  return context.value;
};

export function FormSelectSearch<Tkey extends FieldValues>(
  props: FormSelectSearch<Tkey>
) {
  const { control, setValue } = useFormContext<Tkey>();
  const [searchValue, setSearchValue] = useState<string>();

  return (
    <FormField
      control={control}
      disabled={props.disabled}
      name={props.name}
      render={({ field }) => (
        <FormItem
          className={cn("flex flex-col space-y-3", props.formItemClassname)}
        >
          <FormLabel>{props.label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "flex-1 justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? props.data.find((datum) => datum.value === field.value)
                        ?.label
                    : props.selectLabel || "Select ..."}
                  <ChevronDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0 border">
              <Command>
                <CommandInput
                  placeholder={props.placeholder}
                  onValueChange={(e) => {
                    setSearchValue(e);
                  }}
                />
                <CommandList>
                  <CommandEmpty>
                    <SearchProvider value={searchValue}>
                      {props.EmptyIndicator && <props.EmptyIndicator />}
                    </SearchProvider>
                  </CommandEmpty>
                  <CommandGroup>
                    {props.data.map((datum) => (
                      <CommandItem
                        value={datum.label}
                        key={datum.value}
                        onSelect={() => {
                          setValue(props.name, datum.value as any);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2",
                            datum.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {datum.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
