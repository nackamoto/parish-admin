import { useQuery } from "@tanstack/react-query";
import { MembersResponse, UsersResponse } from "./_types";
import { useSession } from "next-auth/react";
import { UserServices } from "./_services";
import { useFetcher } from "../_axios";

export const useGetUsers = () => {
  return useFetcher<UsersResponse>(UserServices.GetAllUsers());
};

export const useGetMembers = () => {
  return useFetcher<MembersResponse>(UserServices.GetAllMembers());
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
