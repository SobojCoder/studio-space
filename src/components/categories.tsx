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
    const res = await fetch("http://localhost:5000/studio-list", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch studios");
      }
  
      const studios: IStudio[] = await res.json();
  return (
    <section className="w-full bg-black py-16 text-white md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
        <div className="flex items-center gap-4">
          <span aria-hidden className="h-0.5 w-12 bg-lime-400" />
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Browse by <span className="text-lime-400">Category</span>
          </h2>
        </div>

        <p className="mt-4 max-w-xl text-base text-zinc-400 md:text-lg">
          Pick the kind of space you need and get straight to creating.
        </p>
</div>
        <Link
            href="/categories"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 md:self-auto"
          >
            View All Categories
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {studios.slice(1, 7).map((studio) => <CategoryCard key={studio._id} studio={studio}/>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
