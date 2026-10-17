"use client"; // Needed because we use useState and event handlers (Next.js App Router)

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signIn, signUp } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// Shared input style so all four fields look identical without repeating classes
const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600";

export default function SignUpPage() {
  const [password, setPassword] = useState("");
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const submittedPassword = String(formData.get("password") ?? "");

    try {
      const { error } = await signUp.email({
        name,
        email,
        password: submittedPassword,
      });

      if (error) {
        setErrorMessage(error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/");
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
    // Light green page background, content centered both ways
    <div className="flex min-h-screen flex-col items-center justify-center bg-green-50 px-4 py-10">
      {/* Heading sits outside the card, like in the screenshot */}
      <h1 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-6 mt-1 text-sm text-gray-500">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      {/* max-w-md keeps the card narrow; w-full lets it shrink on small phones */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* w-full (instead of w-96) so the form fills the card and never overflows on mobile */}
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          {/* Name */}
          <TextField isRequired name="name" type="text" className="flex flex-col gap-1.5">
            <Label className="text-sm font-semibold">নাম</Label>
            <Input name="name" className={inputClass} placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              // Basic email pattern check so obviously wrong emails are caught before submit
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল ঠিকানা দিন";
              }
              return null;
            }}
          >
            <Label className="text-sm font-semibold">ইমেইল</Label>
            <Input name="email" className={inputClass} placeholder="you@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            className="flex flex-col gap-1.5"
            value={password}
            onChange={setPassword} // Keep state in sync so confirm field can compare
            validate={(value) => {
              if (value.length < 8) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              if (!/[A-Z]/.test(value)) return "কমপক্ষে একটি বড় হাতের অক্ষর দিন";
              if (!/[0-9]/.test(value)) return "কমপক্ষে একটি সংখ্যা দিন";
              return null;
            }}
          >
            <Label className="text-sm font-semibold">পাসওয়ার্ড</Label>
            <Input name="password" className={inputClass} placeholder="কমপক্ষে ৮ অক্ষর" />
            <FieldError />
          </TextField>

          {/* Confirm password */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              // Must match the first password field, otherwise the user may have mistyped
              if (value !== password) return "পাসওয়ার্ড মিলছে না";
              return null;
            }}
          >
            <Label className="text-sm font-semibold">পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input name="confirmPassword" className={inputClass} placeholder="আবার লিখুন" />
            <FieldError />
          </TextField>

          {/* Full-width green submit button with a soft shadow */}
          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white shadow-md hover:bg-green-800"
          >
            {isSubmitting ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </Button>

          {errorMessage && (
            <p role="alert" className="text-sm text-red-600">
              {errorMessage}
            </p>
          )}

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

          {/* Link for users who already registered */}
          <p className="text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/component/Signin" className="font-medium text-green-700 hover:underline">
              সাইন ইন করুন
            </Link>
          </p>
        </Form>
      </div>

      {/* Back link sits below the card */}
      <Link href="/" className="mt-6 text-sm text-gray-500 hover:text-gray-700">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}