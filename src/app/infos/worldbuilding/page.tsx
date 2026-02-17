import Image from "next/image";
import Link from "next/link";
import { kingdoms } from "@/data/kingdoms";


export default function WorldbuildingIndex() {
return (
<div className="container mx-auto px-4 md:px-6 py-24">
<h1 className="text-3xl font-bold mb-6">Kingdoms & Empires</h1>
<p className="text-muted-foreground mb-8">
       ‼️ATTENTION! THIS SECTION IS EXPERIMENTAL AND WILL BE UPDATED AS THE STORY PROGRESSES. MAY CONTAIN SPOILERS/FALSE INFORMATION‼️
</p>


<div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
{kingdoms.map((k) => (
<Link
  key={k.slug}
  href={`/infos/worldbuilding/${k.slug}`}
  className="relative aspect-square rounded-lg border overflow-hidden hover:border-primary transition-colors"
>
  {k.image && (
    <Image
      src={k.image}
      alt={k.name}
      fill
      className="object-cover opacity-70"
    />
  )}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
  <span className="relative z-10 flex h-full items-center justify-center text-center font-medium text-white">
    {k.name}
  </span>
</Link>
))}
</div>
</div>
);
}