import MyStudioListingCard from '@/components/myStudioListtingCard';
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
              <MyStudioListingCard key={studio._id} studio={studio} />
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
