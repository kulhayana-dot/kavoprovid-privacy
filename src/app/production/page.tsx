import { ProductionView, productionMetadata } from "@/views/production";

export const metadata = productionMetadata("uk");

export default function Page() {
  return <ProductionView lang="uk" />;
}
