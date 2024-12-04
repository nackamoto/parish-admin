"use server";

import { auth } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { query } from "../_axios";
import { ResetPasswordSchemaType } from "./settings/account/_components/reset-password";
import { UserServices } from "./_services";
import type { ResetPasswordErrorType } from "./_types";

export const userResetPassword = async (data: ResetPasswordSchemaType) => {
  const session = await auth();
  if (!session) return redirect(`/login`);
  try {
    const response = await query<ResetPasswordErrorType>(
      UserServices.ResetPassword(session?.user.user.id, data)
    );
    if (response.hasOwnProperty("errors")) {
      const errors = response as ResetPasswordErrorType;
      const message = Object.values(errors.errors.detail).join(" ");
      return {
        success: true,
        message: message,
      };
    }
    return {
      success: true,
      message: response.message,
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
