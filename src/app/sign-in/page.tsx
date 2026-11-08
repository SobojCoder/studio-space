
"use client";

import { useState, type ReactNode, type FormEvent } from "react";
import Link from "next/link";
import {
  Camera,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CalendarDays,
  Zap,
  Heart,
  LogIn,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const requestedCallback = searchParams.get("callbackUrl") || "/";
  const callbackUrl =
    requestedCallback.startsWith("/") && !requestedCallback.startsWith("//")
      ? requestedCallback
      : "/";

  const handleSubmited = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message ?? "Sign in failed");
        return;
      }

      if (data) {
        toast.success("Login successfully");
        router.replace(callbackUrl);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch {
      toast.error("Google sign in failed. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F7F0] text-[#181A20] lg:flex-row dark:bg-[#111518] dark:text-white">

      {/* LEFT SECTION */}
      <section className="relative flex flex-1 flex-col justify-center overflow-hidden px-6 py-12 sm:px-10 md:px-12 lg:px-14 lg:py-16">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#A3E635]/15 blur-[120px] dark:bg-[#C4F45A]/10" />

        {/* Badge */}
        <div className="relative z-10 mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#72951A]/30 bg-[#A3E635]/15 px-5 py-2 text-sm font-medium text-[#52730D] dark:border-[#C4F45A]/40 dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
            <Zap size={17} />
            Join Our Community
          </div>
        </div>

        {/* Heading */}
        <div className="relative z-10 max-w-xl">
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Welcome Back to{" "}
            <span className="text-[#72951A] dark:text-[#C4F45A]">
              Studio Space
            </span>
          </h1>

          <p className="mt-5 text-base leading-relaxed text-[#52525B] sm:text-lg dark:text-[#94A3B8]">
            Book, Create, and Share Amazing Spaces with Ease.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-7">
            <Feature
              icon={<CalendarDays size={25} />}
              title="Easy Booking"
              description="Book your favorite studio effortlessly."
            />

            <Feature
              icon={<Zap size={25} />}
              title="Instant Access"
              description="Discover and reserve spaces quickly."
            />

            <Feature
              icon={<Heart size={25} />}
              title="Trusted by Creators"
              description="A community built for creativity."
            />
          </div>
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section className="flex flex-1 items-center justify-center bg-white px-4 py-10 sm:px-8 md:px-10 lg:bg-[#EEF5DF] lg:px-12 dark:bg-[#181A20] dark:lg:bg-[#181A20]">

        <div className="w-full max-w-[520px] rounded-3xl border border-[#E4E4E7] bg-[#F5F7F0] p-6 shadow-sm sm:p-8 md:p-9 dark:border-white/10 dark:bg-white/[0.02]">

          {/* Icon */}
          <div className="mb-5 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-[#A3E635] dark:bg-[#C4F45A]">
              <Camera size={32} className="text-[#181A20]" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-[#181A20] sm:text-4xl dark:text-white">
              Sign In
            </h2>

            <p className="mt-2 text-sm text-[#52525B] sm:text-base dark:text-[#94A3B8]">
              Continue your journey with Studio Space
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmited} className="space-y-5">

            {/* Email */}
            <div className="flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-white px-4 py-4 transition focus-within:border-[#72951A] sm:px-5 dark:border-white/10 dark:bg-[#111518] dark:focus-within:border-[#C4F45A]">
              <Mail
                size={22}
                className="shrink-0 text-[#72951A] dark:text-[#C4F45A]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full bg-transparent text-base text-[#181A20] outline-none placeholder:text-[#71717A] dark:text-white dark:placeholder:text-[#94A3B8]"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-white px-4 py-4 transition focus-within:border-[#72951A] sm:px-5 dark:border-white/10 dark:bg-[#111518] dark:focus-within:border-[#C4F45A]">

              <Lock
                size={22}
                className="shrink-0 text-[#72951A] dark:text-[#C4F45A]"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="w-full bg-transparent text-base text-[#181A20] outline-none placeholder:text-[#71717A] dark:text-white dark:placeholder:text-[#94A3B8]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 text-[#71717A] transition hover:text-[#72951A] dark:text-[#94A3B8] dark:hover:text-[#C4F45A]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember / Forgot */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#52525B] dark:text-[#94A3B8]">

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="size-4 accent-[#72951A] dark:accent-[#C4F45A]"
                />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="font-medium text-[#52730D] transition hover:underline dark:text-[#C4F45A]"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A3E635] to-[#84CC16] py-3.5 text-base font-semibold text-[#181A20] transition duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-[#72951A]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:from-[#C4F45A] dark:to-[#A8E83E]"
            >
              {loading ? (
                <>
                  <span className="size-5 animate-spin rounded-full border-2 border-[#181A20] border-t-transparent" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={21} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E4E4E7] dark:bg-white/15" />
            <span className="text-sm text-[#71717A] dark:text-[#94A3B8]">
              or
            </span>
            <div className="h-px flex-1 bg-[#E4E4E7] dark:bg-white/15" />
          </div>

          {/* Google */}
          <button
            onClick={handleSignInGoogle}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#D4D4D8] bg-white py-3.5 text-base font-medium text-[#181A20] transition hover:bg-[#F5F7F0] dark:border-white/15 dark:bg-[#111518] dark:text-white dark:hover:bg-white/5"
          >
            <span className="text-xl font-bold text-blue-500">G</span>
            Continue with Google
          </button>

          {/* Sign Up */}
          <p className="mt-7 text-center text-sm text-[#52525B] dark:text-[#94A3B8]">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#52730D] hover:underline dark:text-[#C4F45A]"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#A3E635] text-[#181A20] sm:size-14 dark:bg-[#C4F45A]">
        {icon}
      </div>

      <div>
        <h3 className="font-serif text-base font-semibold text-[#181A20] sm:text-lg dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-[#52525B] sm:text-base dark:text-[#94A3B8]">
          {description}
        </p>
      </div>
    </div>
  );
}
