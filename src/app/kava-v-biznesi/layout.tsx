import { SiteLayout } from "@/components/SiteLayout";

export default function KavaVBiznesiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteLayout>{children}</SiteLayout>;
}
