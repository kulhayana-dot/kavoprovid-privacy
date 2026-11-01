import { SiteLayout } from "@/components/SiteLayout";

export default function FaqLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteLayout>{children}</SiteLayout>;
}
