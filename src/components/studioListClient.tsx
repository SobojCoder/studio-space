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
    <main className="min-h-screen bg-[#111518] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-[#C4F45A]">
            Explore Spaces
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Find Your{" "}
            <span className="bg-gradient-to-r from-[#C4F45A] to-[#A8E83E] bg-clip-text text-transparent">
              Perfect Studio
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-[#94A3B8]">
            Discover creative spaces for photography, filmmaking, music
            production, and unforgettable events.
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#181A20] p-4 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              size={20}
            />

            <input
              type="text"
              placeholder="Search studios or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#111518] py-3 pl-12 pr-4 text-sm text-white placeholder:text-[#94A3B8] outline-none transition focus:border-[#C4F45A]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex  items-center gap-2 rounded-xl border border-white/10 bg-[#111518] px-8">
            <SlidersHorizontal size={18} className="text-[#C4F45A]" />

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
              className="px-4 bg-[#111518] w-full py-3 text-sm text-[#94A3B8] outline-none"
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
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Available Studios
          </h2>

          <p className="text-sm text-[#94A3B8]">
            {filteredStudios.length} Studios Found
          </p>
        </div>

        {/* Studio Grid */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#181A20] transition duration-300 hover:-translate-y-2 hover:border-[#C4F45A]/50 hover:shadow-xl hover:shadow-[#C4F45A]/5"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  {studio.imageUrl ? (
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#252932] text-[#94A3B8]">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171A20] to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-[#C4F45A]/20 bg-[#111518]/80 px-3 py-1.5 text-xs font-medium text-[#C4F45A] backdrop-blur-md">
                    {studio.category}
                  </span>

                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-xs">
                    <Star
                      size={13}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {studio.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="mb-2 text-xl font-semibold text-white transition group-hover:text-[#C4F45A]">
                    {studio.title}
                  </h3>

                  <div className="mb-4 flex items-center gap-2 text-sm text-[#94A3B8]">
                    <MapPin size={16} className="text-[#C4F45A]" />
                    {studio.location}
                  </div>

                  <p className="mb-5 line-clamp-2 text-sm leading-6 text-[#94A3B8]">
                    {studio.overview}
                  </p>

                  {/* Details */}
                  <div className="mb-5 flex items-center justify-between border-y border-white/10 py-4">
                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <Users size={17} className="text-[#C4F45A]" />
                      {studio.maxCapacity} Guests
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                      <Clock size={17} className="text-[#C4F45A]" />
                      Hourly Rental
                    </div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-[#94A3B8]">Starting from</p>

                      <p className="text-xl font-bold text-white">
                        ${studio.hourlyRate}
                        <span className="text-xs font-normal text-[#94A3B8]">
                          /hr
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/studio-list/${studio._id}`}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#C4F45A] to-[#A8E83E] px-4 py-3 text-sm font-semibold text-[#111518] transition hover:opacity-90"
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
          <div className="rounded-2xl border border-white/10 bg-[#181A20] py-20 text-center">
            <Search className="mx-auto mb-4 text-[#94A3B8]" size={40} />

            <h3 className="text-xl font-semibold text-white">
              No Studios Found
            </h3>

            <p className="mt-2 text-sm text-[#94A3B8]">
              Try searching with a different name or category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default StudioListClient;
