import type { Metadata } from "next";
import { MachineView, machineMetadata, machineStaticParams } from "@/views/machine";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return machineStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return machineMetadata((await params).slug, "uk");
}

export default async function Page({ params }: Props) {
  return <MachineView slug={(await params).slug} lang="uk" />;
}
