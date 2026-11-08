import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingCard from "@/components/studio/bookingCard";
import { Suspense } from "react";
import { IBooking } from "@/Type/booking";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import EmptyState from "@/components/shared/EmptySate";

export default function MyBookingsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#F5F7F0] p-6 text-[#72951A] dark:bg-[#111518] dark:text-[#C4F45A]">
          Loading bookings...
        </main>
      }
    >
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
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7F0] px-4 text-center text-[#52525B] dark:bg-[#111518] dark:text-white">
        <div className="rounded-2xl border border-[#E4E4E7] bg-white p-8 dark:border-white/10 dark:bg-[#181A20]">
          <h2 className="text-xl font-bold text-[#181A20] dark:text-white">
            Login Required
          </h2>
          <p className="mt-3 text-sm text-[#52525B] dark:text-[#94A3B8]">
            Please login to view your bookings.
          </p>
        </div>
      </div>
    );
  }

  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user.email}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookings: IBooking[] = await res.json();
  

  return (
    <main className="min-h-screen bg-[#F5F7F0] px-4 py-12 text-[#0B0D10] sm:px-6 md:px-8 md:py-16 dark:bg-[#111518] dark:text-white">
      {bookings.length === 0 && (
  <EmptyState
    title="No Bookings Yet"
    description="You haven't booked any creative spaces yet. Explore our studios and find the perfect place for your next project."
    buttonText="Explore Studios"
    buttonLink="/studios"
    icon="search"
  />
)}
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[#72951A] sm:text-sm dark:text-[#C4F45A]">
            Your Creative Journey
          </p>

          <h1 className="text-3xl font-bold text-[#181A20] sm:text-4xl md:text-5xl dark:text-white">
            My Bookings
            <span className="text-[#72951A] dark:text-[#C4F45A]">.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#52525B] sm:text-base dark:text-[#94A3B8]">
            Manage all your studio reservations in one place.
            Keep track of your upcoming sessions, booking details,
            and payment information.
          </p>
        </div>

        {/* Reservation Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-[#181A20] sm:text-xl dark:text-white">
            Your Reservations
          </h2>

          <span className="rounded-full border border-[#72951A]/20 bg-[#A3E635]/15 px-4 py-2 text-sm font-medium text-[#52730D] dark:border-[#C4F45A]/20 dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
            {bookings.length} Bookings
          </span>
        </div>

        {/* Booking List */}
        <div className="space-y-5 sm:space-y-6">
          {bookings.length > 0 ? (
            bookings.map((booking: IBooking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D4D4D8] bg-white px-5 py-16 text-center dark:border-white/10 dark:bg-[#181A20]">
              <h3 className="text-lg font-semibold text-[#181A20] dark:text-white">
                No Bookings Yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#71717A] dark:text-[#94A3B8]">
                You haven&apos;t booked any creative spaces yet. Explore our
                studios and find the perfect space for your next project.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}