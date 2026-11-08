import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategoryCard from "@/components/HomePage/categoryCard";
import { IStudio } from "@/Type/studio";

const CategoriesPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio-list`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const studios: IStudio[] = await res.json();

  return (
    <main className="min-h-screen bg-[#F5F7F0] text-[#0B0D10] dark:bg-[#111518] dark:text-white">
      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-8 md:py-20">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#72951A] dark:text-[#C4F45A]">
              Browse Collection
            </p>

            <h2 className="text-3xl font-bold text-[#181A20] sm:text-4xl dark:text-white">
              Explore by Category
            </h2>

            <p className="mt-3 text-sm text-[#52525B] sm:text-base dark:text-[#94A3B8]">
              Discover the perfect space for your next creative project.
            </p>
          </div>

          <p className="text-sm text-[#71717A] dark:text-[#94A3B8]">
            10 Creative Categories
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {studios.map((studio) => (
            <CategoryCard key={studio._id} studio={studio} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:px-8 md:pb-20">
        <div className="rounded-3xl border border-[#72951A]/20 bg-gradient-to-r from-white to-[#EEF5DF] px-5 py-10 text-center shadow-sm sm:px-8 md:px-16 md:py-12 dark:border-[#C4F45A]/20 dark:from-[#181A20] dark:to-[#20291B]">
          <h2 className="text-2xl font-bold text-[#181A20] sm:text-3xl dark:text-white">
            Have a Creative Space?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#52525B] sm:text-base dark:text-[#94A3B8]">
            Share your studio with creators and turn your space into an
            opportunity.
          </p>

          <Link
            href="/add-studio"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#A3E635] px-6 py-3 text-sm font-semibold text-[#181A20] transition hover:bg-[#65A30D] hover:text-white dark:bg-[#C4F45A] dark:text-[#111518] dark:hover:bg-[#A8E83E]"
          >
            Host Your Space
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;