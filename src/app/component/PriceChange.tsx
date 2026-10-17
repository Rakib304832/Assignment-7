import { bn } from "@/lib/api"; // বাংলা অঙ্কে শতাংশ দেখানোর জন্য
import type { Product } from "@/lib/types"; // change-এর ধরন আবার না লিখে নেওয়া

export default function PriceChange({ change }: { change: Product["change"] }) { // শুধু change অংশটুকুই দরকার
  const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "–"; // দিক অনুযায়ী চিহ্ন
  const color = change.dir === "up" ? "text-red-600" : change.dir === "down" ? "text-green-600" : "text-gray-500"; // দাম বাড়লে লাল, কমলে সবুজ, যেমনটা ভিডিওতে
  return <span className={`text-sm font-medium ${color}`}>{arrow} {bn(Math.abs(change.pct))}%</span>; // API ঋণাত্মক সংখ্যা দেয় (-2.9), তাই abs, নইলে ▼ এর সাথে "-" দুইবার দেখাত
}