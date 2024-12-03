"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../../../../components/form/form-input";
import { Form } from "../../../../components/ui/form";
import { authSignIn } from "../../_actions";
import { useState } from "react";
import ToastAuthStatus from "../../_components/toast-alert";

export function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  const [authResponse, setResponse] = useState<{
    success: boolean;
    message: string;
  }>();

  const handleSubmit = async (data: LoginSchemaType) => {
    const response = await authSignIn(data);
    setResponse(response);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Card className="mx-auto min-w-96 p-2">
          {authResponse && (
            <ToastAuthStatus
              success={authResponse.success}
              message={authResponse.message}
              title="Login"
              variant={authResponse.success ? "success" : "destructive"}
            />
          )}
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter phone number and password to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <FormInput
                name="phone_number"
                label="Phone Number"
                placeholder="Enter your phone number"
              />
              <div className="grid gap-2">
                <FormInput
                  name="password"
                  label={
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  }
                  placeholder="Enter your phone number"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {`Don't have an account?`}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

export const LoginSchema = z.object({
  phone_number: z
    .string({
      invalid_type_error: "Please enter a valid phone number",
      required_error: "Phone number is required",
    })
    .min(1, { message: "Phone number is required" }),
  password: z
    .string({
      invalid_type_error: "Please enter a valid password",
      required_error: "Password is required",
    })
    .min(1, { message: "Password must be at least 8" }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
