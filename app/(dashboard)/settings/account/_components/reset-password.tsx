"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/ui/form";
import FormPasswordInput from "@/app/components/form/form-password-input";
import { userResetPassword } from "@/app/(dashboard)/settings/_actions";
import { useToast } from "@/hooks/use-toast";
// import ToastAuthStatus from "../../_components/toast-alert";

export function AccountResetPassword() {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(data: ResetPasswordSchemaType) {
    const response = await userResetPassword(data);
    if (response) {
      toast({
        title: "Password Reset",
        description: response.message,
        "aria-label": "Password Reset",
        variant: response.success ? "success" : "destructive",
      });
      if (response.success) {
        form.reset();
      }
    }
  }

  return (
    <div className="flex flex-col space-y-5">
      <header className="gap-2">
        <h1 className="text-xl font-semibold">Reset Password</h1>
        <p className="text-sm text-zinc-500">
          Enter your new password to reset your account password
        </p>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormPasswordInput
            label="Old Password"
            type="password"
            name="old_password"
          />
          <FormPasswordInput
            label="New Password"
            type="password"
            name="new_password"
          />
          <FormPasswordInput
            label="Confirm New Password"
            type="password"
            name="confirm_password"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
}

export const ResetPasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()"])[A-Za-z\d@$!%*?&()"]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
