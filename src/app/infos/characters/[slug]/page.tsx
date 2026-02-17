import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCharacter } from "@/data/characters";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const { getCharactersSorted } = await import("@/data/characters");
  return getCharactersSorted().map((c: { slug: string }) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const item = getCharacter(slug);
  if (!item) return { title: "Character not found" };
  return { title: `${item.name} – Characters` };
}

export default async function CharacterDetail(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const item = getCharacter(slug);
  if (!item) notFound();

  const imagePath = item.image ?? `/images/characters/${item.slug}.jpg`;

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">{item.name}</h1>

        <div className="grid gap-6 md:grid-cols-[320px_1fr] lg:grid-cols-[380px_1fr] items-start">
          <div className="aspect-[3/4] w-full rounded-lg bg-muted/20 border overflow-hidden">
            <Image src={imagePath} alt={item.name} width={600} height={800} className="object-cover w-full h-full" />
          </div>

          <div className="max-w-none space-y-8">
            {item.summary && (
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{item.summary}</p>
            )}
            {item.relationships && (
              <section>
                <h3 className="text-xl md:text-2xl font-semibold tracking-wide mb-2">Info</h3>
                <ul className="space-y-1">
                  {item.relationships.split("\n").map((line, i) => {
                    const [label, ...rest] = line.split(":");
                    const value = rest.join(":").trim();
                    return (
                      <li key={i} className="leading-relaxed text-[15px] md:text-base">
                        {value ? (<><span className="font-semibold">{label.trim()}:</span> {value}</>) : line}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
            {item.background && (
              <section>
                <h3 className="text-xl md:text-2xl font-semibold tracking-wide mb-2">Background</h3>
                <p className="leading-relaxed text-[15px] md:text-base">{item.background}</p>
              </section>
            )}
            {item.abilities && (
              <section>
                <h3 className="text-xl md:text-2xl font-semibold tracking-wide mb-2">Trait</h3>
                <p className="leading-relaxed text-[15px] md:text-base">{item.abilities}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
