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
  ResendOTP: <TData>(data: TData) => {
    return {
      method: "POST",
      url: `/users/resend-otp/`,
      data,
    } as ServicesType<TData>;
  },
  SetPassword: <TData>(id: string, token: string, data: TData) => {
    return {
      method: "POST",
      url: `/users/${id}/set-password/`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as ServicesType<TData>;
  },
} as const;
