import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import { IStudio } from "@/Type/studio";
import Image from "next/image";
import CategoryCard from "./categoryCard";
const categories = [
  "All Categories",
  "Photography Studio",
  "Meeting Studio",
  "Podcast Studio",
  "Music Studio",
  "Creative Studio",
  "Workshop Studio",
  "Video Production Studio",
  "Dance Studio",
  "Content Creation Studio",
  "Event Studio",
];


const Categories = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio-list`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch studios");
      }
  
      const studios: IStudio[] = await res.json();
  return (
    <section className="w-full bg-[#F5F7F0] py-12 text-[#0B0D10] transition-colors sm:py-16 md:py-20 dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mt-5 flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between">
        <div>
        <div className="flex items-center gap-3 sm:gap-4">
          <span aria-hidden className="h-0.5 w-8 bg-lime-600 sm:w-12 dark:bg-lime-400" />
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Browse by <span className="text-lime-700 dark:text-lime-400">Category</span>
          </h2>
        </div>

        <p className="mt-4 max-w-xl text-sm text-zinc-600 sm:text-base md:text-lg dark:text-zinc-400">
          Pick the kind of space you need and get straight to creating.
        </p>
</div>
        <Link
            href="/categories"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-black/20 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-black/40 hover:bg-black/5 sm:px-6 sm:py-3 md:self-auto dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
          >
            View All Categories
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {studios.slice(1, 7).map((studio) => <CategoryCard key={studio._id} studio={studio}/>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;