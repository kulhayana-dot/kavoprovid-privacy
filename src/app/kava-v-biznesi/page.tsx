import { KnowledgeHubView, knowledgeHubMetadata } from "@/views/knowledge-hub";

export const metadata = knowledgeHubMetadata("uk");

export default function Page() {
  return <KnowledgeHubView lang="uk" />;
}
