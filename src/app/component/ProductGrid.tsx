"use client"; // সাজানোর ধরন মনে রাখতে useState লাগে
import { useState } from "react"; // নির্বাচিত ধরন ধরে রাখতে
import type { Product } from "@/lib/types"; // পণ্যের ধরন
import ProductCard from "./ProductCard"; // একটি কার্ড

export default function ProductGrid({ products, title = "সব পণ্য", subtitle, sortable = true }: { products: Product[]; title?: string; subtitle?: string; sortable?: boolean }) { // সবগুলো ঐচ্ছিক, তাই ক্যাটাগরি পেজেও চলে
  const [sort, setSort] = useState("name"); // শুরুতে নাম অনুযায়ী
  const sorted = !sortable ? products : [...products].sort((a, b) => // sortable বন্ধ থাকলে API-র নিজের ক্রম রাখা, রেফারেন্সও তাই; না হলে সাজানো
    sort === "low" ? a.today - b.today : sort === "high" ? b.today - a.today : a.nameBn.localeCompare(b.nameBn, "bn") // কম দাম, বেশি দাম বা বাংলা বর্ণক্রম
  );

  return (
    <section className="mt-8"> {/* উপরের অংশ থেকে ফাঁক */}
      <div className="flex items-center justify-between"> {/* শিরোনাম বামে, ড্রপডাউন ডানে */}
        <div>
          <h2 className="text-lg font-bold">{title}</h2> {/* শিরোনাম */}
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>} {/* দিলে তবেই দেখানো */}
        </div>
        {sortable && ( // হোমে false, ক্যাটাগরি পেজে true
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded border px-2 py-1 text-sm"> {/* বদলালে তালিকা নতুন করে সাজবে */}
            <option value="name">নাম অনুযায়ী</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        )}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"> {/* মোবাইলে ১, ট্যাবলেটে ২, ডেস্কটপে ৩ কলাম */}
        {sorted.map((p) => <ProductCard key={p.id} p={p} />)} {/* প্রতিটি পণ্যের কার্ড */}
      </div>
    </section>
  );
}