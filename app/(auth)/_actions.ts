// Server actions for auth module
"use server";

import { signIn, signOut } from "@/auth";

import { AuthError } from "next-auth";
import { query } from "../_axios";
import { AuthServices } from "./_services";
import { ForgotPasswordSchemaType } from "./forgot-password/components/forgot-password";
import { LoginSchemaType } from "./login/components/login-form";
import { TErrorForgotPassword } from "./login/_types";
import { redirect } from "next/navigation";
import { VerifyOTPType } from "./verify-otp/components/verify-otp";
import { isRedirectError } from "next/dist/client/components/redirect";
import { encrypt } from "@/lib/utils";
import { SetPasswordSchemaType } from "./reset-password/_components/reset-password-form";
import { OTPResponse } from "./_types";

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
    const response = await query<TErrorForgotPassword>(
      AuthServices.ForgotPassword(credentials)
    );
    if (response.hasOwnProperty("status")) {
      // If the response was successful, redirect to the verify OTP page. Also we want to add a fake otp creation as a param.
      const otpCreationDate = encrypt(Date.now());
      const uid = encrypt(credentials.email_or_phone_number);
      return redirect(`/verify-otp?uid=${uid}&tid=${otpCreationDate}`);
    }

    // Know we know that the response was not successful, so destructure the response and get the message
    return {
      success: false,
      message: response?.email_or_phone_number?.invalid_email_or_phone,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
};

export const authVerifyOTP = async (credentials: VerifyOTPType) => {
  try {
    const response = await query<OTPResponse, OTPResponse>(
      AuthServices.VerifyOTP(credentials)
    );
    if (response.hasOwnProperty("user_id")) {
      const uuid = encrypt(response.user_id);
      const token = encrypt(response.tokens.access);
      return redirect(`/reset-password?uid=${uuid}&tid=${token}`);
    }
    return {
      success: false,
      message: "Invalid OTP",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "An unknown error occurred, try again",
    };
  }
};
export const authSetPassword = async (
  id: string,
  token: string,
  credentials: SetPasswordSchemaType
) => {
  try {
    const response = await query<Record<string, string>>(
      AuthServices.SetPassword(id, token, credentials)
    );
    if (response.hasOwnProperty("message")) {
      return redirect(`/login?success=true`);
    }

    // return redirect("/login");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "An unknown error occurred, try again",
    };
  }
};

export const authResendOTP = async (credentials: { phone_number: string }) => {
  try {
    const response = await query<Record<string, string>>(
      AuthServices.ResendOTP(credentials)
    );
    if (response.hasOwnProperty("status")) {
      const uid = encrypt(credentials.phone_number);
      const tid = encrypt(Date.now());
      return redirect(`/verify-otp?uid=${uid}&tid=${tid}&resend=true`);
    }
    if (response.hasOwnProperty("phone_number")) {
      if (response.phone_number.hasOwnProperty("otp_exists")) {
        const message = Object.values(response.phone_number).join(" ");
        return {
          success: false,
          message,
        };
      }
      return {
        success: false,
        message: `Enter a valid phone number`,
      };
    }
    return {
      success: false,
      message: "An unknown error occurred, try again",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "An unknown error occurred, try again",
    };
  }
};
