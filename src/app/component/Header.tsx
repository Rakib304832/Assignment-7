"use client";


import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { signOut, useSession } from "@/lib/auth-client";
import Navlink from "./Navlink";
import TodayDate from "./TodayDate";

export default function Header() {
  const [openPath, setOpenPath] = useState<string | null>(null);

  const pathname = usePathname();
  const { data: session } = useSession();

  const open = openPath === pathname;

  const userName = session?.user?.name ?? "User";
  const firstName = userName.split(" ")[0] || userName;
  const firstLetter = firstName.trim().charAt(0).toUpperCase() || "U";
  const userImage = session?.user?.image;

  const sessionMenu = useMemo(
    () => (
      <div className="relative ">
        <button
          onClick={() => setOpenPath(open ? null : pathname)}
          className="flex max-w-[48vw] items-center gap-2 text-sm font-medium sm:max-w-none"
          type="button"
        >
          {userImage ? (
            <Image
              src={userImage}
              alt="Avatar"
              width={32}
              height={32}
              unoptimized
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (<span className="grid h-8 w-8 place-items-center rounded-full bg-green-100 text-green-700">
            {firstLetter}
          </span>)}
          <span className="max-w-[24vw] truncate sm:max-w-none">{firstName}</span>
          <span aria-hidden="true">▾</span>
        </button>
        {open && (
          <div className="absolute right-0 z-10 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
            <p className="text-sm font-semibold">{userName}</p>
            <p className="mb-3 break-all text-xs text-gray-500">{session?.user?.email ?? ""}</p>
            <Link
              href="/profile"
              onClick={() => setOpenPath(null)}
              className="block py-2 text-sm hover:text-green-700"
            >
              আমার প্রোফাইল

            </Link>
            <button
              type="button"
              onClick={() => {
                void signOut();
                setOpenPath(null);
              }}
              className="block py-2 text-sm text-red-600"
            >
              সাইন আউট
            </button>
          </div>
        )}
      </div>
    ),
    [firstLetter, firstName, open, pathname, session?.user?.email, userName, userImage]
  );

  return (
    <header className="border-b border-gray-200 bg-white ">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-12">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-600">
            <Image
              src="/logo-icon.png"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-xl"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-bold leading-tight">বাজার দর</span>
            <TodayDate className="block text-xs text-gray-500" />
          </span>
        </Link>
        {session ? (
          sessionMenu
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <Link href="/component/Signin" className="font-medium">
              সাইন ইন
            </Link>
            <Link
              href="/component/Signup"
              className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
      {pathname.startsWith("/productdetails/") ? null : <Navlink />}
    </header>
  );
}
