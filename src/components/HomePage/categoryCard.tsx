
import { IStudio } from "@/Type/studio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ studio }: { studio: IStudio }) => {
  return (
    <Link
      key={studio.category}
      href={`/studio-list?category=${encodeURIComponent(studio.category)}`}
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#72951A] hover:shadow-lg hover:shadow-[#C4F45A]/10 sm:p-5 md:p-6 dark:border-white/10 dark:bg-[#181A20] dark:hover:border-[#C4F45A]/40"
    >
      <h3 className="mt-2 text-base font-semibold text-zinc-900 transition-colors group-hover:text-[#72951A] sm:mt-3 sm:text-lg dark:text-white dark:group-hover:text-[#C4F45A]">
        {studio.category}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-[#94A3B8]">
        {studio.description}
      </p>

      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#72951A] transition-colors sm:mt-5 dark:text-[#C4F45A]">
        Explore spaces
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
};

export default CategoryCard;