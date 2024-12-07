"use client";
import { useSession } from "next-auth/react";
import { PropsWithChildren, useEffect } from "react";

type Props = PropsWithChildren<{}>;
export default function Layout({ children }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status, update } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      update(); // extend client session
      // TODO request token refresh from server
    }, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [update]);
  return { children };
}
