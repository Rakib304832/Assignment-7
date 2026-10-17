export type Market = { market: string; division: string; min: number; max: number }; // টেবিলের এক সারি; ফিল্ড ভুল লিখলে TypeScript আগেই ধরবে

export type Product = { // API-র পণ্যের গঠন, ভিডিও থেকে দেখে লেখা
  id: number; // বিস্তারিত পেজের লিংকে লাগে
  slug: string; // পণ্যের ইউনিক নাম
  nameBn: string; // বাংলা নাম দেখানোর জন্য
  category: string; // কোন ক্যাটাগরির তা জানতে
  categoryNameBn: string; // ক্যাটাগরির বাংলা নাম
  categoryIcon: string; // ক্যাটাগরির আইকন (ইমোজি)
  unit: string; // kg বা লিটার, "প্রতি _" লিখতে
  image: string; // পণ্যের আইকন (ইমোজি)
  today: number; // আজকের দাম
  yesterday: number; // তুলনার জন্য
  lastWeek: number; // তুলনার জন্য
  lastMonth: number; // তুলনার জন্য
  change: { dir: "up" | "down" | "flat"; pct: number }; // ▲▼ ও শতাংশ দেখানোর জন্য
  markets: Market[]; // বাজারভিত্তিক দামের টেবিল
};