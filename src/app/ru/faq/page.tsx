import { FaqView, faqMetadata } from "@/views/faq";

export const metadata = faqMetadata("ru");

export default function Page() {
  return <FaqView lang="ru" />;
}
