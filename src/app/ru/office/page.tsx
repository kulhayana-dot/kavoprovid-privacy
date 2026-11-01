import { OfficeView, officeMetadata } from "@/views/office";

export const metadata = officeMetadata("ru");

export default function Page() {
  return <OfficeView lang="ru" />;
}
