import { HomeView, homeMetadata } from "@/views/home";

export const metadata = homeMetadata("uk");

export default function Page() {
  return <HomeView lang="uk" />;
}
