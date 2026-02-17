// src/data/characters.ts

export type Character = {
  name: string;
  slug: string;
  image?: string;        // /images/characters/frieda-flusser.jpg gibi
  summary?: string;      // kısa paragraf
  background?: string;   // geçmiş
  abilities?: string;    // yetenekler
  relationships?: string;// ilişkiler
  isCommander?: boolean; // 🔹 sol sütunda görünsün mü?
};

export const characters: Character[] = [
  {
    name: "Frieda Flusser",
    slug: "frieda-flusser",
    image: "/images/characters/frieda-flusser.jpg",
    summary: "Known Info",
    background: "She likes ships.",
    abilities: "???",
    relationships: `Age: 21
Height: 172 cm
Weight: 52 kg
Appearance: Black eyes; straight black hair.`,
    isCommander: true, // 🔹
  },

  {
    name: "Layla Crysta",
    slug: "layla",
    image: "/images/characters/layla.jpg",
    summary: "Known Info",
    background: "Born to a noble line. Her family was lost amid Hans Grimmler’s schemes; she survived alone for a time.",
    abilities: "???",
    relationships: `Age: 11
Height: 135 cm
Weight: 28 kg
Appearance: Short white hair, blue eyes.`,
    isCommander: false,
  },

  {
    name: "Akane Twinmoon",
    slug: "akane",
    image: "/images/characters/akane.jpg",
    summary: "Known Info.",
    background: "Born of royal Oni blood yet raised in hiding near Aurelia’s borders. Her community was betrayed and slaughtered. Hunted by Lord Hans’s forces, she learned to survive with cunning and restraint.",
    abilities: "???",
    relationships: `Race: Oni
Age: 38 (physically ~19 due to slow aging)
Height: 162 cm
Weight: 49 kg`,
    isCommander: false, // 🔹
  },

  { name: "Kalen", slug: "kalen", isCommander: false },
  { name: "???", slug: "tbaa", isCommander: true },
  { name: "???", slug: "tbab", isCommander: true },
  { name: "???", slug: "tbac", isCommander: true },
  { name: "???", slug: "tbad", isCommander: true },
  { name: "Hans", slug: "hans", isCommander: false },   // 🔹
];

export function getCharactersSorted() {
  return [...characters].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}

export function getCharacter(slug: string) {
  return characters.find(c => c.slug === slug) || null;
}
