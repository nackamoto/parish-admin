import { auth } from "@/auth";
import { ServicesType } from "@/types";
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

// user this with react query to client-side data fetching
export const useFetcher = <TData>(url: string) => {
  const { data } = useSession();

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: `GET`,
    headers: {
      Authorization: `Bearer ${data?.user.tokens.access}`,
    },
  }).then((res) => {
    const users = res.json();
    return users as TData;
  });
};
