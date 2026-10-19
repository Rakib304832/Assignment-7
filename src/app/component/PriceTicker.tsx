import { connection } from "next/dist/server/web/exports";
import Link from "next/link";

type PriceChange = { dir: "up" | "down" | "flat"; pct: number };

interface Item {
  id: number; // React key
  slug: string;
  nameBn: string;
  category: string;
  unit: string;
  today: number;
  categoryIcon: string;
  // dir and pct live INSIDE change in the API response, not at the top level
  change: PriceChange;
}

export default async function PriceTicker() {
  await connection();
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" } // always fresh prices
  );

  if (!res.ok) return <p>ডাটা লোড করা যায়নি</p>;

  const data = await res.json();

  const items: Item[] = Array.isArray(data)
    ? data
    : data.data ?? data.products ?? data.items ?? [];

  if (!items.length) return <p>কোনো ডাটা নেই</p>;

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="marquee-track flex w-max items-center">
        {[...items, ...items].map((it, i) => {
          const { dir, pct } = it.change;

          return (
            <Link
              key={`${it.id}-${i}`}
              href={`/productdetails/${it.id}`}
              className="mx-6 flex shrink-0 items-center gap-2"
            >
              <span>{it.categoryIcon}</span>
              <span>{it.nameBn}</span>
              <b>
                {it.today} টাকা/{it.unit}
              </b>
              <span
                className={
                  dir === "up"
                    ? "text-green-600"
                    : dir === "down"
                      ? "text-red-600"
                      : ""
                }
              >
                {dir === "up" ? "▲" : dir === "down" ? "▼" : "–"} {Math.abs(pct)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}