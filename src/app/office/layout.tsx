import { SiteLayout } from "@/components/SiteLayout";

export default function OfficeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteLayout>{children}</SiteLayout>;
}
