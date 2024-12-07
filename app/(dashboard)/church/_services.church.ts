import { ServicesType } from "@/types";

export const ChurchServices = {
  CreateMember: <TData>(data: TData) => {
    return {
      method: "POST",
      url: `/members/`,
      data,
    } as ServicesType<TData>;
  },
  UpdateMember: <TData>(id: string, data: TData) => {
    return {
      method: "PUT",
      url: `/members/${id}`,
      data,
    } as ServicesType<TData>;
  },
  DeleteMember: <TData>(id: string) => {
    return {
      method: "DELETE",
      url: `/members/${id}/`,
    } as ServicesType<TData>;
  },
  CreateMemberTitle: <TData>(data: TData) => {
    return {
      method: `POST`,
      url: `/member-titles/`,
      data,
    } as ServicesType<TData>;
  },
  GetMemberTitles: <TData>() => {
    return {
      method: `GET`,
      url: `/member-titles/`,
    } as ServicesType<TData>;
  },
  GetRegions: <TData>() => {
    return {
      method: `GET`,
      url: `/regions/`,
    } as ServicesType<TData>;
  },
  GetCities: <TData>() => {
    return {
      method: "GET",
      url: `/cities/`,
    } as ServicesType<TData>;
  },
  GetJobTitles: <TData>() => {
    return {
      method: "GET",
      url: `/job-titles/`,
    } as ServicesType<TData>;
  },
  GetOccupationIndustries: <TData>() => {
    return {
      method: "GET",
      url: `/occupation-industries/`,
    } as ServicesType<TData>;
  },
} as const;
