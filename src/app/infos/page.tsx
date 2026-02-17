import Link from "next/link";
import { Users, Globe2, Zap } from "lucide-react";


export default function InfosHome() {
const items = [
{ href: "/infos/characters", title: "Characters", desc: "List of key figures.", icon: Users },
{ href: "/infos/worldbuilding", title: "Regions", desc: "Kingdoms, regions, cultures, conflicts.", icon: Globe2 },
{ href: "/infos/power", title: "Combat Capabilities", desc: "Trait, Magic, Runes etc...", icon: Zap },
];


return (
<div className="container mx-auto px-4 md:px-6 py-24">
<h1 className="text-4xl font-bold mb-8">Infos</h1>
<p className="text-muted-foreground mb-10 max-w-2xl">‼️Some of the information and desings are experimental and may change in the future‼️ </p>


<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{items.map(({ href, title, desc, icon: Icon }) => (
<Link key={href} href={href} className="group rounded-xl border p-6 hover:border-primary transition-colors">
<div className="flex items-start gap-4">
<div className="rounded-lg border p-2">
<Icon className="h-6 w-6" />
</div>
<div>
<h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{title}</h2>
<p className="text-sm text-muted-foreground mt-1">{desc}</p>
</div>
</div>
</Link>
))}
</div>
</div>
);
}