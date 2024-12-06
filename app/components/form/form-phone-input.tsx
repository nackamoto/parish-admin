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
import { PhoneInput } from "../common/phone-input";

export default function FormPhoneInput<T extends FieldValues>(
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
            <PhoneInput
              defaultCountry="GH"
              defaultChecked
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
