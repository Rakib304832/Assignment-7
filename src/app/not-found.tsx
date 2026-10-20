import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-lg sm:p-8">
        <div className="flex items-center justify-center gap-2">
          <span aria-hidden="true" className="rounded-xl bg-emerald-500 p-3 text-white shadow-md">
            🛒
          </span>
          <span className="text-2xl font-bold text-gray-800">বাজার দর</span>
        </div>
        <h1 className="text-6xl font-extrabold tracking-wider text-emerald-600 sm:text-7xl">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
            দুঃখিত, এই পাতাটি আমাদের গলি-রাস্তায় কোথাও নেই!
          </h2>
          <p className="text-sm text-gray-500">
            বোধহয় ভুল মোড়ে ঘুরে গেছেন বা কোনো পুরনো গলিতে হারিয়ে গেছেন!
          </p>
        </div>
        <Link
          href="/"
          className="inline-block w-full rounded-xl bg-emerald-500 px-6 py-3 font-medium text-white shadow-md transition-colors duration-200 hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          বাজারের মূল প্রবেশপথে ফিরে যান
        </Link>
      </div>
    </main>
  );
}