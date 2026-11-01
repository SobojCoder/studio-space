
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Camera, Mail, Lock, Eye, EyeOff,
  CalendarDays, Zap, Heart, LogIn
} from "lucide-react";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In");
  };

  return (
    <main className="min-h-screen bg-[#111518] text-white flex flex-col lg:flex-row">

      {/* LEFT SECTION */}
      <section className="relative flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-14 py-12 overflow-hidden">

        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C4F45A]/10 blur-[120px] rounded-full" />

        {/* Badge */}
        <div className="relative z-10 mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#C4F45A]/40 bg-[#C4F45A]/10 text-[#C4F45A] text-sm">
            <Zap size={17} />
            Join Our Community
          </div>
        </div>

        {/* Heading */}
        <div className="relative z-10 max-w-xl">

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight">
            Welcome Back to{" "}
            <span className="text-[#C4F45A]">
              Studio Space
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 mt-5 leading-relaxed">
            Book, Create, and Share Amazing Spaces with Ease.
          </p>

          {/* Features */}
          <div className="mt-12 space-y-7">

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
      <section className="flex-1 bg-[#181A20] flex items-center justify-center px-6 py-10 md:px-10 lg:px-12">

        <div className="w-full max-w-[520px] border border-white/10 rounded-3xl bg-white/[0.02] p-7 md:p-9">

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 bg-[#C4F45A] rounded-2xl flex items-center justify-center">
              <Camera size={32} className="text-black" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-serif">
              Sign In
            </h2>

            <p className="text-slate-400 text-sm md:text-base mt-2">
              Continue your journey with Studio Space
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="flex items-center gap-3 border border-white/10 rounded-xl px-5 py-4 focus-within:border-[#C4F45A] transition">
              <Mail size={22} className="text-[#C4F45A]" />

              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-transparent outline-none text-white text-base placeholder:text-slate-400"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 border border-white/10 rounded-xl px-5 py-4 focus-within:border-[#C4F45A] transition">

              <Lock size={22} className="text-[#C4F45A]" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full bg-transparent outline-none text-white text-base placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-[#C4F45A]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember / Forgot */}
            <div className="flex justify-between items-center text-sm text-slate-400">

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[#C4F45A]" />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-[#C4F45A] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#C4F45A] to-[#A8E83E] text-black text-base font-semibold hover:shadow-lg hover:shadow-[#C4F45A]/20 hover:scale-[1.01] transition duration-300"
            >
              <LogIn size={21} />
              Sign In
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-white/15 flex-1" />
            <span className="text-slate-500 text-sm">or</span>
            <div className="h-px bg-white/15 flex-1" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full py-3.5 rounded-xl border border-white/15 flex items-center justify-center gap-3 text-base hover:bg-white/5 transition"
          >
            <span className="text-xl font-bold text-blue-400">G</span>
            Continue with Google
          </button>

          {/* Sign Up */}
          <p className="text-center text-slate-400 text-sm mt-7">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#C4F45A] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4">

      <div className="w-14 h-14 shrink-0 rounded-full bg-[#C4F45A] flex items-center justify-center text-black">
        {icon}
      </div>

      <div>
        <h3 className="text-base md:text-lg font-semibold font-serif">
          {title}
        </h3>

        <p className="text-sm md:text-base text-slate-400 mt-1">
          {description}
        </p>
      </div>

    </div>
  );
}
