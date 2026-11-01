import { OfficeView, officeMetadata } from "@/views/office";

export const metadata = officeMetadata("uk");

export default function Page() {
  return <OfficeView lang="uk" />;
}
