import { FieldValues, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

import { Input } from "@/app/components/ui/input";
import { cn } from "@/lib/utils";
import { FormInputProps } from "@/app/components/form/types";

export default function FormInput<T extends FieldValues>(
  props: FormInputProps<T>
) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      disabled={props.disabled}
      name={props.name}
      render={({ field }) => (
        <FormItem className={props.formItemClassname}>
          <FormLabel className="">{props.label}</FormLabel>
          <FormControl className="placeholder-zinc-500">
            <Input
              className={cn("rounded-md", props.className || "")}
              {...props}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
