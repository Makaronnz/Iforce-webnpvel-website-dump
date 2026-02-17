import Link from "next/link";
import { characters, getCharactersSorted } from "@/data/characters";

type Char = typeof characters[number];

function groupByInitial(chars: Char[]) {
  const groups: Record<string, Char[]> = {};
  const collator = new Intl.Collator("tr", { sensitivity: "base" });

  for (const c of chars) {
    const first = c.name.trim().charAt(0);
    const letter = first ? first.toLocaleUpperCase("tr-TR") : "#";
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(c);
  }

  Object.values(groups).forEach((arr) =>
    arr.sort((a, b) => collator.compare(a.name, b.name))
  );

  const letters = Object.keys(groups).sort((a, b) => collator.compare(a, b));
  return { groups, letters };
}

export default function CharactersIndex() {
  // Komutanlar: dosyada tanımlandıkları sırayla
  const commanders = characters.filter((c) => c.isCommander).slice(0, 10);

  // Diğerleri: alfabetik
  const others = getCharactersSorted().filter((c) => !c.isCommander);
  const { groups, letters } = groupByInitial(others);

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <h1 className="text-3xl font-bold mb-6">Characters</h1>
      <p className="text-muted-foreground mb-8">
        ‼️ATTENTION! THIS SECTION IS EXPERIMENTAL AND WILL BE UPDATED AS THE STORY PROGRESSES. MAY CONTAIN SPOILERS/FALSE INFORMATION (May not be 100% up to date). REPRESENTATIVE IMAGES. THE FINAL DESIGNS ARE DESCRIBED IN THE WEBNOVEL‼️
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Sol: Commanders */}
        <aside>
          <h2 className="text-xl font-bold mb-4">Commanders</h2>
          <ul className="space-y-1">
            {commanders.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/infos/characters/${c.slug}`}
                  className="underline-offset-4 hover:underline"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            {commanders.length === 0 && (
              <li className="text-muted-foreground">No commanders yet.</li>
            )}
          </ul>
        </aside>

        {/* Sağ: Diğer karakterler (alfabetik gruplar) */}
        <main className="md:col-span-2">
          <ul className="columns-1 sm:columns-2 md:columns-2 gap-8 [&>li]:break-inside-avoid">
            {letters.map((L) => (
              <li key={L} className="mb-6">
                <div className="sticky top-0 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50 z-10">
                  <h2 className="text-lg font-semibold text-muted-foreground tracking-wider mb-2">
                    {L}
                  </h2>
                </div>
                <ul className="space-y-1">
                  {groups[L].map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/infos/characters/${c.slug}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
