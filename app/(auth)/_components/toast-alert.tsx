import { ToastAlert } from "@/components/dialog/alert";
import { alertVariants } from "@/components/ui/alert";
import { VariantProps } from "class-variance-authority";

type ToastAuthStatusProps = {
  success: boolean;
  message: string;
  title: string;
  variant: VariantProps<typeof alertVariants>["variant"];
};

export default function ToastAuthStatus(props: ToastAuthStatusProps) {
  return (
    <ToastAlert
      title={props.title}
      variant={props.variant}
      description={props.message}
    />
  );
}
