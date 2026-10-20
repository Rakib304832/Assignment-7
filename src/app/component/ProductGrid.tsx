"use client";
import { useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, title = "সব পণ্য", subtitle, sortable = true }: { products: Product[]; title?: string; subtitle?: string; sortable?: boolean }) {
  const [sort, setSort] = useState("default");
  const sorted = !sortable || sort === "default" ? products : [...products].sort((a, b) =>
    sort === "low" ? a.today - b.today : sort === "high" ? b.today - a.today : a.nameBn.localeCompare(b.nameBn, "bn")
  );

  return (
    <section className="mt-6">
      {sortable && (
        <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur sm:p-5">
          <label htmlFor="sort" className="text-sm text-gray-600">সাজান</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="max-w-full rounded-lg border bg-white px-3 py-2 text-sm">
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
          </select>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle ?? `মোট ${products.length}টি পণ্য দেখানো হচ্ছে`}</p>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}