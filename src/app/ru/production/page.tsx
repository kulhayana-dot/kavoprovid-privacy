import { ProductionView, productionMetadata } from "@/views/production";

export const metadata = productionMetadata("ru");

export default function Page() {
  return <ProductionView lang="ru" />;
}
