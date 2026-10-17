import { bn } from "@/lib/api"; // বাংলা অঙ্কে শতাংশ
import type { Product } from "@/lib/types"; // change-এর ধরন

export default function PriceChange({ change }: { change: Product["change"] }) { // কার্ড ও বিস্তারিত পেজ, দুই জায়গায় লাগে
  if (change.dir === "flat" || change.pct === 0) { // পরিবর্তন না থাকলে রেফারেন্সে তীর থাকে না
    return <span className="text-sm font-medium text-gray-500">{bn(0)}%</span>; // ধূসর "0%", দাম স্থির বোঝাতে
  }
  const up = change.dir === "up"; // বাড়া না কমা, রং ও চিহ্ন দুটোই এর উপর নির্ভর করে
  return (
    <span className={`text-sm font-medium ${up ? "text-red-600" : "text-green-600"}`}> {/* বাড়লে লাল, কমলে সবুজ */}
      {up ? "▲" : "▼"} {bn(change.pct)}% {/* API কমলে নিজেই ঋণাত্মক সংখ্যা দেয় (-12.4), তাই abs ছাড়া দিলে রেফারেন্সের মতো মাইনাস দেখায় */}
    </span>
  );
}