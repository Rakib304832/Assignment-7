import LoadingSplash from "@/app/component/LoadingSplash"; // একই লোডিং ডিজাইন আবার ব্যবহার

export default function Loading() { // ডেটা আসা পর্যন্ত Next.js নিজে দেখাবে
  return <LoadingSplash text="তথ্য লোড হচ্ছে..." />; // দ্বিতীয় ভিডিওর বার্তা
}