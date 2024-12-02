import { auth } from "@/auth";
import { ServicesType } from "@/types";
import axios, { AxiosError } from "axios";
import {
  TErrorForgotPassword,
  TSuccessForgotPassword,
} from "./(auth)/login/_types";

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
  });
};

export const query = async <
  Data = TSuccessForgotPassword,
  Error = TErrorForgotPassword
>(
  config: ServicesType
) => {
  try {
    const response = await _axios_base(config);
    return {
      success: true,
      ...(response.data as Data),
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        ...(error.response?.data as Error),
      };
    }
    throw error;
  }
};
