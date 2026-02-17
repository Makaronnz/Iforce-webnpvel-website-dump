import Link from "next/link";
import { powerTopics } from "@/data/power";


export default function PowerIndex() {
return (
<div className="container mx-auto px-4 md:px-6 py-24">
<h1 className="text-3xl font-bold mb-6">Combat Capabilities</h1>
<p className="text-muted-foreground mb-8">‼️SOME DEFINITIONS ARE EXPERIMENTAL AND MAY CHANGE IN THE FUTURE‼️</p>


<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
{powerTopics.map((p) => (
<Link key={p.slug} href={`/infos/power/${p.slug}`} className="rounded-xl border p-5 hover:border-primary transition-colors">
<h2 className="text-lg font-semibold">{p.title}</h2>
<p className="text-sm text-muted-foreground mt-1">{p.blurb}</p>
</Link>
))}
</div>
</div>
);
}