import { KnowledgeHubView, knowledgeHubMetadata } from "@/views/knowledge-hub";

export const metadata = knowledgeHubMetadata("ru");

export default function Page() {
  return <KnowledgeHubView lang="ru" />;
}
