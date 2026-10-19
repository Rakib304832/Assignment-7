"use client";
 
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
 
type SortKey = "default" | "price-asc" | "price-desc" | "up" | "down";
 
export default function ProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");
 
  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.today - b.today);
      case "price-desc":
        return list.sort((a, b) => b.today - a.today);
      case "up":
        return list.sort((a, b) => b.change.pct - a.change.pct);
      case "down":
        return list.sort((a, b) => a.change.pct - b.change.pct);
      default:
        return list;
    }
  }, [products, sort]);
 
  return (
    <section>
      {/* সাজান বার */}
      <div className="flex justify-end items-center gap-2 bg-white border border-[#E1E8E1] rounded-2xl p-4 mb-6">
        <label className="text-sm text-gray-600">সাজান</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
          <option value="up">দাম বেড়েছে আগে</option>
          <option value="down">দাম কমেছে আগে</option>
        </select>
      </div>
 
      <h3 className="text-lg font-bold text-[#1D271F]">সব পণ্য</h3>
      <p className="text-gray-500 text-sm mb-4">
        মোট {sorted.length}টি পণ্য দেখানো হচ্ছে
      </p>
 
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}