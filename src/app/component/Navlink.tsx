"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  icon: string;
  nameBn: string;
  slug: string;
  Scrapable?: boolean;
}

const Navlink = () => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const result: Category[] = await res.json();
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    void fetchData();
  }, []);

  return (
    <nav aria-label="Category navigation" className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navlink;