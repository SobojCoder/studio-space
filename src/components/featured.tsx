import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { cn } from "cn";
import { IStudio } from "@/Type/studio";
import { FavoriteButton } from "@/components/favorite-button";
import { notFound } from "next/navigation";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const FEATURED_COUNT = 6;

const GRID_CLASSES =
  "mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";


/** Shown when the studio API is unreachable so the section always renders. */




const StudioCard = ({
  studio,
  index,
}: {
  studio: IStudio;
  index: number;
}) => {
  return (
    <article className="group w-[280px]  mr-3 sm:w-[340px] md:w-[380px] flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111518] transition duration-300 hover:-translate-y-1 hover:border-lime-400/40">
      <div className="relative h-40 overflow-hidden xl:h-36">
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
              : "bg-lime-400 text-black",
          )}
        >
          {studio.category}
        </span>

        <FavoriteButton label={studio.title} />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5 text-sm">
          <Star
            aria-hidden
            className="size-4 fill-yellow-400 text-yellow-400"
          />
          <span className="font-semibold text-white">
            {studio.rating.toFixed(1)}
          </span>
          <span className="text-zinc-400">({studio.totalReviews})</span>
        </div>

        <h3 className="mt-2 text-[15px] font-semibold leading-snug text-white">
          {studio.title}
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-zinc-400">
          <MapPin aria-hidden className="size-4 shrink-0 text-white" />
          <span className="min-w-0 truncate">{studio.location}</span>
        </p>

        <p className="mt-4 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-lime-400">
            ${studio.hourlyRate}
          </span>
          <span className="text-sm text-zinc-400">/ hr</span>
        </p>

        <div className="mt-auto pt-4">
          <Link
            href={`/studio-list/${studio._id}`}
            className="flex items-center justify-center gap-2 rounded-full border border-white/15 py-2.5 text-sm font-medium text-white transition hover:border-lime-400/50 hover:bg-lime-400/10 hover:text-lime-400"
          >
            View Details
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

async function FeaturedGrid() {  
  const res = await fetch("http://localhost:5000/feature-studio");

  if (!res.ok) return notFound();

  const studios = (await res.json()) as IStudio[];
  console.log(studios.length);
  return (
    <div>
      <MarqueeText
        duration={15}
        direction="right"
        pauseOnHover
        className="mt-12"
      >

      {studios.map((studio, index) => (
        <StudioCard key={studio._id} studio={studio} index={index} />
      ))}
      </MarqueeText>
    </div>
  );
}

const FeaturedGridSkeleton = () => {
  return (
    <div className={GRID_CLASSES} aria-hidden>
      {Array.from({ length: FEATURED_COUNT }).map((_, index) => (
        <div
          key={index}
          className="h-[360px] animate-pulse rounded-2xl bg-white/5"
        />
      ))}
    </div>
  );
};

const Featured = async() => {
    const res = await fetch("http://localhost:5000/feature-studio");

  if (!res.ok) return notFound();

  const studios = (await res.json()) as IStudio[];
  return (
    <section className="w-full bg-black py-16 text-white md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <span
          aria-hidden
          className="block h-1.5 w-14 rounded-full bg-lime-400"
        />

        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Featured <span className="text-lime-400">Studios</span>
            </h2>
            <p className="mt-3 text-base text-zinc-400 md:text-lg">
              Top-rated spaces, handpicked for creators like you.
            </p>
          </div>

          <Link
            href="/studio-list"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 md:self-auto"
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
