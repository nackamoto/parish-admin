import { useQuery } from "@tanstack/react-query";
import { MembersResponse, UsersResponse } from "./_types";
import { useSession } from "next-auth/react";

export const useGetUsers = () => {
  const { data } = useSession();
  return useQuery({
    queryKey: ["/users/"],
    enabled: true,
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/`,
        {
          method: `GET`,
          headers: {
            Authorization: `Bearer ${data?.user?.tokens?.access}`,
          },
        }
      );
      const users = await response.json();
      return users as UsersResponse;
    },
  });
};

export const useGetMembers = () => {
  const { data } = useSession();
  return useQuery({
    queryKey: ["/members/"],
    enabled: true,
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/members/`,
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

export const useGetChurches = () => {
  const { data } = useSession();
  return useQuery({
    queryKey: ["/churches/"],
    enabled: true,
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
