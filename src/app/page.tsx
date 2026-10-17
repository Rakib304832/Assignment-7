import { Suspense } from "react";
import PriceTicker from "./component/PriceTicker";
import Banner from "./component/Banner";
import { BASE } from "@/lib/api";
import type { Product } from "@/lib/types";
import HomeProducts from "@/app/component/HomeProducts";

export default async function Home() {
  const res = await fetch(`${BASE}/products`, { cache: "no-store" });
  const data = await res.json();
  const products: Product[] = Array.isArray(data)
    ? data
    : data.data ?? data.products ?? data.items ?? [];

  return (
    <div>
      <Suspense fallback={<div className="h-8" aria-label="দাম লোড হচ্ছে" />}>
        <PriceTicker />
      </Suspense>
      <Banner />
      <HomeProducts products={products} />
    </div>
  );
}
