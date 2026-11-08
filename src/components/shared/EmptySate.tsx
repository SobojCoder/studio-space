import Link from "next/link";
import { Aperture, Plus, Search } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  icon?: "search" | "studio";
}

const EmptyState = ({
  title = "Nothing here yet!",
  description = "It looks like there is no data to display right now.",
  buttonText = "Explore Studios",
  buttonLink = "/studios",
  icon = "search",
}: EmptyStateProps) => {
  const Icon = icon === "studio" ? Aperture : Search;

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E4E7] bg-white px-5 py-12 text-center dark:border-white/10 dark:bg-[#181A20]">

      {/* Icon */}
      <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-[#EEF5DF] dark:bg-[#C4F45A]/10">
        <Icon
          size={36}
          className="text-[#72951A] dark:text-[#C4F45A]"
        />
      </div>

      {/* Content */}
      <h2 className="mb-2 text-xl font-bold text-[#181A20] dark:text-white sm:text-2xl">
        {title}
      </h2>

      <p className="mb-7 max-w-md text-sm leading-6 text-[#71717A] dark:text-[#94A3B8]">
        {description}
      </p>

      {/* Action */}
      <Link
        href={buttonLink}
        className="inline-flex items-center gap-2 rounded-full bg-[#72951A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#65A30D] dark:bg-[#C4F45A] dark:text-[#111518] dark:hover:bg-[#A8E83E]"
      >
        <Plus size={18} />
        {buttonText}
      </Link>
    </div>
  );
};

export default EmptyState;