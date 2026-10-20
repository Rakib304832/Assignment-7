import { BASE, bn } from "@/lib/api";
import type { Product } from "@/lib/types";
import ProductGrid from "@/app/component/ProductGrid";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [cat, products] = await Promise.all([
    fetch(`${BASE}/categories/${slug}`, { cache: "no-store" }).then((r) => r.json()),
    fetch(`${BASE}/products?category=${slug}`, { cache: "no-store" }).then((r) => r.json() as Promise<Product[]>),
  ]);

  return (
    <div className="w-full p-4">
      <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur sm:p-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">{cat.icon}</span>
        <div className="min-w-0">
          <h1 className="wrap-break-word text-2xl font-bold">{cat.nameBn}</h1>
          <p className="text-sm text-gray-600">মোট {bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}