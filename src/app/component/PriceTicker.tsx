// Reuse the nested shape from the API so types match the real data.
// "flat" is included because items like নাজির চাল have 0% change.
type PriceChange = { dir: "up" | "down" | "flat"; pct: number };

interface Item {
  id: number; // React key
  slug: string;
  nameBn: string;
  category: string;
  unit: string;
  today: number;
  // dir and pct live INSIDE change in the API response, not at the top level
  change: PriceChange;
}

export default async function PriceTicker() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" } // always fresh prices
  );

  // Without this check, a 500 error page would be parsed as data
  // and the user would just see "no data" with no clue why.
  if (!res.ok) return <p>ডাটা লোড করা যায়নি</p>;

  const data = await res.json();

  const items: Item[] = Array.isArray(data)
    ? data
    : data.data ?? data.products ?? data.items ?? [];
  if (!items.length) return <p>কোনো ডাটা নেই</p>;

  return (
    <div className="marquee-track">
      {/* Doubled so the marquee can loop seamlessly */}
      {[...items, ...items].map((it, i) => {
        // Destructure once so the JSX stays readable
        const { dir, pct } = it.change;

        return (
          // id alone repeats because the list is doubled, so add index
          <span key={`${it.id}-${i}`} className="mx-6 flex shrink-0 items-center gap-2">
            <span>{it.nameBn}</span>
            <b>{it.today} টাকা/{it.unit}</b>
            <span className={dir === "up" ? "text-green-600" : dir === "down" ? "text-red-600" : ""}>
              {dir === "up" ? "▲" : dir === "down" ? "▼" : "–"} {Math.abs(pct)}%
            </span>
          </span>
        );
      })}
    </div>
  );
}