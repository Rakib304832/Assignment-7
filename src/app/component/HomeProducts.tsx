import { bn } from "@/lib/api";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import ProductGrid from "./ProductGrid";

const top6 = (list: Product[], dir: "up" | "down") =>
  list
    .filter((p) => p.change.dir === dir)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

function Section({ title, arrow, color, items }: { title: string; arrow: string; color: string; items: Product[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <span className={color}>{arrow}</span>
        {title}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

export default function HomeProducts({ products }: { products: Product[] }) {
  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <Section title="আজ দাম বেড়েছে" arrow="▲" color="text-red-600" items={top6(products, "up")} />
      <Section title="আজ দাম কমেছে" arrow="▼" color="text-green-600" items={top6(products, "down")} />
      <div id="products" className="scroll-mt-24">
        <h2 className="text-lg font-bold">সব পণ্য</h2>
        <p className="mt-1 text-sm text-gray-600">মোট {bn(products.length)}টি পণ্যের আজকের দর</p>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
