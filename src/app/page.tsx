"use c"
import { Suspense } from "react";

import Banner from "./component/Banner";
import { BASE } from "@/lib/api";
import type { Product } from "@/lib/types";
import HomeProducts from "@/app/component/HomeProducts";

async function ProductsSection() {
  const res = await fetch(`${BASE}/products`, { cache: "no-store" });
  const data = await res.json();
  const products: Product[] = Array.isArray(data)
    ? data
    : data.data ?? data.products ?? data.items ?? [];

  return <HomeProducts products={products} />;
}

export default function Home() {
  return (
    <div>
      
      <Banner />
      <Suspense
        fallback={
          <div className="mx-auto max-w-5xl p-6 text-sm text-gray-500" aria-label="পণ্য লোড হচ্ছে">
            পণ্য লোড হচ্ছে...
          </div>
        }
      >
        <ProductsSection />
      </Suspense>
    </div>
  );
}
