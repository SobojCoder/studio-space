import MyStudioListingCard from "@/components/myStudioListtingCard";
import EmptyState from "@/components/shared/EmptySate";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { IListing } from "@/Type/listing";
import { Camera, Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React, { Suspense } from "react";

export default function MyListingPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F5F7F0] p-6 text-[#72951A] dark:bg-[#111518] dark:text-[#C4F45A]">
          Loading listings...
        </main>
      }
    >
      <MyListing />
    </Suspense>
  );
}

const MyListing = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7F0] px-4 text-center dark:bg-[#111518]">
        <div className="rounded-2xl border border-[#E4E4E7] bg-white p-8 dark:border-white/10 dark:bg-[#181A20]">
          <h2 className="text-xl font-bold text-[#181A20] dark:text-white">
            Login Required
          </h2>
          <p className="mt-3 text-sm text-[#52525B] dark:text-[#94A3B8]">
            Please login to view your studio listings.
          </p>
        </div>
      </div>
    );
  }

  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-listing/${user.email}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch listings");
  }

  const listing: IListing[] = await res.json();

  return (
    <main className="min-h-screen bg-[#F5F7F0] px-4 py-12 text-[#0B0D10] sm:px-6 md:px-8 md:py-16 dark:bg-[#111518] dark:text-white">
      {listing.length === 0 && (
  <EmptyState
    title="No Studio Listings"
    description="You haven't listed any creative spaces yet. Start sharing your studio with creators."
    buttonText="Add Your Studio"
    buttonLink="/add-studio"
    icon="studio"
  />
)}
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[#E4E4E7] pb-8 sm:flex-row sm:items-center dark:border-white/10">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#72951A] sm:text-sm dark:text-[#C4F45A]">
              <Camera size={17} />
              Studio Owner Dashboard
            </div>

            <h1 className="text-3xl font-bold text-[#181A20] sm:text-4xl dark:text-white">
              My Listings
              <span className="text-[#72951A] dark:text-[#C4F45A]">.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#52525B] sm:text-base dark:text-[#94A3B8]">
              Manage your studio spaces, update your listings, and share your
              creative spaces with others.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#A3E635] px-5 py-3 text-sm font-bold text-[#181A20] transition hover:bg-[#65A30D] hover:text-white sm:w-auto dark:bg-[#C4F45A] dark:text-[#111518] dark:hover:bg-[#A8E83E]"
          >
            <Plus size={18} />
            Add New Studio
          </Link>
        </div>

        {/* Listing Count */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[#181A20] sm:text-xl dark:text-white">
              Your Studio Spaces
            </h2>

            <p className="mt-1 text-sm text-[#71717A] dark:text-[#94A3B8]">
              {listing.length} studios listed
            </p>
          </div>

          <span className="rounded-full border border-[#72951A]/20 bg-[#A3E635]/15 px-4 py-2 text-sm font-medium text-[#52730D] dark:border-[#C4F45A]/20 dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
            {listing.length} Listings
          </span>
        </div>

        {/* Listing Cards */}
        <div className="space-y-5">
          {listing.length > 0 ? (
            listing.map((studio) => (
              <MyStudioListingCard key={studio._id} studio={studio} />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D4D4D8] bg-white px-5 py-16 text-center sm:py-20 dark:border-white/15 dark:bg-[#181A20]">
              <Camera
                size={38}
                className="mx-auto text-[#72951A] dark:text-[#C4F45A]"
              />

              <h3 className="mt-5 text-xl font-semibold text-[#181A20] dark:text-white">
                No Studios Listed Yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#71717A] dark:text-[#94A3B8]">
                Start sharing your creative space with the community and turn
                your studio into an opportunity.
              </p>

              <Link
                href="/add-studio"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#A3E635] px-5 py-3 text-sm font-bold text-[#181A20] transition hover:bg-[#65A30D] hover:text-white dark:bg-[#C4F45A] dark:text-[#111518] dark:hover:bg-[#A8E83E]"
              >
                <Plus size={17} />
                Create Your First Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};