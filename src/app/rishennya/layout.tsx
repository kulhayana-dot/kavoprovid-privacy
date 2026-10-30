import { SiteLayout } from "@/components/SiteLayout";

export default function RishennyaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteLayout>{children}</SiteLayout>;
}
