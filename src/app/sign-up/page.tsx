
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
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUpPage() {
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const hasUppercase = /[A-Z]/.test(password);
const hasLowercase = /[a-z]/.test(password);
const hasMinLength = password.length >= 6;

const isPasswordValid =
  hasUppercase && hasLowercase && hasMinLength;

const isPasswordMatch = password === confirmPassword;


  const handleSubmited =async(e:React.SubmitEvent<HTMLElement>)=>{
    e.preventDefault()


    if (!isPasswordValid) {
    toast.error("Please enter a valid password");
    return;
  }

  if (!isPasswordMatch) {
    toast.error("Passwords do not match");
    return;
  }



    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {name:string, email: string, password: string, confirmPassword: string}

    const {data, error} = await authClient.signUp.email({
      ...user
    })

    if (error) {
        toast.error(error.message || "Account could not be created.");
      }

      // ৩. সফল হলে লগইন পেজে নেওয়া
      if (data) {
        toast.success("Account created! Now sign in.");
        redirect("/sign-in");
      }

    console.log(user);
  }

  const handleSignInGoogle = async()=>{
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }




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

              <form onSubmit={handleSubmited} className="space-y-4">

                {/* Full Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C6F36B]" size={21} />

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
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C6F36B]" size={21} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Password */}
                {/* Password */}
<div className="relative">
  <Lock
    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C6F36B]"
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
    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9299A5] hover:text-[#C6F36B]"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
  
</div>
<div className="space-y-2 rounded-lg bg-white/5 p-4">
  <p className="mb-2 text-sm font-medium text-gray-300">
    Password must contain:
  </p>

  <p className={`flex items-center gap-2 text-sm ${
    hasUppercase ? "text-[#C6F36B]" : "text-gray-500"
  }`}>
    {hasUppercase ? "✓" : "○"}
    At least one uppercase letter (A-Z)
  </p>

  <p className={`flex items-center gap-2 text-sm ${
    hasLowercase ? "text-[#C6F36B]" : "text-gray-500"
  }`}>
    {hasLowercase ? "✓" : "○"}
    At least one lowercase letter (a-z)
  </p>

  <p className={`flex items-center gap-2 text-sm ${
    hasMinLength ? "text-[#C6F36B]" : "text-gray-500"
  }`}>
    {hasMinLength ? "✓" : "○"}
    Minimum 6 characters
  </p>
</div>

                {/* Confirm Password */}
                {/* Confirm Password */}
<div className="relative">
  <Lock
    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C6F36B]"
    size={21}
  />

  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
    className={inputClass}
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9299A5] hover:text-[#C6F36B]"
  >
    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>

{confirmPassword && !isPasswordMatch && (
  <p className="text-sm text-red-400">
    Passwords do not match!
  </p>
)}

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
              onClick={handleSignInGoogle}
                type="button"
                className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 py-4 font-semibold transition hover:border-[#C6F36B] hover:bg-[#C6F36B]/5"
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
