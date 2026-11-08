
"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Users,
  Wifi,
  Volume2,
  Wind,
} from "lucide-react";
import { IStudio } from "@/Type/studio";

const amenityIcons: Record<string, ReactNode> = {
  "Wheelchair Access": <Accessibility size={20} />,
  "High-Speed Wi-Fi": <Wifi size={20} />,
  Soundproofing: <Volume2 size={20} />,
  "Air Conditioning": <Wind size={20} />,
};

const StudioDetailsClient = ({ studio }: { studio: IStudio }) => {
  const images = studio.images?.length
    ? studio.images
    : [studio.imageUrl];

  const [activeImage, setActiveImage] = useState(0);

  const hourlyRate = Number(studio.hourlyRate) || 0;
  const deposit = Number(studio.securityDeposit) || 0;

  const rating = studio.rating ?? 0;
  const totalReviews = studio.totalReviews ?? studio.reviews?.length ?? 0;

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <main className="min-h-screen bg-[#F5F7F0] px-4 py-8 text-[#181A20] transition-colors duration-300 dark:bg-[#111518] dark:text-white sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back Navigation */}
        <Link
          href="/studio-list"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#71717A] transition hover:text-[#72951A] dark:text-[#94A3B8] dark:hover:text-[#C4F45A]"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-5 md:mb-8 md:flex-row md:items-end">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#72951A]/20 bg-[#EEF5DF] px-4 py-2 text-sm text-[#72951A] dark:border-[#C4F45A]/20 dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
              <Sparkles size={15} />
              {studio.category}
            </div>

            <h1 className="break-words text-3xl font-bold tracking-tight text-[#181A20] dark:text-white sm:text-4xl md:text-5xl">
              {studio.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#71717A] dark:text-[#94A3B8]">
              <span className="flex items-center gap-2">
                <MapPin
                  size={18}
                  className="shrink-0 text-[#72951A] dark:text-[#C4F45A]"
                />
                {studio.location}
              </span>

              <span className="flex items-center gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                {rating.toFixed(1)}
                <span className="text-[#71717A] dark:text-[#94A3B8]">
                  ({totalReviews} reviews)
                </span>
              </span>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#52525B] dark:border-white/10 dark:bg-[#181A20] dark:text-[#94A3B8]">
            <Camera
              className="text-[#72951A] dark:text-[#C4F45A]"
              size={19}
            />
            Premium Studio Space
          </div>
        </div>

        {/* Gallery */}
        <section>
          <div className="group relative h-[260px] overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white dark:border-white/10 dark:bg-[#181A20] sm:h-[350px] md:h-[430px] lg:h-[480px] lg:rounded-3xl">
            <Image
              src={images[activeImage]}
              alt={studio.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

            <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:px-4 sm:text-sm">
              <span className="text-[#C4F45A]">●</span> Available Studio
            </span>

            <span className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-2 text-xs text-white sm:bottom-6 sm:right-6 sm:px-4 sm:text-sm">
              {activeImage + 1} / {images.length}
            </span>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-[#C4F45A] hover:text-[#111518] sm:left-4 sm:size-11"
                >
                  <ArrowLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-[#C4F45A] hover:text-[#111518] sm:right-4 sm:size-11"
                >
                  <ArrowRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View studio image ${index + 1}`}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-28 md:h-24 md:w-36 ${
                    activeImage === index
                      ? "border-[#72951A] dark:border-[#C4F45A]"
                      : "border-[#E4E4E7] opacity-60 hover:opacity-100 dark:border-white/10"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Studio image ${index + 1}`}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Main Layout */}
        <div className="mt-8 grid grid-cols-1 gap-7 lg:mt-10 lg:grid-cols-3 lg:gap-8">

          {/* Left Side */}
          <div className="min-w-0 space-y-6 md:space-y-7 lg:col-span-2">

            {/* Overview */}
            <section className="relative overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white p-5 dark:border-white/10 dark:bg-[#181A20] sm:p-6 md:p-8">
              <div className="absolute -right-20 -top-20 size-48 rounded-full bg-[#72951A]/5 blur-3xl dark:bg-[#C4F45A]/5" />

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-[#EEF5DF] p-3 text-[#72951A] dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
                    <Camera size={23} />
                  </div>
                  <h2 className="text-xl font-bold sm:text-2xl">
                    About This Studio
                  </h2>
                </div>

                <p className="text-sm leading-7 text-[#52525B] dark:text-[#94A3B8] sm:text-base sm:leading-8">
                  {studio.overview}
                </p>

                {studio.description && (
                  <p className="mt-4 text-sm leading-7 text-[#52525B] dark:text-[#94A3B8] sm:text-base sm:leading-8">
                    {studio.description}
                  </p>
                )}
              </div>
            </section>

            {/* Specifications */}
            <section className="rounded-2xl border border-[#E4E4E7] bg-white p-5 dark:border-white/10 dark:bg-[#181A20] sm:p-6 md:p-8">
              <h2 className="mb-6 text-xl font-bold sm:mb-7 sm:text-2xl">
                Studio Specifications
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                <div className="rounded-2xl border border-[#72951A]/20 bg-[#EEF5DF] p-5 transition hover:border-[#72951A]/50 dark:border-[#C4F45A]/20 dark:bg-[#C4F45A]/5 dark:hover:border-[#C4F45A]/50">
                  <Clock className="mb-4 text-[#72951A] dark:text-[#C4F45A]" size={25} />
                  <p className="text-sm text-[#71717A] dark:text-[#94A3B8]">Hourly Rate</p>
                  <h3 className="mt-2 text-2xl font-bold">${hourlyRate}</h3>
                  <p className="mt-1 text-xs text-[#72951A] dark:text-[#C4F45A]">Per hour</p>
                </div>

                <div className="rounded-2xl border border-purple-500/20 bg-purple-50 p-5 transition hover:border-purple-500/50 dark:bg-purple-500/5 dark:hover:border-purple-400/50">
                  <ShieldCheck className="mb-4 text-purple-600 dark:text-purple-400" size={25} />
                  <p className="text-sm text-[#71717A] dark:text-[#94A3B8]">Security Deposit</p>
                  <h3 className="mt-2 text-2xl font-bold">${deposit}</h3>
                  <p className="mt-1 text-xs text-purple-600 dark:text-purple-300">
                    Refundable deposit*
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-500/20 bg-sky-50 p-5 transition hover:border-sky-500/50 dark:bg-sky-500/5 dark:hover:border-sky-400/50 sm:col-span-2 xl:col-span-1">
                  <Users className="mb-4 text-sky-600 dark:text-sky-400" size={25} />
                  <p className="text-sm text-[#71717A] dark:text-[#94A3B8]">Max Capacity</p>
                  <h3 className="mt-2 text-2xl font-bold">{studio.maxCapacity}</h3>
                  <p className="mt-1 text-xs text-sky-600 dark:text-sky-300">People</p>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-[#E4E4E7] bg-white p-5 dark:border-white/10 dark:bg-[#181A20] sm:p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between sm:mb-7">
                <h2 className="text-xl font-bold sm:text-2xl">Amenities</h2>
                <Sparkles className="text-[#72951A] dark:text-[#C4F45A]" size={22} />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {studio.amenities?.map((amenity, index) => (
                  <div
                    key={`${amenity}-${index}`}
                    className="flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-[#F5F7F0] p-3 transition duration-300 hover:border-[#72951A]/30 hover:bg-[#EEF5DF] dark:border-white/5 dark:bg-[#111518] dark:hover:border-[#C4F45A]/20 dark:hover:bg-[#C4F45A]/5 sm:gap-4 sm:p-4"
                  >
                    <div className="rounded-xl bg-[#EEF5DF] p-3 text-[#72951A] dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
                      {amenityIcons[amenity] || (
                        <CheckCircle2 size={21} />
                      )}
                    </div>

                    <span className="text-sm font-medium text-[#181A20] dark:text-gray-200">
                      {amenity}
                    </span>

                    <CheckCircle2
                      size={17}
                      className="ml-auto shrink-0 text-[#72951A] dark:text-[#C4F45A]"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Owner Information */}
            <section className="rounded-2xl border border-[#E4E4E7] bg-[#EEF5DF] p-5 dark:border-white/10 dark:bg-[#181A20] sm:p-6 md:p-8">
              <h2 className="mb-6 text-xl font-bold sm:text-2xl">
                Studio Host
              </h2>

              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#72951A] text-white dark:bg-[#C4F45A] dark:text-[#111518]">
                  <User size={30} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-bold">
                    {studio.ownerName}
                  </h3>

                  <p className="mt-1 text-sm text-[#71717A] dark:text-[#94A3B8]">
                    Workspace Owner
                  </p>

                  <a
                    href={`mailto:${studio.ownerEmail}`}
                    className="mt-3 flex items-center gap-2 break-all text-sm text-[#72951A] transition hover:text-[#65A30D] dark:text-[#C4F45A] dark:hover:text-[#A8E83E]"
                  >
                    <Mail size={16} className="shrink-0" />
                    {studio.ownerEmail}
                  </a>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section className="rounded-2xl border border-[#E4E4E7] bg-white p-5 dark:border-white/10 dark:bg-[#181A20] sm:p-6 md:p-8">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-7 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-bold sm:text-2xl">
                    Customer Reviews
                  </h2>
                  <p className="mt-2 text-sm text-[#71717A] dark:text-[#94A3B8]">
                    What visitors say about this workspace.
                  </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl border border-yellow-500/20 bg-yellow-50 px-4 py-3 dark:bg-yellow-500/10">
                  <Star
                    size={20}
                    fill="currentColor"
                    className="text-yellow-500"
                  />
                  <span className="text-xl font-bold">{rating.toFixed(1)}</span>
                  <span className="text-sm text-[#71717A] dark:text-[#94A3B8]">
                    ({totalReviews})
                  </span>
                </div>
              </div>

              {studio.reviews?.length ? (
                <div className="space-y-4 sm:space-y-5">
                  {studio.reviews.map((review, index) => (
                    <div
                      key={`${review.userEmail}-${index}`}
                      className="rounded-xl border border-[#E4E4E7] bg-[#F5F7F0] p-4 dark:border-white/10 dark:bg-[#111518] sm:p-5"
                    >
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EEF5DF] text-[#72951A] dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
                            <User size={20} />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate font-semibold">
                              {review.userName}
                            </h3>
                            <p className="text-xs text-[#71717A] dark:text-[#64748B]">
                              {review.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              size={15}
                              fill={
                                starIndex < review.rating
                                  ? "currentColor"
                                  : "none"
                              }
                              className={
                                starIndex < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-400 dark:text-gray-600"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-[#52525B] dark:text-[#94A3B8]">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-[#E4E4E7] bg-[#F5F7F0] p-5 text-sm text-[#71717A] dark:border-white/10 dark:bg-[#111518] dark:text-[#94A3B8]">
                  No reviews available yet.
                </p>
              )}
            </section>
          </div>

          {/* Right Booking Card */}
          <aside className="min-w-0 lg:col-span-1">
            <div className="static overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#181A20] sm:p-6 lg:sticky lg:top-8">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#72951A] via-[#A3E635] to-[#C4F45A]" />

              <div className="mb-4 mt-5 flex items-center gap-2 text-sm font-semibold text-[#72951A] dark:text-[#C4F45A]">
                <Sparkles size={17} />
                BOOK YOUR EXPERIENCE
              </div>

              <p className="text-sm text-[#71717A] dark:text-[#94A3B8]">
                Starting from
              </p>

              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                ${hourlyRate}
                <span className="text-sm font-normal text-[#71717A] dark:text-[#94A3B8]">
                  / hour
                </span>
              </h2>

              <div className="my-6 border-t border-[#E4E4E7] dark:border-white/10 sm:my-7" />

              <div className="space-y-5 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-[#71717A] dark:text-[#94A3B8]">Hourly Rate</span>
                  <span className="font-semibold">${hourlyRate}</span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-[#71717A] dark:text-[#94A3B8]">Security Deposit</span>
                  <span className="font-semibold">${deposit}</span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-[#71717A] dark:text-[#94A3B8]">Maximum Guests</span>
                  <span className="font-semibold">{studio.maxCapacity}</span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-[#71717A] dark:text-[#94A3B8]">Category</span>
                  <span className="text-right font-semibold">{studio.category}</span>
                </div>
              </div>

              <div className="mt-7 rounded-xl border border-[#72951A]/20 bg-[#EEF5DF] p-4 dark:border-[#C4F45A]/20 dark:bg-[#C4F45A]/5">
                <div className="flex gap-3">
                  <ShieldCheck
                    className="shrink-0 text-[#72951A] dark:text-[#C4F45A]"
                    size={23}
                  />

                  <div>
                    <h4 className="text-sm font-semibold">
                      Secure Booking
                    </h4>
                    <p className="mt-2 text-xs leading-5 text-[#52525B] dark:text-[#94A3B8]">
                      Reserve your preferred studio and enjoy a professional space.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={`/booking-studio/${studio._id}`}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#72951A] px-3 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#65A30D] dark:bg-[#C4F45A] dark:text-[#111518] dark:hover:bg-[#A8E83E] sm:text-base"
              >
                <CalendarDays size={19} />
                Book Workspace Now
                <ArrowRight size={18} />
              </Link>

              <p className="mt-5 text-center text-xs text-[#71717A] dark:text-[#64748B]">
                Contact the host for more information.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default StudioDetailsClient;
