
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { IStudio } from "@/Type/studio";
import { FavoriteButton } from "@/components/HomePage/favorite-button";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const FEATURED_COUNT = 6;

const GRID_CLASSES =
  "mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";

// Studio Card
const StudioCard = ({
  studio,
  index,
}: {
  studio: IStudio;
  index: number;
}) => {
  return (
    <article className="group mr-3 flex h-full w-[280px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#C4F45A] hover:shadow-lg hover:shadow-[#C4F45A]/5 dark:border-white/10 dark:bg-[#181A20] dark:hover:border-[#C4F45A]/40 sm:w-[340px] md:w-[380px]">
      <div className="relative h-40 overflow-hidden sm:h-44 xl:h-36">
        <Image
          src={studio.imageUrl}
          alt={studio.title}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <span
          className={cn(
            "absolute left-3 top-3 z-10 max-w-[calc(100%-4.5rem)] truncate rounded-full px-3 py-1.5 text-xs font-semibold",
            index % 2 === 0
              ? "bg-violet-600 text-white"
              : "bg-[#C4F45A] text-[#111518]"
          )}
        >
          {studio.category}
        </span>

        <FavoriteButton label={studio.title} />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-1.5 text-sm">
          <Star
            aria-hidden
            className="size-4 fill-yellow-400 text-yellow-400"
          />
          <span className="font-semibold text-zinc-900 dark:text-white">
            {studio.rating.toFixed(1)}
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">
            ({studio.totalReviews})
          </span>
        </div>

        <h3 className="mt-2 text-[15px] leading-snug font-semibold text-zinc-900 dark:text-white">
          {studio.title}
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <MapPin
            aria-hidden
            className="size-4 shrink-0 text-zinc-500 dark:text-zinc-300"
          />
          <span className="min-w-0 truncate">{studio.location}</span>
        </p>

        <p className="mt-4 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-[#8BAF25] dark:text-[#C4F45A]">
            ${studio.hourlyRate}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            / hr
          </span>
        </p>

        <div className="mt-auto pt-4">
          <Link
            href={`/studio-list/${studio._id}`}
            className="flex items-center justify-center gap-2 rounded-full border border-zinc-300 py-2.5 text-sm font-medium text-zinc-800 transition hover:border-[#A8E83E] hover:bg-[#C4F45A]/10 hover:text-[#72951A] dark:border-white/15 dark:text-white dark:hover:border-[#C4F45A]/50 dark:hover:text-[#C4F45A]"
          >
            View Details
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

// Loading Skeleton
const FeaturedGridSkeleton = () => {
  return (
    <div className={GRID_CLASSES} aria-hidden>
      {Array.from({ length: FEATURED_COUNT }).map((_, index) => (
        <div
          key={index}
          className="h-[360px] animate-pulse rounded-2xl bg-zinc-200 dark:bg-white/5"
        />
      ))}
    </div>
  );
};

// Fetch Featured Studios
async function FeaturedGrid() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feature-studio`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured studios");
  }

  const text = await res.text();

  if (!text) {
    throw new Error("API returned an empty response");
  }

  const studios = JSON.parse(text) as IStudio[];

  return (
    <div>
      <MarqueeText
        duration={15}
        direction="right"
        pauseOnHover
        className="mt-10 sm:mt-12"
      >
        {studios.map((studio, index) => (
          <StudioCard
            key={studio._id}
            studio={studio}
            index={index}
          />
        ))}
      </MarqueeText>
    </div>
  );
}

// Main Featured Component
const Featured = () => {
  return (
    <section className="w-full bg-zinc-50 py-14 text-zinc-900 transition-colors duration-300 dark:bg-[#111518] dark:text-white sm:py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-8 lg:px-10">
        <span
          aria-hidden
          className="block h-1.5 w-14 rounded-full bg-[#C4F45A]"
        />

        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-white">
              Featured{" "}
              <span className="text-[#8BAF25] dark:text-[#C4F45A]">
                Studios
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base md:text-lg dark:text-zinc-400">
              Top-rated spaces, handpicked for creators like you.
            </p>
          </div>

          <Link
            href="/studio-list"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:border-[#A8E83E] hover:bg-[#C4F45A]/10 hover:text-[#72951A] sm:px-6 sm:py-3 md:self-auto dark:border-white/20 dark:text-white dark:hover:border-[#C4F45A]/50 dark:hover:text-[#C4F45A]"
          >
            View All Studios
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <Suspense fallback={<FeaturedGridSkeleton />}>
          <FeaturedGrid />
        </Suspense>
      </div>
    </section>
  );
};

export default Featured;
