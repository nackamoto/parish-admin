// Server actions for auth module
"use server";

import { signIn, signOut } from "@/auth";

import { AuthError } from "next-auth";
import { query } from "../_axios";
import { AuthServices } from "./_services";
import { ForgotPasswordSchemaType } from "./forgot-password/components/forgot-password";
import { LoginSchemaType } from "./login/components/login-form";
import { TErrorForgotPassword, TSuccessForgotPassword } from "./login/_types";
import { redirect } from "next/navigation";
import { VerifyOTPType } from "./verify-otp/components/verify-otp";
import { isRedirectError } from "next/dist/client/components/redirect";

export const authSignIn = async (credentials: LoginSchemaType) => {
  try {
    await signIn("credentials", { ...credentials, redirect: true });
    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      // Access the particular type of error
      switch (error.type) {
        case `CredentialsSignin`:
          return {
            message: "Your phone number or password is incorrect.",
            success: false,
          };
        case `CallbackRouteError`:
          return {
            message: "Your phone number or password is incorrect.",
            success: false,
          };
        case `AccessDenied`:
          return {
            message: "Access denied",
            success: false,
          };
        default: {
          return {
            message: "An unknown error occurred, try again",
            success: false,
          };
        }
      }
    }
    throw error;
  }
};

export const authSignOut = async () =>
  await signOut({ redirect: true, redirectTo: "/login" });

export const authForgotPassword = async (
  credentials: ForgotPasswordSchemaType
) => {
  if (!credentials) throw new Error("No credentials provided");
  try {
    const response = await query<TSuccessForgotPassword, TErrorForgotPassword>(
      AuthServices.ForgotPassword(credentials)
    );
    if (response.success) {
      return redirect(
        `/verify-otp?credentials=${credentials.email_or_phone_number}`
      );
    }

    // Know we know that the response was not successful, so destructure the response and get the message
    const data = response as TErrorForgotPassword;

    return {
      success: false,
      message: data?.email_or_phone_number?.invalid_email_or_phone,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
};

export const authVerifyOTP = async (credentials: VerifyOTPType) => {
  try {
    await query(AuthServices.VerifyOTP(credentials));
    return {
      success: true,
      message: "OTP verification successful",
    };
  } catch {
    return {
      success: false,
      message: "An unknown error occurred, try again",
    };
  }
};
