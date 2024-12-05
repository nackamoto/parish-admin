"use client";
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
import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cx } from "class-variance-authority";

export default function FormPasswordInput<T extends FieldValues>(
  props: FormInputProps<T>
) {
  const { control } = useFormContext();
  const [visible, setVisible] = useState(false);

  const Visibility = useMemo(() => {
    if (visible) {
      return (
        <>
          <EyeOff
            className="h-5 w-5 text-neutral-600 absolute right-3 ml-4 -mt-8"
            onClick={() => setVisible(false)}
          />
          <span className="sr-only">Hide password</span>
        </>
      );
    }
    return (
      <>
        <Eye
          className="h-5 w-5 text-neutral-600 absolute right-3 ml-4 -mt-8"
          onClick={() => setVisible(true)}
        />
        <span className="sr-only">Show password</span>
      </>
    );
  }, [visible]);

  return (
    <FormField
      control={control}
      disabled={props.disabled}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cx(``, props.formItemClassname)}>
          <FormLabel className="">{props.label}</FormLabel>
          <FormControl className="placeholder-zinc-500">
            <div className="relative">
              <Input
                className={cn("h-12 rounded-md", props.className || "")}
                {...props}
                {...field}
                type={visible ? "text" : "password"}
              />
              {Visibility}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
