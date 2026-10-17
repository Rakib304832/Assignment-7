"use client"; // useState ব্যবহার হচ্ছে, যা শুধু ব্রাউজারে চলে
import { useState } from "react"; // নির্বাচিত সাজানোর ধরন মনে রাখতে
import Link from "next/link"; // কার্ডে ক্লিক করলে রিলোড ছাড়া বিস্তারিত পেজে যেতে
import { bn } from "@/lib/api"; // বাংলা অঙ্ক
import type { Product } from "@/lib/types"; // পণ্যের ধরন
import PriceChange from "./PriceChange"; // ▲▼ অংশ

export default function ProductGrid({ products }: { products: Product[] }) { // সার্ভার পেজ থেকে পণ্যের তালিকা আসবে
  const [sort, setSort] = useState("name"); // শুরুতে নাম অনুযায়ী সাজানো
  const sorted = [...products].sort((a, b) => // [...] দিয়ে কপি করা, নইলে মূল props বদলে যায় যা React-এ নিষিদ্ধ
    sort === "low" ? a.today - b.today : sort === "high" ? b.today - a.today : a.nameBn.localeCompare(b.nameBn, "bn") // কম দাম, বেশি দাম বা বাংলা বর্ণক্রম
  );

  return (
    <section className="mt-6"> {/* উপরের কার্ড থেকে একটু ফাঁক রাখতে */}
      <div className="flex items-center justify-between"> {/* শিরোনাম বামে, ড্রপডাউন ডানে */}
        <h2 className="text-lg font-bold">সব পণ্য</h2> {/* ভিডিওর শিরোনাম */}
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded border px-2 py-1 text-sm"> {/* বদলালেই state বদলে তালিকা নতুন করে সাজাবে */}
          <option value="name">নাম অনুযায়ী</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"> {/* মোবাইলে ১, ট্যাবলেটে ২, ডেস্কটপে ৩ কলাম */}
        {sorted.map((p) => ( // প্রতিটি পণ্যের জন্য একটি কার্ড
          <Link key={p.id} href={`/productdetails/${p.id}`} className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md"> {/* পুরো কার্ডই ক্লিকযোগ্য, হোভারে ছায়া */}
            <div className="flex items-center gap-2"> {/* আইকন ও নাম পাশাপাশি */}
              <span className="text-2xl">{p.image}</span> {/* পণ্যের আইকন */}
              <div>
                <p className="font-semibold">{p.nameBn}</p> {/* পণ্যের নাম */}
                <p className="text-xs text-gray-500">প্রতি {p.unit}</p> {/* একক: kg বা লিটার */}
              </div>
            </div>
            <div className="mt-3 flex items-end justify-between"> {/* দাম বামে, পরিবর্তন ডানে */}
              <p className="text-xl font-bold">{bn(p.today)} টাকা</p> {/* আজকের দাম */}
              <PriceChange change={p.change} /> {/* ▲▼ ও শতাংশ */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}