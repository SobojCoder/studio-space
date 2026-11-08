import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking-form";
import type { IStudio } from "@/Type/studio";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

type BookingProps = {
  params: Promise<{
    bookingId: string;
  }>;
};

async function getStudio(bookingId: string): Promise<IStudio | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio/${bookingId}`);

    if (!res.ok) return null;

    const studio = await res.json();
    return studio && studio._id ? (studio as IStudio) : null;
  } catch {
    return null;
  }
}

// Main Page
export default async function BookingPage({ params }: BookingProps) {
  const { bookingId } = await params;

  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#0B0D10] text-[#9299A5]">
          Loading booking details...
        </main>
      }
    >
      <BookingDetails bookingId={bookingId} />
    </Suspense>
  );
}

// Data Fetching Component
async function BookingDetails({ bookingId }: { bookingId: string }) {
  const studio = await getStudio(bookingId);

  if (!studio) notFound();

  return <BookingForm studio={studio} />;
}
