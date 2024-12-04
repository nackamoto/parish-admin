// import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  alertVariants,
} from "@/app/components/ui/alert";
import { VariantProps } from "class-variance-authority";
import { LucideTriangleAlert } from "lucide-react";

interface ComponentProps {
  variant?: VariantProps<typeof alertVariants>["variant"];
  description?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function ToastAlert({
  variant = "default",
  description = "This is a default alert",
  icon = <LucideTriangleAlert className="h-4 w-4" />,
  title = "Default Alert",
  titleClassName,
  descriptionClassName,
}: ComponentProps) {
  return (
    <Alert variant={variant}>
      {icon}
      <AlertTitle className={titleClassName}>{title}</AlertTitle>
      <AlertDescription className={descriptionClassName}>
        {description}
      </AlertDescription>
    </Alert>
  );
}
