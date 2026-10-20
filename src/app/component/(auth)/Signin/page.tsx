"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa"

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSocial = async (provider: "google" | "github") => {
    setErrorMessage(null);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message ?? "সোশ্যাল সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।"
      );
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message ?? "সাইন ইন করা যায়নি। ইমেইল ও পাসওয়ার্ড পরীক্ষা করুন।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-green-50 px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন
      </p>
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) =>
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ? null
                : "সঠিক ইমেইল ঠিকানা দিন"
            }
          >
            <Label className="text-sm font-semibold">ইমেইল</Label>
            <Input
              name="email"
              className={inputClass}
              autoComplete="email"
              placeholder="you@example.com"
            />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            name="password"
            type="password"
            className="flex flex-col gap-1.5"
          >
            <Label className="text-sm font-semibold">পাসওয়ার্ড</Label>
            <Input
              name="password"
              className={inputClass}
              autoComplete="current-password"
              placeholder="আপনার পাসওয়ার্ড লিখুন"
            />
            <FieldError />
          </TextField>
          {errorMessage && (
            <p role="alert" className="text-sm text-red-600">
              {errorMessage}
            </p>
          )}
          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white shadow-md hover:bg-green-800"
          >
            {isSubmitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </Button>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            অথবা
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              onPress={() => handleSocial("google")}
              className="flex-1 rounded-xl border border-gray-200 bg-white py-3 font-medium text-gray-700"
            >
              <span className="flex items-center justify-center gap-2">
                <FcGoogle size={20} />
                Google
              </span>
            </Button>
            <Button
              type="button"
              onPress={() => handleSocial("github")}
              className="flex-1 rounded-xl border border-gray-200 bg-white py-3 font-medium text-gray-700"
            >
              <span className="flex items-center justify-center gap-2">
                <FaGithub size={20} />
                GitHub
              </span>
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/component/Signup"
              className="font-medium text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </Form>
      </div>
      <Link href="/" className="mt-6 text-sm text-gray-500 hover:text-gray-700">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
