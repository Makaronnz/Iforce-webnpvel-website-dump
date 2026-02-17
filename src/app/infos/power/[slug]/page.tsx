// src/app/infos/power/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getPowerTopic, powerTopics } from "@/data/power";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return powerTopics.map((p) => ({ slug: p.slug }));
}

// İstersen metadata eklemek istersen burayı açabilirsin:
// export async function generateMetadata({ params }: { params: Promise<Params> }) {
//   const { slug } = await params;
//   const item = getPowerTopic(slug);
//   return { title: item ? `${item.title} – Power` : "Power not found" };
// }

export default async function PowerDetail(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;

  const item = getPowerTopic(slug);
  if (!item) notFound();

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <div className="max-w-3xl">
        {/* Sayfa başlığı */}
        <h1 className="text-4xl font-bold mb-4">{item.title}</h1>

        {/* Kısa özet */}
        {item.blurb && (
          <p className="text-muted-foreground mb-8">{item.blurb}</p>
        )}

        {/* İçerik bölümleri */}
        <div className="space-y-8">
          {item.sections?.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-2xl font-semibold">{sec.heading}</h2>

              {sec.paragraphs?.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}

              {sec.bullets?.length ? (
                <ul className="list-disc pl-6 space-y-1">
                  {sec.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
