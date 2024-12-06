import { ServicesType } from "@/types";

export const ChurchServices = {
  CreateMember: <TData>(data: TData) => {
    return {
      method: "POST",
      url: `/members/`,
      data,
    } as ServicesType<TData>;
  },
  DeleteMember: <TData>(id: string) => {
    return {
      method: "DELETE",
      url: `/members/${id}/`,
    } as ServicesType<TData>;
  },
} as const;
