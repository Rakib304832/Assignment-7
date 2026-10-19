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
    <div className="my-6 px-4 max-w-7xl mx-auto">
      {/* তালিকা ও ড্রপডাউন এই client component সামলায় */}
      {/* Banner */}
      <div className="bg-[#FAFCFA] border border-[#E1E8E1] rounded-2xl p-4 sm:p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-[#F0F5F0] rounded-xl text-3xl sm:text-4xl">
            {cat?.icon || "📦"}
          </div>

          {/* Category Info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F]">
              {cat?.nameBn || "ক্যাটাগরি"}
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              মোট <span className="font-semibold text-gray-800">{bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</span>
            </p>
          </div>
        </div>
      </div>

      {/* Sort + Product List */}
      <ProductGrid products={products} /> 
    </div>
  );
}