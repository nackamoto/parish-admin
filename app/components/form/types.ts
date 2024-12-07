import { ForwardRefExoticComponent } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

export interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: React.ReactNode;
  type?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  formItemClassname?: string;
}
export interface FormTextareaProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  formItemClassname?: string;
}
export interface FormRadioGroupProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  id?: string;
  className?: string;
  radios?: Array<{ label: string; value: string }>;
  orientation?: "horizontal" | "vertical" | undefined;
}
export interface FormSelectSearch<T extends FieldValues> {
  name: FieldPath<T>;
  label: React.ReactNode;
  type?: string;
  id?: string;
  selectLabel?: string;
  placeholder?: string;
  EmptyIndicator?: ForwardRefExoticComponent<any>;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  formItemClassname?: string;
  description?: string;
  data: { label: string; value: string | number }[];
}
