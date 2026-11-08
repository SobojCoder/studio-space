
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CalendarDays,
  Zap,
  Heart,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const isPasswordValid =
    hasUppercase && hasLowercase && hasMinLength;

  const isPasswordMatch = password === confirmPassword;

  const handleSubmited = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Please enter a valid password");
      return;
    }

    if (!isPasswordMatch) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!name || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Account could not be created.");
        return;
      }

      if (data) {
        toast.success("Account created! Now sign in.");
        router.push("/sign-in");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignInGoogle = async () => {
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  const benefits = [
    {
      icon: CalendarDays,
      title: "Easy Booking",
      description: "Book your favorite studio effortlessly.",
    },
    {
      icon: Zap,
      title: "Instant Access",
      description: "Discover and reserve spaces quickly.",
    },
    {
      icon: Heart,
      title: "Trusted by Creators",
      description: "A community built for creativity.",
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-[#E4E4E7] bg-white py-4 pl-12 pr-12 text-[#181A20] outline-none transition placeholder:text-[#71717A] focus:border-[#72951A] focus:ring-2 focus:ring-[#72951A]/15 dark:border-white/10 dark:bg-[#111518] dark:text-white dark:placeholder:text-[#94A3B8] dark:focus:border-[#C4F45A] dark:focus:ring-[#C4F45A]/15";

  return (
    <main className="min-h-screen bg-[#F5F7F0] text-[#181A20] dark:bg-[#111518] dark:text-white">

      {/* Signup Section */}
      <section className="mx-auto flex max-w-7xl items-center justify-center px-3 py-6 sm:px-5 md:py-10">

        <div className="grid w-full overflow-hidden rounded-3xl border border-[#E4E4E7] bg-white shadow-xl lg:grid-cols-2 dark:border-white/10 dark:bg-[#181A20]">

          {/* Left Side */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#EEF5DF] to-[#F5F7F0] p-6 sm:p-8 md:p-12 lg:p-14 dark:from-[#181A20] dark:to-[#111518]">

            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#A3E635]/20 blur-3xl dark:bg-[#C4F45A]/10" />

            <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#A3E635]/15 blur-3xl dark:bg-[#C4F45A]/10" />

            <div className="relative z-10">

              {/* Badge */}
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#72951A]/30 bg-[#A3E635]/15 px-4 py-2 text-sm font-semibold text-[#52730D] dark:border-[#C4F45A]/30 dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
                <Sparkles size={16} />
                Join Our Community
              </div>

              {/* Heading */}
              <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-[#181A20] sm:text-4xl md:text-5xl dark:text-white">
                Create Your Account on{" "}
                <span className="text-[#72951A] dark:text-[#C4F45A]">
                  Studio Space
                </span>
              </h2>

              <p className="mt-6 max-w-md text-base leading-relaxed text-[#52525B] sm:text-lg dark:text-[#94A3B8]">
                Book, Create, and Share Amazing Spaces with Ease.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-6">
                {benefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-center gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#A3E635] text-[#181A20] dark:bg-[#C4F45A] dark:text-[#111518]">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#181A20] dark:text-white">
                          {item.title}
                        </h3>

                        <p className="text-sm text-[#52525B] dark:text-[#94A3B8]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Studio Image */}
            <div className="relative z-10 mt-10">
              <div
                className="relative h-56 overflow-hidden rounded-2xl border border-[#72951A]/20 bg-cover bg-center sm:h-64 dark:border-[#C4F45A]/20"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(11,13,16,.85), rgba(11,13,16,.05)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=85&w=1200&auto=format&fit=crop')",
                }}
              >
                <div className="absolute bottom-6 left-6">
                  <p className="text-xs font-semibold tracking-wider text-[#C4F45A] sm:text-sm">
                    YOUR CREATIVE JOURNEY STARTS HERE
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                    Find Your Perfect Space.
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-5 sm:p-8 md:p-12 lg:p-14">
            <div className="w-full max-w-md">

              {/* Heading */}
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#A3E635] text-[#181A20] dark:bg-[#C4F45A] dark:text-[#111518]">
                  <Camera size={34} />
                </div>

                <h2 className="text-3xl font-bold text-[#181A20] sm:text-4xl dark:text-white">
                  Sign Up
                </h2>

                <p className="mt-2 text-sm text-[#52525B] sm:text-base dark:text-[#94A3B8]">
                  Start your journey with Studio Space
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmited} className="space-y-4">

                {/* Full Name */}
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#72951A] dark:text-[#C4F45A]"
                    size={21}
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#72951A] dark:text-[#C4F45A]"
                    size={21}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#72951A] dark:text-[#C4F45A]"
                    size={21}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#72951A] dark:text-[#94A3B8] dark:hover:text-[#C4F45A]"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="space-y-2 rounded-xl border border-[#E4E4E7] bg-[#F5F7F0] p-4 dark:border-white/10 dark:bg-[#111518]">
                  <p className="mb-2 text-sm font-semibold text-[#181A20] dark:text-white">
                    Password must contain:
                  </p>

                  <p
                    className={`flex items-center gap-2 text-sm ${
                      hasUppercase
                        ? "text-[#52730D] dark:text-[#C4F45A]"
                        : "text-[#71717A] dark:text-[#94A3B8]"
                    }`}
                  >
                    {hasUppercase ? "✓" : "○"}
                    At least one uppercase letter (A-Z)
                  </p>

                  <p
                    className={`flex items-center gap-2 text-sm ${
                      hasLowercase
                        ? "text-[#52730D] dark:text-[#C4F45A]"
                        : "text-[#71717A] dark:text-[#94A3B8]"
                    }`}
                  >
                    {hasLowercase ? "✓" : "○"}
                    At least one lowercase letter (a-z)
                  </p>

                  <p
                    className={`flex items-center gap-2 text-sm ${
                      hasMinLength
                        ? "text-[#52730D] dark:text-[#C4F45A]"
                        : "text-[#71717A] dark:text-[#94A3B8]"
                    }`}
                  >
                    {hasMinLength ? "✓" : "○"}
                    Minimum 6 characters
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#72951A] dark:text-[#C4F45A]"
                    size={21}
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`${inputClass} ${
                      confirmPassword && !isPasswordMatch
                        ? "!border-red-500 focus:!border-red-500"
                        : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#72951A] dark:text-[#94A3B8] dark:hover:text-[#C4F45A]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {confirmPassword && !isPasswordMatch && (
                  <p className="text-sm text-red-500">
                    Passwords do not match!
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#A3E635] to-[#84CC16] py-4 font-bold text-[#181A20] transition hover:shadow-lg hover:shadow-[#72951A]/20 disabled:cursor-not-allowed disabled:opacity-60 dark:from-[#C4F45A] dark:to-[#A8E83E] dark:text-[#111518]"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight
                        size={20}
                        className="transition group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#E4E4E7] dark:bg-white/10" />
                <span className="text-sm text-[#71717A] dark:text-[#94A3B8]">
                  or
                </span>
                <div className="h-px flex-1 bg-[#E4E4E7] dark:bg-white/10" />
              </div>

              {/* Google */}
              <button
                onClick={handleSignInGoogle}
                type="button"
                disabled={googleLoading}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#D4D4D8] bg-white py-4 font-semibold text-[#181A20] transition hover:border-[#72951A] hover:bg-[#F5F7F0] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:bg-[#111518] dark:text-white dark:hover:border-[#C4F45A] dark:hover:bg-[#C4F45A]/5"
              >
                {googleLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <svg viewBox="0 0 48 48" className="size-5">
                    <path
                      fill="#FFC107"
                      d="M43.6 24.5c0-1.5-.1-3-.4-4.4H24v8.3h11c-.5 2.7-2 5-4.4 6.5l7 5.4c4-3.7 6-9.1 6-15.8Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 44c5.5 0 10.2-1.8 13.6-4.8l-7-5.4c-1.8 1.2-4 1.9-6.6 1.9-5 0-9.3-3.4-10.9-8l-7.2 5.5C9.4 39.6 16.1 44 24 44Z"
                    />
                    <path
                      fill="#4285F4"
                      d="M13.1 27.7a12 12 0 0 1 0-7.4l-7.2-5.5a20 20 0 0 0 0 18.4l7.2-5.5Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 12.3c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 6.1 29.5 4 24 4 16.1 4 9.4 8.4 5.9 14.8l7.2 5.5c1.6-4.6 5.9-8 10.9-8Z"
                    />
                  </svg>
                )}

                {googleLoading ? "Connecting..." : "Continue with Google"}
              </button>

              {/* Sign In */}
              <p className="mt-8 text-center text-sm text-[#52525B] dark:text-[#94A3B8]">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-[#52730D] transition hover:underline dark:text-[#C4F45A]"
                >
                  Sign In
                </Link>
              </p>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
