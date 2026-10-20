import Link from "next/link";
import { bn } from "@/lib/api";
import type { Product } from "@/lib/types";
import PriceChange from "./PriceChange";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/productdetails/${product.id}`}
      className="block rounded-2xl border border-[#E1E8E1] bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <p className="break-words font-semibold text-[#1D271F]">{product.nameBn}</p>
          <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-xs text-gray-500">আজকের দাম</p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <p className="text-2xl font-semibold text-[#1D271F]">
            {bn(product.today)} টাকা
          </p>
          <PriceChange change={product.change} />
        </div>
      </div>
    </Link>
  );
}
