"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) router.push("/component/signin");
  }, [isPending, session, router]);

  if (!session) return <p className="p-4 sm:p-6">লোড হচ্ছে...</p>;

  const { name, email, image } = session.user;
  const firstLetter = name?.trim().charAt(0).toUpperCase() || "?";

  const update = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newName = new FormData(e.currentTarget).get("name") as string;
    await authClient.updateUser({ name: newName });
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <h1 className="text-2xl font-bold sm:text-3xl">আমার প্রোফাইল</h1>
      <div className="mt-6 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          {image ? (
            <Image
              src={image}
              alt="Avatar"
              width={48}
              height={48}
              unoptimized
              referrerPolicy="no-referrer"
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-green-100 text-green-700">
              {firstLetter}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate font-semibold">{name}</p>
            <p className="break-all text-sm text-gray-500">{email}</p>
          </div>
        </div>
        <button
          onClick={() => authClient.signOut().then(() => router.push("/"))}
          className="min-h-11 w-full rounded-lg border border-red-500 px-5 py-2 text-sm text-red-600 sm:w-auto"
        >
          সাইন আউট
        </button>
      </div>
      <form onSubmit={update} className="mt-6 rounded-xl border p-4 sm:p-6">
        <h2 className="mb-3 font-semibold">তথ্য</h2>
        <input name="name" defaultValue={name} className="min-h-11 w-full rounded-lg border p-2" />
        <button className="mt-4 min-h-11 w-full rounded-lg bg-green-600 py-2 text-white">আপডেট</button>
      </form>
    </main>
  );
}