"use client"; // hook ব্যবহার হবে
import { useEffect } from "react"; // redirect এর জন্য
import { useRouter } from "next/navigation"; // পেজ বদলানোর জন্য
import Image from "next/image";
import { authClient } from "@/lib/auth-client"; // auth client

export default function ProfilePage() {
  const router = useRouter(); // router
  const { data: session, isPending } = authClient.useSession(); // ইউজারের সেশন

  useEffect(() => {
    if (!isPending && !session) router.push("/component/signin"); // লগইন না থাকলে signin এ পাঠাও
  }, [isPending, session, router]);

  if (!session) return <p className="p-6">লোড হচ্ছে...</p>; // সেশন আসার আগে লোডিং

  const { name, email, image } = session.user; // দরকারি তথ্য আলাদা করা
  const firstLetter = name?.trim().charAt(0).toUpperCase() || "?";

  const update = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // পেজ রিলোড বন্ধ
    const newName = new FormData(e.currentTarget).get("name") as string; // ইনপুট থেকে নাম নাও
    await authClient.updateUser({ name: newName }); // নাম সেভ করো
  };

  return (
    <div className="mx-auto max-w-3xl mt-30 p-6"> {/* মাঝখানে কন্টেইনার */}
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1> {/* হেডিং */}

      <div className="mt-6 flex items-center justify-between rounded-xl border p-4"> {/* প্রোফাইল কার্ড */}
        <div className="flex items-center gap-4">
          {image ? (
            <Image
              src={image}
              alt="Avatar"
              width={32}
              height={32}
              unoptimized
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <span className="grid h-8 w-8 place-items-center rounded-full bg-green-100 text-green-700">
              {firstLetter}
            </span>
          )}
          <div>
            <p className="font-semibold">{name}</p> {/* নাম */}
            <p className="text-sm text-gray-500">{email}</p> {/* ইমেইল */}
          </div>
        </div>
        <button
          onClick={() => authClient.signOut().then(() => router.push("/"))} // সাইন আউট করে হোমে
          className="rounded-lg border border-red-500 ml-20 px-5 py-1 text-sm text-red-600"
        >
          সাইন আউট
        </button>
      </div>

      <form onSubmit={update} className="mt-6 rounded-xl border p-4"> {/* তথ্য ফর্ম */}
        <h2 className="mb-3 font-semibold">তথ্য</h2>
        <input name="name" defaultValue={name} className="w-full rounded-lg border p-2" /> {/* নাম ইনপুট */}
        <button className="mt-4 w-full rounded-lg bg-green-600 py-2 text-white">আপডেট</button> {/* সাবমিট */}
      </form>
    </div>
  );
}