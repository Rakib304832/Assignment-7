

import Link from "next/link";


interface Category {
  id: number;
  icon: string;
  nameBn: string;
  slug: string;
  Scrapable?: boolean;
}

const Navlink = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
  const data: Category[] = await res.json();
  
 

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