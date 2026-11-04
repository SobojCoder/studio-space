
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingCard from "@/components/bookingCard";
import { Suspense } from "react";

export default function MyBookingsPage() {
  return (
    <Suspense fallback={<p className="bg-[#111518] p-10 text-[#C4F45A]">Loading bookings...</p>}>
      <BookingContent />
    </Suspense>
  );
}

async function BookingContent() {
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
    `http://localhost:5000/my-bookings/${user.email}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookings = await res.json();

  return (
    <main className="min-h-screen bg-[#111518] px-4 py-12 text-white md:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#C4F45A]">
            Your Creative Journey
          </p>

          <h1 className="text-3xl font-bold md:text-5xl">
            My Bookings<span className="text-[#C4F45A]">.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8]">
            Manage all your studio reservations in one place.
            Keep track of your upcoming sessions, booking details,
            and payment information.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Your Reservations
          </h2>

          <span className="rounded-full border border-[#C4F45A]/20 bg-[#C4F45A]/10 px-4 py-2 text-sm font-medium text-[#C4F45A]">
            {bookings.length} Bookings
          </span>
        </div>

        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          ) : (
            <p className="py-12 text-center text-[#94A3B8]">
              You have no bookings yet.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}
