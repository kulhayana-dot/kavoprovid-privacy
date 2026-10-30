import { SiteLayout } from "@/components/SiteLayout";

export default function ProductionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteLayout>{children}</SiteLayout>;
}
