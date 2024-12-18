"use client";

import Link from "next/link";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../../../components/form/form-input";
import { Form } from "../../../components/ui/form";
import { authForgotPassword } from "../../_actions";
import { ToastAlert } from "@/app/components/dialog/alert";
import { useState } from "react";
import { Switch } from "@/app/components/ui/switch";
import { Loader2 } from "lucide-react";
import FormPhoneInput from "@/app/components/form/form-phone-input";

export function ForgotPassword() {
  const form = useForm<UseHereOnly>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email_or_phone_number: "",
    },
  });

  const [authResponse, setResponse] = useState<{
    success: boolean;
    message: string;
  }>();

  const [phoneMode, setMode] = useState<boolean>(true);

  const handleForgotPassword = async (data: UseHereOnly) => {
    const response = await authForgotPassword(data);
    setResponse(response);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleForgotPassword)}>
        <Card className="mx-auto min-w-96 p-2">
          {authResponse && (
            <DisplayLoginStatus
              success={authResponse.success}
              message={authResponse.message}
            />
          )}
          <CardHeader>
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <CardDescription>
              Enter phone number or email to receive OTP
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <section className="grid grid-cols-2 mb-8">
                  <p className="text-sm text-neutral-700">Send me OTP via </p>
                  <div className="flex items-center space-x-2 ">
                    <Label htmlFor="airplane-mode">Email</Label>
                    <Switch
                      checked={phoneMode}
                      id="airplane-mode"
                      onCheckedChange={(e) => {
                        setMode(e);
                      }}
                    />
                    <Label htmlFor="airplane-mode">SMS</Label>
                  </div>
                </section>
                {phoneMode ? (
                  <FormPhoneInput
                    name="email_or_phone_number"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <FormInput
                    name="email_or_phone_number"
                    label="Email"
                    placeholder="Enter your email"
                  />
                )}
              </div>
              <Button
                type="submit"
                className="w-full flex items-center space-x-2 disabled:opacity-50"
                disabled={form.formState.isSubmitting}
              >
                Send me OTP
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {`Remembered password ? `}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

function DisplayLoginStatus({
  success,
  message,
}: {
  success: boolean;
  message: string;
}) {
  if (success) {
    return (
      <ToastAlert
        title={`Signin successful`}
        variant={"default"}
        description={message}
      />
    );
  }
  return (
    <ToastAlert
      title={`Signin failed`}
      variant={"default"}
      description={message}
    />
  );
}

export const ForgotPasswordSchema = z.object({
  email_or_phone_number: z
    .string({
      invalid_type_error: "Phone or email is invalid",
      required_error: "Phone or email is required",
    })
    .min(1, { message: "Phone or email is required" }),
});
type UseHereOnly = z.infer<typeof ForgotPasswordSchema>;
export type ForgotPasswordSchemaType = {
  email_or_phone_number?: string;
};
