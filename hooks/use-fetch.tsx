import { query } from "@/app/_axios";
import { ServicesType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useQueryFetch<TData>(options: ServicesType) {
  return useQuery({
    queryKey: [options?.url, options?.params],
    queryFn: async () => {
      const response = await query({
        url: options?.url,
        method: "GET",
        params: options?.params,
      });
      return Promise.resolve(response as unknown as TData);
    },
  });
}
