import { NextRequest, NextResponse } from "next/server"; // request/response টাইপ
import { getSessionCookie } from "better-auth/cookies"; // সেশন কুকি পড়ার জন্য

export function proxy(request: NextRequest) { // প্রতিটি matched রিকোয়েস্টে চলে
  const session = getSessionCookie(request); // কুকি থেকে সেশন নাও

  if (!session) { // লগইন না থাকলে
    const url = new URL("/component/Signin", request.url); // তোমার ফোল্ডারের নাম অনুযায়ী (বড় হাতের S)
    url.searchParams.set("callbackUrl", request.nextUrl.pathname); // ফেরার পথ সেভ করো
    return NextResponse.redirect(url); // সাইন-ইনে পাঠাও
  }

  return NextResponse.next(); // লগইন থাকলে যেতে দাও
}

export const config = {
  matcher: ["/category/:path*", "/productdetails/:path*", "/profile"], // সুরক্ষিত রুট
};