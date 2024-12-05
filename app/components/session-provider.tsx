"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, ReactNode } from "react";

export function NextAuthSessionProvider(props: SessionProps) {
  return (
    <SessionProvider refetchOnWindowFocus>{props.children}</SessionProvider>
  );
}

type SessionProps = PropsWithChildren<{ children: ReactNode }>;
