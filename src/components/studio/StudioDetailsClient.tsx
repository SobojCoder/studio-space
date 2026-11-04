
"use client";

import { useState, type FormEvent } from "react";
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
  X,
} from "lucide-react";
import { IStudio } from "@/Type/studio";


const amenityIcons: Record<string, React.ReactNode> = {
  "Wheelchair Access": <Accessibility size={20} />,
  "High-Speed Wi-Fi": <Wifi size={20} />,
  Soundproofing: <Volume2 size={20} />,
  "Air Conditioning": <Wind size={20} />,
};

const StudioDetailsClient = ({ studio }:{studio:IStudio}) => {
  const images =
    studio.images?.length
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
    <main className="min-h-screen bg-[#080E1B] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back Navigation */}
        <Link
          href="/studio-list"
          className="mb-8 inline-flex items-center gap-2 text-gray-400 transition hover:text-[#CCFF00]"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-gradient-to-r from-lime-400/15 to-cyan-400/10 px-4 py-2 text-sm text-lime-300">
              <Sparkles size={15} />
              {studio.category}
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {studio.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <MapPin size={18} className="text-lime-400" />
                {studio.location}
              </span>

              <span className="flex items-center gap-1 text-yellow-400">
                <Star size={16} fill="currentColor" />
                {rating.toFixed(1)}
                <span className="text-gray-400">
                  ({totalReviews} reviews)
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
            <Camera className="text-cyan-400" size={19} />
            Premium Studio Space
          </div>
        </div>

        {/* Gallery */}
        <section>
          <div className="group relative h-[280px] overflow-hidden rounded-3xl border border-white/10 md:h-[480px]">
            <Image
              src={images[activeImage]}
              alt={studio.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#080E1B]/70 via-transparent to-black/10" />

            <span className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm backdrop-blur-md">
              <span className="text-lime-400">●</span> Available Studio
            </span>

            <span className="absolute bottom-6 right-6 rounded-full bg-black/50 px-4 py-2 text-sm">
              {activeImage + 1} / {images.length}
            </span>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md transition hover:bg-lime-400 hover:text-black"
                >
                  <ArrowLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md transition hover:bg-lime-400 hover:text-black"
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
                  className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition md:h-24 md:w-36 ${
                    activeImage === index
                      ? "border-lime-400"
                      : "border-white/10 opacity-60 hover:opacity-100"
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
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Left Side */}
          <div className="space-y-7 lg:col-span-2">

            {/* Overview */}
            <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111C2E] p-6 md:p-8">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-3 text-purple-300">
                    <Camera size={23} />
                  </div>
                  <h2 className="text-2xl font-bold">
                    About This Studio
                  </h2>
                </div>

                <p className="leading-8 text-gray-400">
                  {studio.overview}
                </p>

                {studio.description && (
                  <p className="mt-4 leading-8 text-gray-400">
                    {studio.description}
                  </p>
                )}
              </div>
            </section>

            {/* Specifications */}
            <section className="rounded-2xl border border-white/10 bg-[#111C2E] p-6 md:p-8">
              <h2 className="mb-7 text-2xl font-bold">
                Studio Specifications
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-lime-400/20 bg-gradient-to-br from-lime-400/15 to-emerald-500/5 p-5 transition hover:border-lime-400/50">
                  <Clock className="mb-4 text-lime-400" size={25} />
                  <p className="text-sm text-gray-400">Hourly Rate</p>
                  <h3 className="mt-2 text-2xl font-bold">
                    ${hourlyRate}
                  </h3>
                  <p className="mt-1 text-xs text-lime-400">Per hour</p>
                </div>

                <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-500/15 to-pink-500/5 p-5 transition hover:border-purple-400/50">
                  <ShieldCheck className="mb-4 text-purple-400" size={25} />
                  <p className="text-sm text-gray-400">Security Deposit</p>
                  <h3 className="mt-2 text-2xl font-bold">
                    ${deposit}
                  </h3>
                  <p className="mt-1 text-xs text-purple-300">
                    Refundable deposit*
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-blue-500/5 p-5 transition hover:border-cyan-400/50">
                  <Users className="mb-4 text-cyan-400" size={25} />
                  <p className="text-sm text-gray-400">Max Capacity</p>
                  <h3 className="mt-2 text-2xl font-bold">
                    {studio.maxCapacity}
                  </h3>
                  <p className="mt-1 text-xs text-cyan-300">People</p>
                </div>
              </div>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-white/10 bg-[#111C2E] p-6 md:p-8">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Amenities</h2>
                <Sparkles className="text-lime-400" size={22} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {studio.amenities?.map((amenity, index) => (
                  <div
                    key={`${amenity}-${index}`}
                    className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition duration-300 hover:border-lime-400/20 hover:bg-gradient-to-r hover:from-lime-400/10 hover:to-cyan-400/10"
                  >
                    <div className="rounded-xl bg-gradient-to-br from-lime-400/20 to-cyan-400/10 p-3 text-lime-300">
                      {amenityIcons[amenity] || (
                        <CheckCircle2 size={21} />
                      )}
                    </div>

                    <span className="text-sm font-medium text-gray-200">
                      {amenity}
                    </span>

                    <CheckCircle2
                      size={17}
                      className="ml-auto text-lime-400"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Owner Information */}
            <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#17243A] via-[#111C2E] to-[#1D1740] p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-bold">
                Studio Host
              </h2>

              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-400 to-cyan-400 text-[#080E1B]">
                  <User size={30} />
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    {studio.ownerName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Workspace Owner
                  </p>

                  <a
                    href={`mailto:${studio.ownerEmail}`}
                    className="mt-3 flex items-center gap-2 text-sm text-lime-300 transition hover:text-cyan-300"
                  >
                    <Mail size={16} />
                    {studio.ownerEmail}
                  </a>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section className="rounded-2xl border border-white/10 bg-[#111C2E] p-6 md:p-8">
              <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    Customer Reviews
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    What visitors say about this workspace.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-3">
                  <Star
                    size={20}
                    fill="currentColor"
                    className="text-yellow-400"
                  />
                  <span className="text-xl font-bold">{rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-400">
                    ({totalReviews})
                  </span>
                </div>
              </div>

              {studio.reviews?.length ? (
                <div className="space-y-5">
                  {studio.reviews.map((review, index) => (
                    <div
                      key={`${review.userEmail}-${index}`}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 text-lime-300">
                            <User size={20} />
                          </div>

                          <div>
                            <h3 className="font-semibold">
                              {review.userName}
                            </h3>
                            <p className="text-xs text-gray-500">
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
                                  ? "text-yellow-400"
                                  : "text-gray-600"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-gray-400">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm text-gray-400">
                  No reviews available yet.
                </p>
              )}
            </section>
          </div>

          {/* Right Booking Card */}
          <aside>
            <div className="sticky top-8 overflow-hidden rounded-2xl border border-white/10 bg-[#111C2E] p-6">
              <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500" />

              <div className="mb-4 mt-2 flex items-center gap-2 text-sm font-semibold text-lime-400">
                <Sparkles size={17} />
                BOOK YOUR EXPERIENCE
              </div>

              <p className="text-sm text-gray-400">Starting from</p>

              <h2 className="mt-2 text-4xl font-bold">
                ${hourlyRate}
                <span className="text-sm font-normal text-gray-400">
                  / hour
                </span>
              </h2>

              <div className="my-7 border-t border-white/10" />

              <div className="space-y-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Hourly Rate</span>
                  <span className="font-semibold">${hourlyRate}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Security Deposit</span>
                  <span className="font-semibold">${deposit}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Maximum Guests</span>
                  <span className="font-semibold">{studio.maxCapacity}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="font-semibold">{studio.category}</span>
                </div>
              </div>

              <div className="mt-7 rounded-xl border border-lime-400/20 bg-gradient-to-br from-lime-400/10 to-cyan-400/10 p-4">
                <div className="flex gap-3">
                  <ShieldCheck
                    className="shrink-0 text-lime-400"
                    size={23}
                  />

                  <div>
                    <h4 className="text-sm font-semibold">
                      Secure Booking
                    </h4>
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      Reserve your preferred studio and enjoy a professional space.
                    </p>
                  </div>
                </div>
              </div>
              <Link href={`/booking-studio/${studio._id}`}>
              <button
                type="button"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-400 to-[#CCFF00] py-4 font-bold text-[#080E1B] shadow-lg shadow-lime-400/10 transition-all duration-300 hover:from-cyan-300 hover:to-lime-400 hover:shadow-lime-400/30"
              >
                <CalendarDays size={19} />
                Book Workspace Now
                <ArrowRight size={18} />
              </button>
              </Link>

              <p className="mt-5 text-center text-xs text-gray-500">
                Contact the host for more information.
              </p>
            </div>
          </aside>
        </div>

        {/* Footer */}
        
      </div>

      {/* Booking Modal */}
      
    </main>
  );
};

export default StudioDetailsClient;
