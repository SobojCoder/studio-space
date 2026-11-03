import { BookingForm } from "@/components/booking-form";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  const { studioId } = await params;

  const res = await fetch(
    `http://localhost:5000/studio/${studioId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div>Studio not found</div>;
  }

  const studio = await res.json();

  return <BookingForm studio={studio} />;
}