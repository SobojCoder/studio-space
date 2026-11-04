
import StudioDetailsClient from "@/components/studio/StudioDetailsClient";
import { notFound } from "next/navigation";

const StudioDetailPage = async ({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) => {
  const { studioId } = await params;

  const res = await fetch(
    `http://localhost:5000/studio/${studioId}`
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
