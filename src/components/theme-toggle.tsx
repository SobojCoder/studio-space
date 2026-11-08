"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex size-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-[#181A20] dark:text-[#C4F45A] dark:hover:bg-zinc-800"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={19} />
      ) : (
        <Moon size={19} />
      )}
    </button>
  );
}