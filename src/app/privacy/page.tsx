import { PrivacyView, privacyMetadata } from "@/views/privacy";

export const metadata = privacyMetadata("uk");

export default function Page() {
  return <PrivacyView lang="uk" />;
}
