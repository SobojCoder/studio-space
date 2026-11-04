import { auth } from '@/lib/auth';
import { IListing } from '@/Type/listing';
import { ArrowUpRight, Camera, MapPin, Pencil, Plus, ShieldCheck, Trash2, Users } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';

export default function MyListingPage() {
  return (
    <Suspense fallback={<p className="bg-[#111518] p-10 text-[#C4F45A]">Loading bookings...</p>}>
      <MyListing />
    </Suspense>
  );
}


const MyListing = async() => {
const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

    if (!user) {
    return (
      <div className="min-h-screen bg-[#111518] p-10 text-white">
        Please login to view your bookings.
      </div>
    );
  }


  const res = await fetch(
      `http://localhost:5000/my-listing/${user?.email}`,
      {
        cache: "no-store",
      }
    );
  
    if (!res.ok) {
      throw new Error("Failed to fetch listings");
    }
  
    const listing: IListing[] = await res.json();

    console.log(listing);


    return (
         <main className="min-h-screen bg-[#0B0D10] px-4 py-12 text-white md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#C6F36B]">
              <Camera size={17} />
              STUDIO OWNER DASHBOARD
            </div>

            <h1 className="text-3xl font-bold md:text-4xl">
              My Listings
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#9299A5]">
              Manage your studio spaces, update your listings,
              and share your creative spaces with others.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C6F36B] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d7ff88]"
          >
            <Plus size={18} />
            Add New Studio
          </Link>
        </div>

        {/* Listing Count */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Your Studio Spaces</h2>
          <p className="mt-1 text-sm text-[#9299A5]">
            {listing.length} studios listed
          </p>
        </div>

        {/* One Column Cards */}
        <div className="space-y-5">
          {listing.length > 0 ? (
            listing.map((studio) => (
              <div
                key={studio._id}
                className="group grid overflow-hidden rounded-2xl border border-white/10 bg-[#13171D] transition hover:border-[#C6F36B]/40 md:grid-cols-[260px_1fr]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden md:h-full md:min-h-[230px]">
                  {studio.imageUrl ? (
  <Image
    src={studio.imageUrl}
    alt={studio.title}
    fill
    className="object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center bg-[#252A32] text-[#94A3B8]">
    No Image Available
  </div>
)}

                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-[#C6F36B] backdrop-blur-md">
                    {studio.category}
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between p-5 md:p-7">
                  <div>
                    <h3 className="text-xl font-bold transition group-hover:text-[#C6F36B]">
                      {studio.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-[#9299A5]">
                      <MapPin size={15} className="text-[#C6F36B]" />
                      {studio.location}
                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#9299A5]">
                      {studio.overview}
                    </p>

                    {/* Amenities */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {studio.amenities.slice(0, 4).map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-md border border-white/10 bg-[#1B2028] px-3 py-1.5 text-xs text-[#B0B5BF]"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Capacity */}
                    <div className="mt-5 flex flex-wrap gap-5 text-sm text-[#B0B5BF]">
                      <span className="flex items-center gap-2">
                        <Users size={16} className="text-[#C6F36B]" />
                        Up to {studio.maxCapacity} Guests
                      </span>

                      <span className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-[#C6F36B]" />
                        Deposit: ৳{studio.securityDeposit}
                      </span>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                    <div>
                      <span className="text-2xl font-bold text-[#C6F36B]">
                        ৳{studio.hourlyRate}
                      </span>
                      <span className="ml-1 text-xs text-[#9299A5]">
                        / hour
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/edit-studio/${studio._id}`}
                        className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm transition hover:border-[#C6F36B] hover:text-[#C6F36B]"
                      >
                        <Pencil size={15} />
                        Edit
                      </Link>

                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg border border-red-500/20 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>

                      <Link
                        href={`/studio-list/${studio._id}`}
                        className="rounded-lg bg-[#C6F36B] p-2.5 text-black transition hover:bg-[#d7ff88]"
                      >
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-[#13171D] px-5 py-20 text-center">
              <Camera size={38} className="mx-auto text-[#C6F36B]" />

              <h3 className="mt-5 text-xl font-semibold">
                No studios listed yet
              </h3>

              <p className="mt-2 text-sm text-[#9299A5]">
                Start sharing your creative space with the community.
              </p>

              <Link
                href="/add-studio"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#C6F36B] px-5 py-3 text-sm font-bold text-black"
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
