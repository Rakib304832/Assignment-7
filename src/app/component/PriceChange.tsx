import type { Product } from "@/lib/types";

export default function PriceChange({ change }: { change: Product["change"] }) {
  if (change.dir === "flat" || change.pct === 0) {
    return <span className="text-sm font-medium text-gray-500">0%</span>;
  }
  const up = change.dir === "up";
  return (
    <span className={`text-sm font-medium ${up ? "text-red-600" : "text-green-600"}`}>
      {up ? "▲" : "▼"} {Math.abs(change.pct)}%
    </span>
  );
}