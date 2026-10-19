import { bn } from "@/lib/api"; // মোট পণ্যসংখ্যা বাংলা অঙ্কে
import type { Product } from "@/lib/types"; // পণ্যের ধরন
import ProductCard from "./ProductCard"; // এখানে ProductGrid নয়, কার্ড লাগবে, নইলে প্রতি অংশে ড্রপডাউন ও বর্ণক্রম এসে যায়
import ProductGrid from "./ProductGrid"; // শুধু নিচের "সব পণ্য" তালিকায়

const top6 = (list: Product[], dir: "up" | "down") => // বাড়া ও কমা, দুই অংশে একই কাজ
  list
    .filter((p) => p.change.dir === dir) // শুধু বাড়া বা শুধু কমা পণ্য
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct)) // সবচেয়ে বেশি পরিবর্তন আগে
    .slice(0, 6); // Figma-র মতো ৬টি

function Section({ title, arrow, color, items }: { title: string; arrow: string; color: string; items: Product[] }) { // দুই অংশের নকশা এক
  if (items.length === 0) return null; // পণ্য না থাকলে ফাঁকা শিরোনাম না দেখানো
  return (
    <section className="mt-8"> {/* অংশগুলোর মাঝে ফাঁক */}
      <h2 className="flex items-center gap-2 text-lg font-bold"> {/* চিহ্ন ও লেখা পাশাপাশি */}
        <span className={color}>{arrow}</span> {/* শুধু চিহ্নটা রঙিন */}
        {title}
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"> {/* তিন কলামের গ্রিড */}
        {items.map((p) => <ProductCard key={p.id} product={p} />)} {/* প্রতিটি পণ্যের কার্ড */}
      </div>
    </section>
  );
}

export default function HomeProducts({ products }: { products: Product[] }) { // page.tsx থেকে সব পণ্য আসবে
  return (
    <div className="mx-auto w-full max-w-5xl p-6"> {/* w-full না দিলে layout-এর flex-col body-তে কম্পোনেন্ট ছোট হয়ে মাঝখানে জমে যায় */}
      <Section title="আজ দাম বেড়েছে" arrow="▲" color="text-red-600" items={top6(products, "up")} /> {/* প্রথম অংশ */}
      <Section title="আজ দাম কমেছে" arrow="▼" color="text-green-600" items={top6(products, "down")} /> {/* দ্বিতীয় অংশ */}
      <div id="products" className="scroll-mt-24"> {/* Banner-এর বাটন এখানে স্ক্রল করবে */}
        <h2 className="text-lg font-bold">সব পণ্য</h2>
        <p className="mt-1 text-sm text-gray-600">মোট {bn(products.length)}টি পণ্যের আজকের দর</p>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
