import Link from "next/link"; // রিলোড ছাড়া বিস্তারিত পেজে যেতে
import { bn } from "@/lib/api"; // বাংলা অঙ্কে দাম
import type { Product } from "@/lib/types"; // পণ্যের ধরন
import PriceChange from "./PriceChange"; // ▲▼ ও শতাংশ

export default function ProductCard({ p }: { p: Product }) { // হোমের তিন অংশ ও ক্যাটাগরি পেজে একই কার্ড, তাই এক জায়গায় লেখা
  return (
    <Link href={`/productdetails/${p.id}`} className="rounded-xl border bg-white p-4 shadow-sm hover:shadow-md"> {/* পুরো কার্ড ক্লিকযোগ্য, হোভারে ছায়া */}
      <div className="flex items-center gap-2"> {/* আইকন ও নাম পাশাপাশি */}
        <span className="text-2xl">{p.image}</span> {/* পণ্যের আইকন */}
        <div>
          <p className="font-semibold">{p.nameBn}</p> {/* পণ্যের নাম */}
          <p className="text-xs text-gray-500">প্রতি {p.unit}</p> {/* একক */}
        </div>
      </div>
      <div className="mt-3"> {/* লেখা, দাম ও পরিবর্তন একসাথে */}
        <p className="text-xs text-gray-500">আজকের দর</p> {/* Figma-র ছোট লেখা; শব্দ অনুমান, মিলিয়ে নিন */}
        <div className="flex items-end justify-between"> {/* দাম বামে, পরিবর্তন ডানে */}
          <p className="text-2xl font-bold">{bn(p.today)} টাকা</p> {/* আজকের দাম */}
          <PriceChange change={p.change} /> {/* ▲▼ ও শতাংশ */}
        </div>
      </div>
    </Link>
  );
}