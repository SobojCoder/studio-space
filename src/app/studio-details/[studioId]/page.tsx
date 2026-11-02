import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  Accessibility,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Camera,
  Car,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Projector,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Users,
  Volume2,
  Wifi,
  Wind,
} from "lucide-react";
import { IStudio } from "@/Type/studio";
import { BookWorkspaceModal } from "@/components/booking-modal";
import { StudioGallery } from "@/components/studio-gallery";

const amenityIcons: Record<string, typeof Wifi> = {
  "High-Speed Wi-Fi": Wifi,
  "Wi-Fi": Wifi,
  Wifi: Wifi,
  Soundproofing: Volume2,
  "Air Conditioning": Wind,
  "Wheelchair Access": Accessibility,
  "Free Parking": Car,
  Parking: Car,
  Projector: Projector,
};

async function getStudio(studioId: string): Promise<IStudio | null> {
  try {
    const res = await fetch(`http://localhost:5000/studio/${studioId}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const studio = await res.json();
    return studio && studio._id ? (studio as IStudio) : null;
  } catch {
    return null;
  }
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  const filled = Math.round(rating);

  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((step) => (
        <Star
          key={step}
          size={size}
          className={
            step <= filled
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-600"
          }
        />
      ))}
    </span>
  );
}

const StudioDetails = async ({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) => {
  const { studioId } = await params;

  const studio = await getStudio(studioId);

  if (!studio) notFound();

  const galleryImages =
    studio.images && studio.images.length > 0
      ? studio.images
      : [studio.imageUrl];

  const reviews = studio.reviews ?? [];
  const averageRating =
    studio.rating ??
    (reviews.length
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0);

  const specs = [
    {
      icon: Clock,
      label: "Hourly Rate",
      value: `$${studio.hourlyRate}`,
      note: "Per hour",
      accent: "from-lime-400/15 to-emerald-500/5 border-lime-400/20",
      iconColor: "text-lime-400",
      noteColor: "text-lime-400",
    },
    {
      icon: ShieldCheck,
      label: "Security Deposit",
      value: `$${studio.securityDeposit}`,
      note: "Refundable deposit*",
      accent: "from-purple-500/15 to-pink-500/5 border-purple-400/20",
      iconColor: "text-purple-400",
      noteColor: "text-purple-300",
    },
    {
      icon: Users,
      label: "Max Capacity",
      value: `${studio.maxCapacity}`,
      note: "People",
      accent: "from-cyan-500/15 to-blue-500/5 border-cyan-400/20",
      iconColor: "text-cyan-400",
      noteColor: "text-cyan-300",
    },
    {
      icon: Sparkles,
      label: "Category",
      value: studio.category,
      note: "Studio type",
      accent: "from-purple-500/15 to-cyan-500/5 border-purple-400/20",
      iconColor: "text-purple-300",
      noteColor: "text-purple-300",
    },
    {
      icon: MapPin,
      label: "Location",
      value: studio.location,
      note: "Address",
      accent: "from-cyan-500/15 to-emerald-500/5 border-cyan-400/20",
      iconColor: "text-cyan-400",
      noteColor: "text-cyan-300",
    },
    {
      icon: Star,
      label: "Rating",
      value: averageRating ? averageRating.toFixed(1) : "New",
      note: `${studio.totalReviews ?? reviews.length} review${
        (studio.totalReviews ?? reviews.length) === 1 ? "" : "s"
      }`,
      accent: "from-yellow-400/15 to-orange-500/5 border-yellow-400/20",
      iconColor: "text-yellow-400",
      noteColor: "text-yellow-300",
    },
  ];

  return (
    <main className="min-h-screen bg-[#080E1B] px-4 py-10 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back navigation */}
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

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <p className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} className="text-lime-400" />
                {studio.location}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-300">
                <StarRating rating={averageRating} size={15} />
                <span className="font-semibold text-white">
                  {averageRating ? averageRating.toFixed(1) : "New"}
                </span>
                <span className="text-gray-500">
                  ({studio.totalReviews ?? reviews.length} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 md:self-auto">
            <Camera className="text-cyan-400" size={19} />
            Premium Studio Space
          </div>
        </div>

        {/* Gallery carousel */}
        <StudioGallery
          images={galleryImages}
          title={studio.title}
          location={studio.location}
        />

        {/* Main layout */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-7 lg:col-span-2">
            {/* Overview */}
            <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111C2E] p-6 md:p-8">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-3 text-purple-300">
                    <Camera size={23} />
                  </div>
                  <h2 className="text-2xl font-bold">About This Workspace</h2>
                </div>

                <p className="leading-8 text-gray-400">{studio.overview}</p>

                {studio.description && (
                  <p className="mt-4 leading-8 text-gray-400">
                    {studio.description}
                  </p>
                )}
              </div>
            </section>

            {/* Workspace specifications */}
            <section className="rounded-2xl border border-white/10 bg-[#111C2E] p-6 md:p-8">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Workspace Specifications</h2>
                <BadgeCheck className="text-lime-400" size={22} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className={`group rounded-2xl border bg-gradient-to-br p-5 transition ${spec.accent} hover:border-white/30`}
                  >
                    <spec.icon className={`mb-4 ${spec.iconColor}`} size={25} />
                    <p className="text-sm text-gray-400">{spec.label}</p>
                    <h3 className="mt-2 text-2xl font-bold">{spec.value}</h3>
                    <p className={`mt-1 text-xs ${spec.noteColor}`}>
                      {spec.note}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-white/10 bg-[#111C2E] p-6 md:p-8">
              <div className="mb-7 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Amenities</h2>
                <Sparkles className="text-lime-400" size={22} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {studio.amenities?.length ? (
                  studio.amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] ?? Sparkles;

                    return (
                      <div
                        key={`${amenity}-${index}`}
                        className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition duration-300 hover:border-lime-400/20 hover:bg-gradient-to-r hover:from-lime-400/10 hover:to-cyan-400/10"
                      >
                        <div className="rounded-xl bg-gradient-to-br from-lime-400/20 to-cyan-400/10 p-3 text-lime-300">
                          <Icon size={21} />
                        </div>

                        <span className="text-sm font-medium text-gray-200">
                          {amenity}
                        </span>

                        <CheckCircle2
                          size={17}
                          className="ml-auto text-lime-400"
                        />
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">
                    No amenities listed for this workspace yet.
                  </p>
                )}
              </div>
            </section>

            {/* Host details */}
            <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#17243A] via-[#111C2E] to-[#1D1740] p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-bold">Host Details</h2>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-400 to-cyan-400 text-[#080E1B]">
                    <User size={30} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold">{studio.ownerName}</h3>
                      <span className="inline-flex items-center gap-1 rounded-full border border-lime-400/30 bg-lime-400/10 px-2.5 py-1 text-xs text-lime-300">
                        <BadgeCheck size={13} />
                        Verified Host
                      </span>
                    </div>

                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                      <Mail size={16} />
                      {studio.ownerEmail}
                    </p>
                  </div>
                </div>

                <a
                  href={`mailto:${studio.ownerEmail}?subject=${encodeURIComponent(
                    `Question about ${studio.title}`
                  )}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-lime-400/50 hover:bg-lime-400/10"
                >
                  <Mail size={16} />
                  Contact Host
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </section>

            {/* Reviews */}
            <section className="rounded-2xl border border-white/10 bg-[#111C2E] p-6 md:p-8">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Guest Reviews</h2>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
                  <StarRating rating={averageRating} size={17} />
                  <span className="text-lg font-bold">
                    {averageRating ? averageRating.toFixed(1) : "New"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {studio.totalReviews ?? reviews.length} reviews
                  </span>
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {reviews.map((review, index) => (
                    <article
                      key={`${review.userEmail}-${index}`}
                      className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition hover:border-lime-400/20"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-lime-400/30 to-cyan-400/20 text-sm font-bold text-lime-300">
                            {review.userName?.charAt(0)?.toUpperCase() ?? "G"}
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold">
                              {review.userName}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {review.date
                                ? new Date(review.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )
                                : ""}
                            </p>
                          </div>
                        </div>

                        <Quote size={18} className="text-lime-400/60" />
                      </div>

                      <StarRating rating={review.rating} size={14} />

                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        {review.comment}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] py-12 text-center">
                  <Star className="mx-auto mb-3 text-gray-600" size={34} />
                  <h3 className="text-lg font-semibold">No reviews yet</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Be the first to book this workspace and share your
                    experience.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Right booking card */}
          <aside>
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-white/10 bg-[#111C2E] p-6">
              {/* Gradient top */}
              <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500" />

              <div className="mb-4 mt-2 flex items-center gap-2 text-sm font-semibold text-lime-400">
                <CalendarDays size={17} />
                BOOK YOUR EXPERIENCE
              </div>

              <p className="text-sm text-gray-400">Starting from</p>

              <h2 className="mt-2 text-4xl font-bold">
                ${studio.hourlyRate}
                <span className="text-sm font-normal text-gray-400">/ hour</span>
              </h2>

              <div className="my-7 border-t border-white/10" />

              <div className="space-y-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Hourly Rate</span>
                  <span className="font-semibold">${studio.hourlyRate}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Security Deposit</span>
                  <span className="font-semibold">
                    ${studio.securityDeposit}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Maximum Guests</span>
                  <span className="font-semibold">{studio.maxCapacity}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="font-semibold">{studio.category}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Rating</span>
                  <span className="flex items-center gap-2 font-semibold">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {averageRating ? averageRating.toFixed(1) : "New"}
                  </span>
                </div>
              </div>

              <div className="mt-7 rounded-xl border border-lime-400/20 bg-gradient-to-br from-lime-400/10 to-cyan-400/10 p-4">
                <div className="flex gap-3">
                  <ShieldCheck size={23} className="shrink-0 text-lime-400" />

                  <div>
                    <h4 className="text-sm font-semibold">Secure Booking</h4>
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      Reserve your preferred workspace and enjoy a professional
                      space.
                    </p>
                  </div>
                </div>
              </div>

              <BookWorkspaceModal studio={studio} className="mt-7" />

              <p className="mt-5 text-center text-xs text-gray-500">
                Contact the owner for more information.
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-7 text-sm text-gray-500 sm:flex-row">
          <p>© 2026 Studio Space. All rights reserved.</p>
          <p>Find your perfect creative space.</p>
        </div>
      </div>
    </main>
  );
};

const StudioDetailsPage = ({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) => {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#080E1B] text-gray-400">
          Loading studio details...
        </main>
      }
    >
      <StudioDetails params={params} />
    </Suspense>
  );
};

export default StudioDetailsPage;
