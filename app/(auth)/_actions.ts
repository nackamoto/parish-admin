// Server actions for auth module
"use server";

import { signIn } from "@/auth";
import { LoginSchemaType } from "@/app/(auth)/login/components/login-form";
import { AuthError } from "next-auth";

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
