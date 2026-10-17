import { BASE, bn } from "@/lib/api"; // API-র ঠিকানা ও বাংলা অঙ্ক
import type { Product } from "@/lib/types"; // পণ্যের ধরন
import ProductGrid from "@/app/component/ProductGrid"; // নিচের তালিকা ও সাজানো

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) { // সার্ভারেই ডেটা আনব তাই async
  const { slug } = await params; // URL-এর chal/dal/tel অংশ
  const [cat, products] = await Promise.all([ // দুটো API একসাথে ডাকলে অপেক্ষা কম লাগে
    fetch(`${BASE}/categories/${slug}`, { cache: "no-store" }).then((r) => r.json()), // উপরের কার্ডের নাম ও আইকন
    fetch(`${BASE}/products?category=${slug}`, { cache: "no-store" }).then((r) => r.json() as Promise<Product[]>), // শুধু এই ক্যাটাগরির পণ্য; দাম বদলায় তাই cache বন্ধ
  ]);

  return (
    <div className="mx-auto max-w-5xl p-6"> {/* কন্টেন্ট মাঝখানে */}
      <div className="rounded-xl border bg-white p-5 shadow-sm"> {/* উপরের কার্ড */}
        <h1 className="text-2xl font-bold">{cat.icon} {cat.nameBn}</h1> {/* ক্যাটাগরির আইকন ও নাম */}
        <p className="text-sm text-gray-500">মোট {bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p> {/* ভিডিওর উপশিরোনাম, সংখ্যা API থেকে গুনে নেওয়া */}
      </div>
      <ProductGrid products={products} /> {/* তালিকা ও ড্রপডাউন এই client component সামলায় */}
    </div>
  );
}