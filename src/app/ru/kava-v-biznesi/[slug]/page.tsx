import type { Metadata } from "next";
import { ArticleView, articleMetadata, articleStaticParams } from "@/views/article";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articleStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return articleMetadata((await params).slug, "ru");
}

export default async function Page({ params }: Props) {
  return <ArticleView slug={(await params).slug} lang="ru" />;
}
