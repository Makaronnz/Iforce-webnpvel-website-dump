// src/app/chapters/[slug]/page.tsx
import React from "react";
import { getChapter, getChapters } from "@/lib/chapters";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { remark } from "remark";
import html from "remark-html";
import ChapterNavigation from "@/components/ChapterNavigation";
import type { Metadata } from "next";

type Params = { slug: string };

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/** output: 'export' için zorunlu */
export async function generateStaticParams(): Promise<Params[]> {
  const chapters = getChapters();
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

/** (opsiyonel ama faydalı) sayfa başlığı */
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  return { title: chapter ? `${chapter.title} – Chapters` : "Chapter not found" };
}

export default async function ChapterPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;

  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const contentHtml = await markdownToHtml(chapter.content);

  // Sıralı liste (numaraya göre)
  const sortedChapters = [...getChapters()].sort((a, b) => a.number - b.number);
  const currentIndex = sortedChapters.findIndex((ch) => ch.slug === slug);
  const prevChapter = currentIndex > 0 ? sortedChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < sortedChapters.length - 1 ? sortedChapters[currentIndex + 1] : null;

  return (
    <div className="container mx-auto py-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Link href="/chapters" className="hover:text-primary transition-colors">
              Chapters
            </Link>
            <span>&gt;</span>
            <span>Chapter {chapter.number}</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{chapter.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(chapter.date).toLocaleDateString("en-US")}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Chapter {chapter.number}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none border-t border-b py-8 my-8 non-selectable">
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        <ChapterNavigation prevChapter={prevChapter} nextChapter={nextChapter} />
      </div>
    </div>
  );
}
