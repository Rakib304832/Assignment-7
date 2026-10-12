"use client"
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
        const result: Category[] = await res.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-left pl-55">
      <div className="flex items-center gap-4">
        {data.map((n) => (
          <Link key={n.id} href={`/category/${n.slug}`} className="">
            <span>{n.icon}</span>
            <span>{n.nameBn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navlink;