import { ServicesType } from "@/types";

export const ChurchServices = {
  CreateMember: <TData>(data: TData) => {
    return {
      method: "POST",
      url: `/members/`,
      data,
    } as ServicesType<TData>;
  },
} as const;
