import { PorivnyannyaView, porivnyannyaMetadata } from "@/views/porivnyannya";

export const metadata = porivnyannyaMetadata("uk");

export default function Page() {
  return <PorivnyannyaView lang="uk" />;
}
