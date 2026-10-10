import Image from "next/image";
import Link from "next/link"; 

const today = new Date().toLocaleDateString("bn-BD", { 
  weekday: "long", 
  day: "numeric", 
  month: "long",   
  year: "numeric", 
});

const Banner = () => { 
  return (
    <section className="mx-auto max-w-6xl px-4 mt-6">
      <div className="flex flex-col-reverse items-center justify-between gap-6 rounded-3xl bg-gray-100 p-6 md:flex-row md:p-10"> 

        <div className="flex-1"> 
          <span
            className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700" 
            suppressHydrationWarning 
          >
            {today} 
          </span>

          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl"> 
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
            গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#products" 
            className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-green-700" // সবুজ বাটন
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="flex-1 flex justify-center md:justify-end"> 
          <Image
            src="/bazar-hero.png" 
            alt="বাজারের ঝুড়ি" 
            width={380}
            height={300} 
            priority 
          />
        </div>
      </div>
    </section>
  );
};
export default Banner; 