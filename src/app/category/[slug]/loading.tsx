import LoadingSplash from "@/app/component/LoadingSplash"; // ৫ নম্বর ফাইল

export default function Loading() { // ফাইলের নাম loading.tsx হলে Next.js পেজের ডেটা আসা পর্যন্ত এটা নিজেই দেখায়
  return <LoadingSplash text="ক্যাটাগরির তথ্য লোড হচ্ছে..." />; // ভিডিওর বার্তা
}