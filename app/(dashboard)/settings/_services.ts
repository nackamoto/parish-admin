import { ServicesType } from "@/types";

export const UserServices = {
  ResetPassword: <TData>(id: string, data: TData) => {
    return {
      method: "POST",
      url: `/users/${id}/reset-password/`,
      data,
    } as ServicesType<TData>;
  },
} as const;
