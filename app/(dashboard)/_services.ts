import { ServicesType } from "@/types";

export const UserServices = {
  ResetPassword: <TData>(id: string, data: TData) => {
    return {
      method: "POST",
      url: `/users/${id}/reset-password/`,
      data,
    } as ServicesType<TData>;
  },
  GetAllUsers: <TData>() => {
    return {
      method: "GET",
      url: `/users/`,
    } as ServicesType<TData>;
  },
  GetAllMembers: <TData>() => {
    return {
      method: "GET",
      url: `/members/`,
    } as ServicesType<TData>;
  },
} as const;
