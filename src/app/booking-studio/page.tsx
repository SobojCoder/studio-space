import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import type { IStudio } from "@/Type/studio";

async function getStudios(): Promise<IStudio[]> {
  try {
    const res = await fetch("http://localhost:5000/studio-list", {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const studios = await res.json();
    return Array.isArray(studios) ? (studios as IStudio[]) : [];
  } catch {
    return [];
  }
}

async function StudioPicker() {
  const studios = await getStudios();

  if (studios.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#171A20] py-16 text-center">
        <Search className="mx-auto mb-4 text-[#9299A5]" size={38} />

        <h2 className="text-xl font-bold">No Studios Available</h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#9299A5]">
          We could not load any studios. Make sure the booking API at
          localhost:5000 is running, then refresh this page.
        </p>

        <Link
          href="/studio-list"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B0D10] px-5 py-3 text-sm font-semibold text-[#F5F5F5] transition hover:border-[#C6F36B]/50"
        >
          Browse Studio List
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studios.map((studio) => (
        <div
          key={studio._id}
          className="group overflow-hidden rounded-2xl border border-white/10 bg-[#171A20] transition hover:border-[#C6F36B]/40"
        >
          <div className="relative h-44 overflow-hidden">
            <Image
              src={studio.imageUrl}
              alt={studio.title}
              width={400}
              height={260}
              unoptimized
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#171A20] to-transparent" />

            <span className="absolute left-4 top-4 rounded-full bg-[#C6F36B] px-3 py-1 text-xs font-bold text-[#0B0D10]">
              {studio.category}
            </span>
          </div>

          <div className="p-5">
            <h2 className="text-lg font-bold">{studio.title}</h2>

            <p className="mt-2 flex items-center gap-2 text-sm text-[#9299A5]">
              <MapPin size={15} className="text-[#C6F36B]" />
              {studio.location}
            </p>

            <div className="my-4 flex items-center justify-between border-y border-white/10 py-3 text-sm text-[#9299A5]">
              <span className="flex items-center gap-2">
                <Users size={15} className="text-[#C6F36B]" />
                {studio.maxCapacity} Guests
              </span>

              <span className="flex items-center gap-2">
                <Clock size={15} className="text-[#C6F36B]" />
                ৳{studio.hourlyRate}/hr
              </span>
            </div>

            <Link
              href={`/booking-studio/${studio._id}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C6F36B] py-3 text-sm font-bold text-[#0B0D10] transition hover:bg-[#d5ff85]"
            >
              <CalendarDays size={16} />
              Book This Studio
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BookingStudioPage() {
  return (
    <main className="min-h-screen bg-[#0B0D10] px-4 py-10 text-[#F5F5F5] md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/studio-list"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#9299A5] transition hover:text-[#C6F36B]"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        {/* Page Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold tracking-widest text-[#C6F36B]">
            COMPLETE YOUR RESERVATION
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Book Your <span className="text-[#C6F36B]">Studio</span>
          </h1>

          <p className="mt-3 text-[#9299A5]">
            Pick a studio to reserve your creative space.
          </p>
        </div>

        <Suspense
          fallback={
            <p className="text-[#9299A5]">Loading available studios...</p>
          }
        >
          <StudioPicker />
        </Suspense>
      </div>
    </main>
  );
}
