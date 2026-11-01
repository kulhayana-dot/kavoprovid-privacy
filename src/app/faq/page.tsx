import { FaqView, faqMetadata } from "@/views/faq";

export const metadata = faqMetadata("uk");

export default function Page() {
  return <FaqView lang="uk" />;
}
