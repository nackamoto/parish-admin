import { auth } from "@/auth";
import { ServicesType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const _axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const _axios_base = async (config: ServicesType) => {
  const session = await auth();
  const jwt = session?.user.tokens.access;

  return _axios({
    ...config,
    headers: {
      Authorization: jwt ? `Bearer ${jwt}` : undefined,
      ...config.headers,
    },
    params: config?.params,
  });
};

// user this for server actions
export const query = async <S, E = never>(config: ServicesType) => {
  try {
    const response = await _axios_base(config);
    console.log(JSON.stringify(response.data, null, 2));
    return response.data as S;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(JSON.stringify(error.response?.data, null, 2));
      return error.response?.data as E;
    }
    throw error;
  }
};

export const useFetcher = <TData = never>(config: Partial<ServicesType>) => {
  const { data, status } = useSession();
  const isLoading = status === "loading";
  return useQuery({
    queryKey: [config.url],
    enabled: !isLoading,
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${config.url}`,
        {
          method: config.method,
          headers: {
            Authorization: `Bearer ${data?.user?.tokens?.access}`,
          },
        }
      );
      const users = await response.json();
      return users as TData;
    },
  });
};
