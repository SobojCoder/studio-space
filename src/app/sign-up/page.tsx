
"use client";

import Link from "next/link";
import { useState } from "react";
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
} from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log(formData);
  };

  const benefits = [
    { icon: CalendarDays, title: "Easy Booking", description: "Book your favorite studio effortlessly." },
    { icon: Zap, title: "Instant Access", description: "Discover and reserve spaces quickly." },
    { icon: Heart, title: "Trusted by Creators", description: "A community built for creativity." },
  ];

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#171A20] py-4 pl-12 pr-12 text-[#F5F5F5] outline-none transition placeholder:text-[#9299A5] focus:border-[#C6F36B] focus:ring-2 focus:ring-[#C6F36B]/15";

  return (
    <main className=" bg-[#0B0D10] text-[#F5F5F5]">

      {/* Signup Section */}
      <section className="mx-auto flex max-w-7xl items-center justify-center">

        <div className="grid w-full overflow-hidden  border border-white/10 bg-[#171A20] shadow-2xl lg:grid-cols-2">

          {/* Left Side */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-[#11151A] p-8 md:p-12 lg:p-14">

            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#C6F36B]/10 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#C6F36B]/10 blur-3xl" />

            <div className="relative z-10">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#C6F36B]/30 bg-[#C6F36B]/10 px-4 py-2 text-sm text-[#C6F36B]">
                <Sparkles size={16} />
                Join Our Community
              </div>

              <h2 className="max-w-xl text-4xl font-extrabold leading-tight md:text-5xl">
                Create Your Account on{" "}
                <span className="text-[#C6F36B]">
                  Studio Space
                </span>
              </h2>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-[#9299A5]">
                Book, Create, and Share Amazing Spaces with Ease.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-6">
                {benefits.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C6F36B] text-[#0B0D10]">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-[#9299A5]">
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
                className="relative h-64 overflow-hidden rounded-2xl border border-[#C6F36B]/20 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(11,13,16,.85), rgba(11,13,16,.05)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=85&w=1200&auto=format&fit=crop')",
                }}
              >
                <div className="absolute bottom-6 left-6">
                  <p className="text-sm text-[#C6F36B]">
                    YOUR CREATIVE JOURNEY STARTS HERE
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">
                    Find Your Perfect Space.
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-6 md:p-12 lg:p-14">
            <div className="w-full max-w-md">

              {/* Heading */}
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C6F36B] text-[#0B0D10]">
                  <Camera size={34} />
                </div>

                <h2 className="text-4xl font-bold">Sign Up</h2>
                <p className="mt-2 text-[#9299A5]">
                  Start your journey with Studio Space
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Full Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C6F36B]" size={21} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C6F36B]" size={21} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C6F36B]" size={21} />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9299A5] hover:text-[#C6F36B]"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C6F36B]" size={21} />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9299A5] hover:text-[#C6F36B]"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#C6F36B] py-4 font-bold text-[#0B0D10] transition hover:bg-[#d5ff85] hover:shadow-lg hover:shadow-[#C6F36B]/10"
                >
                  Create Account
                  <ArrowRight size={20} className="transition group-hover:translate-x-1" />
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-sm text-[#9299A5]">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={() => {
                  // Connect Google authentication here
                }}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 py-4 font-semibold transition hover:border-[#C6F36B] hover:bg-[#C6F36B]/5"
              >
                <svg viewBox="0 0 48 48" className="h-5 w-5">
                  <path fill="#FFC107" d="M43.6 24.5c0-1.5-.1-3-.4-4.4H24v8.3h11c-.5 2.7-2 5-4.4 6.5l7 5.4c4-3.7 6-9.1 6-15.8Z" />
                  <path fill="#34A853" d="M24 44c5.5 0 10.2-1.8 13.6-4.8l-7-5.4c-1.8 1.2-4 1.9-6.6 1.9-5 0-9.3-3.4-10.9-8l-7.2 5.5C9.4 39.6 16.1 44 24 44Z" />
                  <path fill="#4285F4" d="M13.1 27.7a12 12 0 0 1 0-7.4l-7.2-5.5a20 20 0 0 0 0 18.4l7.2-5.5Z" />
                  <path fill="#EA4335" d="M24 12.3c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 6.1 29.5 4 24 4 16.1 4 9.4 8.4 5.9 14.8l7.2 5.5c1.6-4.6 5.9-8 10.9-8Z" />
                </svg>
                Continue with Google
              </button>

              {/* Sign In */}
              <p className="mt-8 text-center text-sm text-[#9299A5]">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-[#C6F36B] transition hover:text-white"
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
