import AppLayout from "../components/app-layout";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppLayout>{children}</AppLayout>;
}
