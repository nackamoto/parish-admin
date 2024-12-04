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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { useSearchParams } from "next/navigation";
import ToastAuthStatus from "../../_components/toast-alert";
import { decrypt } from "@/lib/utils";
import { OTPTimer } from "./otp-timer";
import { authVerifyOTP } from "../../_actions";
import { LucideLoader } from "lucide-react";

export function VerifyOTPForm() {
  const queryParams = useSearchParams();

  const form = useForm<VerifyOTPType>({
    resolver: zodResolver(VerifyOTP),
    defaultValues: {
      phone_number: "",
      otp: "",
    },
  });

  const [authResponse, setResponse] = useState<{
    success: boolean;
    message: string;
  }>();

  const uid = queryParams.get("uid");
  const tid = queryParams.get("tid");
  const resend = Boolean(queryParams.get("resend"));

  const parseUid = uid?.replace(/ /g, "+").toString();
  const parseTid = tid?.replace(/ /g, "+").toString();

  const decryptedUid = decrypt(parseUid);
  const decryptedTid = decrypt(parseTid);

  const handleSubmit = async (data: VerifyOTPType) => {
    const response = await authVerifyOTP(data);
    setResponse(response);
  };

  useEffect(() => {
    if (decryptedUid) {
      form.setValue("phone_number", decryptedUid);
    }
  }, [decryptedUid, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="mx-auto min-w-96 p-2">
          {resend && (
            <ToastAuthStatus
              success={resend}
              message={`A new OTP has been sent to ${decryptedUid}, check and enter the OTP`}
              title="OTP Code was Resent"
              variant={`success`}
            />
          )}
          {authResponse && (
            <ToastAuthStatus
              success={authResponse.success}
              message={authResponse.message}
              title="OTP Verification"
              variant={authResponse.success ? "success" : "destructive"}
            />
          )}

          <CardHeader>
            <CardTitle className="text-2xl">Verify OTP</CardTitle>
            <CardDescription>
              OTP sent to{" "}
              <u className="font-bold text-md text-blue-600">{decryptedUid}</u>,
              if your phone or email is correct, you will receive an OTP shortly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <OTPTimer otpGeneratedAt={decryptedTid} />
              </div>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full flex space-x-2 items-center disabled:opacity-50"
              >
                <p>Verify OTP</p>
                {form.formState.isSubmitting && (
                  <LucideLoader className="w-6 h-6" />
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {`Already have an account ? `}
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

export const VerifyOTP = z.object({
  phone_number: z
    .string({
      invalid_type_error: "Please enter a valid phone number",
      required_error: "Phone number is required",
    })
    .min(1, { message: "Phone number is required" })
    .optional(),
  otp: z
    .string({
      invalid_type_error: "Invalid OTP entered",
      required_error: "OTP is required",
    })
    .min(6, { message: "OTP must be 6 characters long" })
    .max(6, { message: "OTP must be 6 characters long" }),
});
export type VerifyOTPType = z.infer<typeof VerifyOTP>;
