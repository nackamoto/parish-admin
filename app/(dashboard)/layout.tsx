import { auth } from "@/auth";
import AppLayout from "../components/app-layout";
import QueryProviders from "../components/query-provider";
import { NextAuthSessionProvider } from "../components/session-provider";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <NextAuthSessionProvider session={session}>
      <QueryProviders>
        <AppLayout>{children}</AppLayout>
      </QueryProviders>
    </NextAuthSessionProvider>
  );
}
