"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, ReactNode } from "react";

export function NextAuthSessionProvider(props: SessionProps) {
  return (
    <SessionProvider refetchOnWindowFocus session={props.session}>
      {props.children}
    </SessionProvider>
  );
}

type SessionProps = PropsWithChildren<{
  children: ReactNode;
  session: Session | null;
}>;
