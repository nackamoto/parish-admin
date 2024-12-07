import { useQuery } from "@tanstack/react-query";
import {
  GetBaseResponse,
  MembersResponse,
  MemberTitle,
  Region,
  UsersResponse,
} from "./_types";
import { useSession } from "next-auth/react";
import { UserServices } from "./_services";
import { useFetcher } from "../_axios";
import { ChurchServices } from "./church/_services.church";

export const useGetUsers = () => {
  return useFetcher<UsersResponse>(UserServices.GetAllUsers());
};

export const useGetMembers = () => {
  return useFetcher<MembersResponse>(UserServices.GetAllMembers());
};

export const useGetMemberTitles = () => {
  return useFetcher<GetBaseResponse<MemberTitle[]>>(
    ChurchServices.GetMemberTitles()
  );
};

export const useGetRegions = () => {
  const regions = useFetcher<GetBaseResponse<Region[]>>(
    ChurchServices.GetRegions()
  );
  let results;
  if (regions.isFetched) {
    results = regions.data?.data?.results?.map((region) => ({
      label: region.name,
      value: region.id,
    }));
  }
  return {
    ...regions,
    results,
  };
};
export const useGetCities = () => {
  const regions = useFetcher<GetBaseResponse<Region[]>>(
    ChurchServices.GetCities()
  );
  let results;
  if (regions.isFetched) {
    results = regions.data?.data?.results?.map((region) => ({
      label: region.name,
      value: region.id,
    }));
  }
  return {
    ...regions,
    results,
  };
};
export const useGetJobTitles = () => {
  const regions = useFetcher<GetBaseResponse<Region[]>>(
    ChurchServices.GetJobTitles()
  );
  let results;
  if (regions.isFetched) {
    results = regions.data?.data?.results?.map((region) => ({
      label: region.name,
      value: region.id,
    }));
  }
  return {
    ...regions,
    results,
  };
};

export const useGetOccupationIndustries = () => {
  const regions = useFetcher<GetBaseResponse<Region[]>>(
    ChurchServices.GetOccupationIndustries()
  );
  let results;
  if (regions.isFetched) {
    results = regions.data?.data?.results?.map((region) => ({
      label: region.name,
      value: region.id,
    }));
  }
  return {
    ...regions,
    results,
  };
};

export const useGetChurches = () => {
  const { data } = useSession();
  return useQuery({
    queryKey: ["/churches/"],
    // enabled: data,
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/churches/`,
        {
          method: `GET`,
          headers: {
            Authorization: `Bearer ${data?.user?.tokens?.access}`,
          },
        }
      );
      const users = await response.json();
      return users as MembersResponse;
    },
  });
};
