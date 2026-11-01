import { RishennyaView, rishennyaMetadata } from "@/views/rishennya";

export const metadata = rishennyaMetadata("ru");

export default function Page() {
  return <RishennyaView lang="ru" />;
}
