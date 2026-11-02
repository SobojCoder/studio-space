"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "cn";

type FavoriteButtonProps = {
  label: string;
};

export function FavoriteButton({ label }: FavoriteButtonProps) {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={
        active ? `Remove ${label} from favorites` : `Save ${label} to favorites`
      }
      onClick={() => setActive((value) => !value)}
      className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition hover:text-lime-400"
    >
      <Heart
        aria-hidden
        strokeWidth={2}
        className={cn("size-5", active && "fill-lime-400 text-lime-400")}
      />
    </button>
  );
}
