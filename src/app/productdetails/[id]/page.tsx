import { BASE } from "@/lib/api";
import type { Product } from "@/lib/types";
import { notFound } from "next/navigation"
import PriceChange from "@/app/component/PriceChange";

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`${BASE}/products/${id}`, { cache: "no-store" });
  if (!res.ok) notFound();
  const p: Product = await res.json();

  const hasMarkets = p.markets.length > 0;
  const minPrice = hasMarkets ? Math.min(...p.markets.map((m) => m.min)) : p.today;
  const maxPrice = hasMarkets ? Math.max(...p.markets.map((m) => m.max)) : p.today;
  const avg = hasMarkets
    ? Math.round(p.markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) / p.markets.length)
    : p.today;
  const dir = p.change.dir;
  const changeText = dir === "up" ? "বেড়েছে" : dir === "down" ? "কমেছে" : "অপরিবর্তিত";
  const changeColor = dir === "up" ? "text-red-600" : dir === "down" ? "text-green-600" : "text-gray-500";
  const cards = [
    { label: "সর্বনিম্ন দাম", value: minPrice, color: "text-green-600", note: "সবচেয়ে কম দামের বাজার" },
    { label: "সর্বাধিক দাম", value: maxPrice, color: "text-red-600", note: "সবচেয়ে বেশি দামের বাজার" },
    { label: "গড় দাম", value: avg, color: "text-green-700", note: `প্রতি ${p.unit}-এর হিসাবে` },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 text-gray-900 sm:px-6 sm:py-8">
      <section className="flex flex-col gap-4 rounded-2xl border border-[#e1eae3] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-2xl border border-green-100 bg-green-50 text-3xl">{p.image}</span>
          <div className="min-w-0">
            <h1 className="wrap-break-word text-2xl font-bold">{p.nameBn}</h1>
            <p className="text-sm text-gray-500">প্রতি {p.unit} দাম</p>
            <p className={`mt-1 text-xs ${changeColor}`}>গতকালের তুলনায় দাম {changeText}{dir !== "flat" && ` - ${Math.abs(p.change.pct)}%`}</p>
          </div>
        </div>
        <div className="rounded-xl border border-green-100 bg-green-50/70 p-4 text-right">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold text-green-700">{p.today} <span className="text-base font-normal">টাকা</span></p>
          <p className="text-xs text-gray-500">প্রতি {p.unit}</p>
          <PriceChange change={p.change} />
        </div>
      </section>
      <section className="rounded-2xl border border-[#e1eae3] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map((c) => (
            <div key={c.label} className="rounded-xl border border-[#e2e9e4] bg-[#fdfefd] p-4 shadow-sm">
              <p className="text-xs text-gray-500">{c.label}</p>
              <p className={`mt-1 text-3xl font-bold ${c.color}`}>{c.value} <span className="text-sm font-normal">টাকা</span></p>
              <p className="mt-1 text-xs text-gray-400">{c.note}</p>
            </div>
          ))}
        </div>
        <h2 className="mb-4 mt-8 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-xl border border-[#e2e9e4] bg-white">
          <table className="w-full min-w-xl text-sm">
            <thead className="bg-[#f7faf8] text-gray-500">
              <tr>
                <th scope="col" className="p-3 text-left font-medium">বাজার</th>
                <th scope="col" className="p-3 text-left font-medium">বিভাগ</th>
                <th scope="col" className="p-3 text-right font-medium">সর্বনিম্ন</th>
                <th scope="col" className="p-3 text-right font-medium">সর্বাধিক</th>
                <th scope="col" className="p-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {p.markets.map((m, i) => (
                <tr key={`${m.market}-${i}`} className="border-t">
                  <td className="p-3">{m.market}</td>
                  <td className="p-3 text-gray-500">{m.division}</td>
                  <td className="p-3 text-right">{m.min} টাকা</td>
                  <td className="p-3 text-right">{m.max} টাকা</td>
                  <td className="p-3 text-right font-medium">{Math.round((m.min + m.max) / 2)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}