// src/app/infos/worldbuilding/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getKingdom, kingdoms } from "@/data/kingdoms";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return kingdoms.map((k) => ({ slug: k.slug }));
}

// (İstersen metadata ekleyebilirsin)
// export async function generateMetadata({ params }: { params: Promise<Params> }) {
//   const { slug } = await params;
//   const k = getKingdom(slug);
//   return { title: k ? `${k.name} – Worldbuilding` : "Kingdom not found" };
// }

export default async function KingdomDetail(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const item = getKingdom(slug);
  if (!item) notFound();

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <div className="max-w-3xl">
        {/* --- HERO: Arkaplanda görsel + başlık/özet --- */}
<div className="relative mb-8 overflow-hidden rounded-xl border
                h-[12rem] md:h-[20rem] lg:h-[30rem]">          {item.image && (
            <Image
              src={item.image}
              alt={item.name}
              fill
              priority
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
              {item.name}
            </h1>
            {item.summary && (
              <p className="text-white/85 mt-2 max-w-2xl">{item.summary}</p>
            )}
          </div>
        </div>

        {/* --- içerik gövdesi --- */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {item.overview && (
            <>
              <h3>Overview</h3>
              <p>{item.overview}</p>
            </>
          )}

          {item.notablePlaces?.length ? (
            <>
              <h3>Notable Places</h3>
              <ul>
                {item.notablePlaces.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </>
          ) : null}

          {item.factions?.length ? (
            <>
              <h3>Factions</h3>
              <ul>
                {item.factions.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
