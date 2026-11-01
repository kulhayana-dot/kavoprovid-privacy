import { PorivnyannyaView, porivnyannyaMetadata } from "@/views/porivnyannya";

export const metadata = porivnyannyaMetadata("ru");

export default function Page() {
  return <PorivnyannyaView lang="ru" />;
}
