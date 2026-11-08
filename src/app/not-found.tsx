import Link from "next/link";
import { Aperture, ArrowLeft, Home, Search } from "lucide-react";
import { connection } from "next/server";

const NotFound = async() => {
    await connection();
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F5F7F0] px-4 py-16 dark:bg-[#111518]">
      <div className="mx-auto w-full max-w-2xl text-center">

        {/* Logo */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#72951A] text-white dark:bg-[#C4F45A] dark:text-[#111518]">
            <Aperture size={25} />
          </div>

          <span className="text-xl font-bold text-[#181A20] dark:text-white">
            Studio<span className="text-[#72951A] dark:text-[#C4F45A]">Space</span>
          </span>
        </Link>

        {/* 404 */}
        <div className="relative mb-6">
          <h1 className="text-[120px] leading-none font-black tracking-tighter text-[#72951A]/15 dark:text-[#C4F45A]/15 sm:text-[180px]">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-20 items-center justify-center rounded-2xl border border-[#72951A]/20 bg-white shadow-xl dark:border-[#C4F45A]/20 dark:bg-[#181A20]">
              <Search
                size={38}
                className="text-[#72951A] dark:text-[#C4F45A]"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="mb-3 text-3xl font-bold text-[#181A20] dark:text-white sm:text-4xl">
          Page Not Found
        </h2>

        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-[#52525B] dark:text-[#94A3B8] sm:text-base">
          Oops! The page you are looking for doesn&apos;t exist, may have been
          moved, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#72951A] px-7 py-3 font-semibold text-white transition hover:bg-[#65A30D] dark:bg-[#C4F45A] dark:text-[#111518] dark:hover:bg-[#A8E83E] sm:w-auto"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/studios"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E4E4E7] px-7 py-3 font-semibold text-[#181A20] transition hover:bg-[#EEF5DF] dark:border-white/10 dark:text-white dark:hover:bg-white/5 sm:w-auto"
          >
            <ArrowLeft size={18} />
            Explore Studios
          </Link>
        </div>

        {/* Footer text */}
        <p className="mt-12 text-xs text-[#71717A] dark:text-[#64748B]">
          © 2026 StudioSpace. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default NotFound;