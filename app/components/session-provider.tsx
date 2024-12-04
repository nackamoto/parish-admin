import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, ReactNode } from "react";

export default function NextAuthSessionProvider(props: SessionProps) {
  return <SessionProvider>{props.children}</SessionProvider>;
}

type SessionProps = PropsWithChildren<{ children: ReactNode }>;
