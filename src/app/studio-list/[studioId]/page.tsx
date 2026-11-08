
import StudioDetailsClient from "@/components/studio/StudioDetailsClient";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { notFound } from "next/navigation";

const StudioDetailPage = async ({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) => {
  const { studioId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studio/${studioId}`
  );

  if (!res.ok) {
    notFound();
  }

  const studio = await res.json();

  if (!studio || !studio._id) {
    notFound();
  }

  return <StudioDetailsClient studio={studio} />;
};

export default StudioDetailPage;
