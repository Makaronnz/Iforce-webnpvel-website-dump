// src/data/power.ts
export type PowerSection = {
  heading: string;           // bölüm başlığı (ör. "Details", "Rules & Limits")
  paragraphs?: string[];     // paragraf listesi
  bullets?: string[];        // madde işaretli liste
};

export type PowerTopic = {
  title: string;
  slug: string;
  blurb: string;             // kısa özet (sayfa üstü)
  sections?: PowerSection[]; // tüm detay içerik buradan gelecek
};

export const powerTopics: PowerTopic[] = [
  { 
  title: "Trait (The Attuned)", 
  slug: "ability", 
  blurb: "Innate abilities that manifest around age 10. Individuals possessing these powers are formally known as 'Attuned', though they face severe social stigma in certain regions.",
  sections: [
    {
      heading: "Origins & Awakening",
      bullets: [
        "Inheritance: Traits are heritable and can skip generations. A child may inherit a dormant trait from a grandparent.",
        "Prenatal Exposure: High exposure to raw energy or Kor radiation during pregnancy can trigger a mutation, causing a Trait to appear in families with no prior history.",
        "The First Signs: Awakening is often violent and involuntary. Brief, uncontrolled bursts of power are the primary indicator of an Attuned child."
      ]
    },
    {
      heading: "Classification System",
      bullets: [
        "Offense: High-output abilities capable of inflicting direct damage without external tools.",
        "Defense: Powers focused on neutralizing impact, creating barriers, or damage mitigation.",
        "Support (DS/OS): Enhancing allied capabilities (durability/strength) or disrupting enemy resistance. Strategic value is extremely high.",
        "Utility (QoL): Non-combat abilities that improve quality of life, logistics, or civilian production.",
        "Unique: Anomalies that do not fit standard categories. Their mechanisms are often poorly understood."
      ]
    },
    {
      heading: "Societal Status",
      bullets: [
        "Terminology: While officially registered as 'Attuned', hostile nations and purist factions use the derogatory slur 'Foulblood'.",
        "Risks: Pushing a Trait beyond its biological limit is fatal. It causes progressive internal burn or irreversible neurological collapse."
      ]
    }
  ]
},


  { 
  title: "Magic", 
  slug: "magic", 
  blurb: "The art of shaping ambient Kor energy into material reality. Unlike Traits, Magic is a learned discipline, theoretically accessible to anyone but mastered by few.",
  sections: [
    {
      heading: "Mechanics",
      bullets: [
        "Casting flows through internal Energy Paths. The output depends on the caster's understanding, imagination, and structural discipline.",
        "Improvement requires expanding the count and width of Energy Paths while maintaining their stability."
      ]
    },
    {
      heading: "The Exclusion Principle",
      bullets: [
        "Magic is lethal to Trait users. Their biology rejects the external flow of Kor, leading to internal combustion.",
        "Due to this risk, formal magic education begins strictly after age 10, once a child is confirmed not to be a Trait carrier."
      ]
    },
    {
      heading: "Affinity Levels",
      bullets: [
        "Spells are categorized from Affinity 1 (Basic Utility) to Affinity 7 (Strategic/Cataclysmic).",
        "High-affinity spells are often state secrets, guarded by cults, or lost to history.",
        "Creating custom spells is possible but dangerous; incomplete understanding results in backlash or physical deformity."
      ]
    },
    {
      heading: "Risks",
      bullets: [
        "Energy Paths degrade over time and require constant stabilization.",
        "Overuse leads to 'Kor Burn', organ failure, or permanent neurological damage."
      ]
    }
  ]
},

  { 
  title: "Kor Crystal", 
  slug: "energy-crystal", 
  blurb: "Natural reservoirs of highly condensed mana, commonly known as 'Kor'. Found as raw shards or high-purity cores, they are the fuel source of modern warfare and technology.",
  sections: [
    {
      heading: "Properties & Classification",
      bullets: [
        "Raw Kor Shards: Low purity fragments found in nature. Used for basic lighting and civilian tools.",
        "Pure Kor Cores: Rare, stable, and extremely valuable. Capable of holding complex spell patterns. Their capacity is defined by the crystal's clarity and cut.",
        "Ignition Crystals (Activators): A reactive subtype. When brought into contact with a charged Kor Core, they catalyze the release of stored energy."
      ]
    },
    {
      heading: "Safety Protocols",
      bullets: [
        "Overload Risk: Kor is volatile. Attempting to embed a spell too complex for the crystal's grade leads to 'Kor Burn', cracking, or lethal detonation.",
        "Recharging: Requires specialized industrial equipment. Damaged crystals are structurally compromised and must be discarded."
      ]
    },
    {
      heading: "Origin Hypotheses",
      bullets: [
        "The true source of Kor remains a mystery.",
        "Theological Theory: Remnants of creation left by Ancient Gods (The Divine Spark).",
        "Cosmic Theory: Debris from a prehistoric meteor shower that saturated the earth with energy."
      ]
    }
  ]
},
  { 
  title: "Runes / Bindeds",
  slug: "rune",          
  blurb: "An ancient and nearly extinct method of inscribing symbols onto physical objects to imbue them with mana properties.",
  sections: [
    {
      heading: "Description",
      bullets: [
        "Historically used by master blacksmiths to enhance weapons and armor.",
        "It requires precise engraving on high-quality materials to channel energy effectively."
      ]
    },
    {
      heading: "Current Status",
      bullets: [
        "True runecraft is considered lost to history.",
        "While some ancient artifacts remain, the knowledge of creating functional runes is extremely rare.",
        "Most modern examples seen today are merely decorative and hold no real power."
      ]
    }
  ]
},
];

export function getPowerTopic(slug: string) {
  return powerTopics.find((p) => p.slug === slug) || null;
}
