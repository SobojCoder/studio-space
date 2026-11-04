import StudioListClient from "@/components/studioListClient";
import { IStudio } from "@/Type/studio";

interface PageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const StudioListPage = async ({ searchParams }: PageProps) => {
  const { category } = await searchParams;

  const res = await fetch("http://localhost:5000/studio-list", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const studios: IStudio[] = await res.json();

  return (
    <StudioListClient
      studios={studios}
      initialCategory={category || "All Categories"}
    />
  );
};

export default StudioListPage;