 import { BASE, bn } from "@/lib/api"; // API ঠিকানা ও বাংলা অঙ্ক
import type { Product } from "@/lib/types"; // পণ্যের ধরন
import PriceChange from "@/app/component/PriceChange"; // ▲▼ অংশ

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) { // সার্ভারে ডেটা আনব
  const { id } = await params; // URL থেকে পণ্যের id
  const p: Product = await fetch(`${BASE}/products/${id}`, { cache: "no-store" }).then((r) => r.json()); // এই একটি পণ্যের ডেটা

  const low = Math.min(...p.markets.map((m) => m.min)); // সব বাজারের মধ্যে সবচেয়ে কম দাম
  const high = Math.max(...p.markets.map((m) => m.max)); // সব বাজারের মধ্যে সবচেয়ে বেশি দাম
  const avg = Math.round(p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length); // প্রতি বাজারের মাঝামাঝি দামের গড়; API সরাসরি গড় দেয় না তাই নিজে হিসাব

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6"> {/* অংশগুলোর মাঝে ফাঁক */}
      <div className="flex items-center justify-between rounded-xl border bg-white p-5 shadow-sm"> {/* উপরের কার্ড: নাম বামে, দাম ডানে */}
        <div className="flex items-center gap-3">
          <span className="text-4xl">{p.image}</span> {/* পণ্যের আইকন */}
          <div>
            <h1 className="text-2xl font-bold">{p.nameBn}</h1> {/* পণ্যের নাম */}
            <p className="text-sm text-gray-500">প্রতি {p.unit} দাম</p> {/* একক */}
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">{bn(p.today)} টাকা</p> {/* আজকের দাম */}
          <PriceChange change={p.change} /> {/* ▲▼ ও শতাংশ */}
        </div>
      </div>

      <section> {/* দামের সারসংক্ষেপ */}
        <h2 className="mb-3 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3"> {/* তিনটি কার্ড পাশাপাশি */}
          <div className="rounded-xl border bg-white p-4"><p className="text-xs text-gray-500">সর্বনিম্ন দাম</p><p className="text-2xl font-bold text-green-600">{bn(low)} টাকা</p></div> {/* সবুজ, কারণ কম দাম ভালো */}
          <div className="rounded-xl border bg-white p-4"><p className="text-xs text-gray-500">সর্বোচ্চ দাম</p><p className="text-2xl font-bold text-red-600">{bn(high)} টাকা</p></div> {/* লাল, কারণ বেশি দাম খারাপ */}
          <div className="rounded-xl border bg-white p-4"><p className="text-xs text-gray-500">গড় দাম</p><p className="text-2xl font-bold">{bn(avg)} টাকা</p></div> {/* মাঝামাঝি, তাই সাধারণ রং */}
        </div>
      </section>

      <section> {/* বাজারভিত্তিক টেবিল */}
        <h2 className="mb-3 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-xl border bg-white"> {/* ছোট পর্দায় টেবিল ভেঙে না গিয়ে স্ক্রল করতে */}
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500"> {/* হেডার সারি */}
              <tr><th className="p-3">বাজার</th><th className="p-3">বিভাগ</th><th className="p-3">সর্বনিম্ন</th><th className="p-3">সর্বোচ্চ</th><th className="p-3">গড়</th></tr>
            </thead>
            <tbody>
              {p.markets.map((m) => ( // প্রতিটি বাজারের জন্য একটি সারি
                <tr key={m.market} className="border-t"> {/* key হিসেবে বাজারের নাম, কারণ প্রতিটি পণ্যে বাজার আলাদা */}
                  <td className="p-3">{m.market}</td>
                  <td className="p-3">{m.division}</td>
                  <td className="p-3">{bn(m.min)} টাকা</td>
                  <td className="p-3">{bn(m.max)} টাকা</td>
                  <td className="p-3">{bn(Math.round((m.min + m.max) / 2))} টাকা</td> {/* এই বাজারের গড় */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}