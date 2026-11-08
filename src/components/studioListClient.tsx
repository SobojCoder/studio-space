"use client";

import { useEffect, useState } from "react";
import type { IStudio } from "@/Type/studio";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  Search,
  Star,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface StudioListClientProps {
  studios: IStudio[];
  initialCategory: string;
}

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

const StudioListClient = ({
  studios,
  initialCategory,
}: StudioListClientProps) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "All Categories";
  // Search and Category Filter
  const filteredStudios = studios.filter((studio) => {
    const searchMatch =
      studio.title.toLowerCase().includes(search.toLowerCase()) ||
      studio.location.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      category === "All Categories" || studio.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <main className="min-h-screen bg-[#F5F7F0] text-[#0B0D10] transition-colors dark:bg-[#111518] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Heading */}
        <div className="mb-8 sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#4F7A00] sm:text-sm dark:text-[#C4F45A]">
            Explore Spaces
          </p>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Find Your{" "}
            <span className="bg-gradient-to-r from-[#4F7A00] to-[#6FA000] bg-clip-text text-transparent dark:from-[#C4F45A] dark:to-[#A8E83E]">
              Perfect Studio
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm text-[#5B6472] sm:text-base dark:text-[#94A3B8]">
            Discover creative spaces for photography, filmmaking, music
            production, and unforgettable events.
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-3 shadow-sm sm:flex-row sm:gap-4 sm:p-4 dark:border-white/10 dark:bg-[#181A20] dark:shadow-none">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5B6472] dark:text-[#94A3B8]"
              size={20}
            />

            <input
              type="text"
              placeholder="Search studios or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-[#F8FAF4] py-3 pl-12 pr-4 text-sm text-[#0B0D10] placeholder:text-[#8A93A0] outline-none transition focus:border-[#8BBF1F] dark:border-white/10 dark:bg-[#111518] dark:text-white dark:placeholder:text-[#94A3B8] dark:focus:border-[#C4F45A]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#F8FAF4] px-4 sm:px-8 dark:border-white/10 dark:bg-[#111518]">
            <SlidersHorizontal size={18} className="shrink-0 text-[#4F7A00] dark:text-[#C4F45A]" />

            <select
              value={category}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "All Categories") {
                  router.push("/studio-list");
                } else {
                  router.push(
                    `/studio-list?category=${encodeURIComponent(value)}`,
                  );
                }
              }}
              className="w-full bg-[#F8FAF4] px-2 py-3 text-sm text-[#3F4752] outline-none sm:px-4 dark:bg-[#111518] dark:text-[#94A3B8]"
            >
              {studios.map((studio) => (
                <option key={studio._id} value={studio.category}>
                  {studio.category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-[#0B0D10] sm:text-xl dark:text-white">
            Available Studios
          </h2>

          <p className="text-sm text-[#5B6472] dark:text-[#94A3B8]">
            {filteredStudios.length} Studios Found
          </p>
        </div>

        {/* Studio Grid */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#8BBF1F] hover:shadow-xl hover:shadow-[#8BBF1F]/10 dark:border-white/10 dark:bg-[#181A20] dark:shadow-none dark:hover:border-[#C4F45A]/50 dark:hover:shadow-[#C4F45A]/5"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden sm:h-56">
                  {studio.imageUrl ? (
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#E8ECE0] text-[#5B6472] dark:bg-[#252932] dark:text-[#94A3B8]">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent dark:from-[#171A20]" />
                  <span className="absolute left-3 top-3 rounded-full border border-[#C4F45A]/20 bg-[#111518]/80 px-3 py-1.5 text-xs font-medium text-[#C4F45A] backdrop-blur-md sm:left-4 sm:top-4">
                    {studio.category}
                  </span>

                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white sm:right-4 sm:top-4">
                    <Star
                      size={13}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {studio.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="mb-2 text-lg font-semibold text-[#0B0D10] transition group-hover:text-[#4F7A00] sm:text-xl dark:text-white dark:group-hover:text-[#C4F45A]">
                    {studio.title}
                  </h3>

                  <div className="mb-4 flex items-center gap-2 text-sm text-[#5B6472] dark:text-[#94A3B8]">
                    <MapPin size={16} className="shrink-0 text-[#4F7A00] dark:text-[#C4F45A]" />
                    {studio.location}
                  </div>

                  <p className="mb-5 line-clamp-2 text-sm leading-6 text-[#5B6472] dark:text-[#94A3B8]">
                    {studio.overview}
                  </p>

                  {/* Details */}
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-y border-black/10 py-4 dark:border-white/10">
                    <div className="flex items-center gap-2 text-sm text-[#5B6472] dark:text-[#94A3B8]">
                      <Users size={17} className="text-[#4F7A00] dark:text-[#C4F45A]" />
                      {studio.maxCapacity} Guests
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#5B6472] dark:text-[#94A3B8]">
                      <Clock size={17} className="text-[#4F7A00] dark:text-[#C4F45A]" />
                      Hourly Rental
                    </div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-[#5B6472] dark:text-[#94A3B8]">Starting from</p>

                      <p className="text-lg font-bold text-[#0B0D10] sm:text-xl dark:text-white">
                        ${studio.hourlyRate}
                        <span className="text-xs font-normal text-[#5B6472] dark:text-[#94A3B8]">
                          /hr
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/studio-list/${studio._id}`}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C4F45A] to-[#A8E83E] px-3 py-2.5 text-sm font-semibold text-[#111518] transition hover:opacity-90 sm:px-4 sm:py-3"
                    >
                      View Details
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-black/10 bg-white px-4 py-16 text-center shadow-sm sm:py-20 dark:border-white/10 dark:bg-[#181A20] dark:shadow-none">
            <Search className="mx-auto mb-4 text-[#5B6472] dark:text-[#94A3B8]" size={40} />

            <h3 className="text-lg font-semibold text-[#0B0D10] sm:text-xl dark:text-white">
              No Studios Found
            </h3>

            <p className="mt-2 text-sm text-[#5B6472] dark:text-[#94A3B8]">
              Try searching with a different name or category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default StudioListClient;