
import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import CategoryCard from "@/components/categoryCard";
import { IStudio } from "@/Type/studio";



const CategoriesPage = async() => {

     const res = await fetch("http://localhost:5000/studio-list", {
            cache: "no-store",
          });
      
          if (!res.ok) {
            throw new Error("Failed to fetch studios");
          }
      
          const studios: IStudio[] = await res.json();

  return (
    <main className="min-h-screen bg-[#111518] text-white">


      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#C4F45A]">
              Browse Collection
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Explore by Category
            </h2>

            <p className="mt-3 text-[#94A3B8]">
              Discover the perfect space for your next creative project.
            </p>
          </div>

          <p className="text-sm text-[#94A3B8]">
            10 Creative Categories
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
{studios.map((studio) => {

            return (
                <CategoryCard key={studio._id} studio={studio}/>
          )})}

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-8">
        <div className="rounded-3xl border border-[#C4F45A]/20 bg-gradient-to-r from-[#181A20] to-[#20291B] px-8 py-12 text-center md:px-16">
          <h2 className="text-3xl font-bold">
            Have a Creative Space?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#94A3B8]">
            Share your studio with creators and turn your space into an opportunity.
          </p>

          <Link
            href="/add-studio"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#C4F45A] px-6 py-3 font-semibold text-[#111518] hover:bg-[#A8E83E]"
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
