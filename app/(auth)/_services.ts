import { ServicesType } from "@/types";

export const AuthServices = {
  ForgotPassword: <TData>(data: TData) => {
    return {
      method: "POST",
      url: `/auth/forgot-password/`,
      data,
    } as ServicesType<TData>;
  },
  VerifyOTP: <TData>(data: TData) => {
    return {
      method: "POST",
      url: `/users/verify-otp/`,
      data,
    } as ServicesType<TData>;
  },
} as const;
