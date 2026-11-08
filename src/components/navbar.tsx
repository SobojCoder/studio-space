"use client"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Aperture, Building2, CalendarDays, ChevronDown, LogOut, Menu, PlusCircle, Settings, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@base-ui/react";
import toast from "react-hot-toast";
import { redirect, usePathname, useRouter } from "next/navigation";
import { cn } from "cn";
import ThemeToggle from "./theme-toggle";
import { Suspense, useEffect, useState } from "react";

const exploreCategories = [
  "Photography Studio",
  "Meeting Studio",
  "Podcast Studio",
  "Music Studio",
  "Creative Studio",
  "Workshop Studio",
  "Video Production Studio",
  "Dance Studio",
  "Content Creation Studio",
  "Event Studio",
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studio", href: "/studio-list" },
  { label: "How to Work", href: "/#howToWork" },
  { label: "About-Us", href: "/about-us" },
  { label: "Add-studio", href: "/add-studio" },
];  



 function NavbarContent() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathName = usePathname()

  const handleSignOut = () => {
    authClient.signOut()
    toast.error('You are sign out!')
    redirect('/')
  }

  const [hash, setHash] = useState("");
  // UI-only state for the mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  const isActive = (href: string) =>
    pathName === href ||
    (href === "/#howToWork" && pathName === "/" && hash === "#howToWork");



  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-[#111518] dark:text-white transition-colors duration-300">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-lime-400">
            <Aperture className="size-5 text-black" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
            Studio<span className="text-lime-500 dark:text-lime-400">Space</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center justify-center gap-4 text-center xl:gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-sm text-zinc-600 transition-colors hover:text-lime-600 dark:text-[#94A3B8] dark:hover:text-[#C4F45A]",
                isActive(link.href) &&
                  "font-semibold text-lime-600 underline underline-offset-8 decoration-lime-600 dark:text-[#C4F45A] dark:decoration-[#C4F45A]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <span aria-hidden className="h-6 w-px bg-zinc-300 dark:bg-zinc-700" />
          {user ? (
            <Popover>
              <PopoverTrigger className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 py-1.5 pl-1.5 pr-2 transition hover:border-lime-500/60 hover:bg-zinc-100 dark:border-white/10 dark:bg-[#181A20] dark:hover:border-[#C4F45A]/60 dark:hover:bg-[#22272B] sm:gap-3 sm:pl-3">
                <span className="hidden max-w-32 truncate text-sm font-semibold text-zinc-900 dark:text-white sm:inline">
                  {user?.name}
                </span>

                <Avatar className="size-9 border-2 border-lime-500 dark:border-[#C4F45A] sm:size-10">
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || "User"}
                    referrerPolicy="no-referrer"
                  />

                  <AvatarFallback className="bg-lime-400 font-bold text-black dark:bg-[#C4F45A]">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <ChevronDown size={15} className="text-lime-600 dark:text-[#C4F45A]" />
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={12}
                className="w-[calc(100vw-2rem)] max-w-72 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-2xl dark:border-white/10 dark:bg-[#181A20] dark:text-white sm:w-72"
              >
                {/* Profile Header */}
                <div className="bg-gradient-to-br from-lime-400/20 to-transparent p-4 dark:from-[#C4F45A]/10">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-14 border-2 border-lime-500 dark:border-[#C4F45A]">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || "User"}
                        referrerPolicy="no-referrer"
                      />

                      <AvatarFallback className="bg-lime-400 text-lg font-bold text-black dark:bg-[#C4F45A]">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-zinc-900 dark:text-white">
                        {user?.name}
                      </h3>

                      <p className="truncate text-xs text-zinc-500 dark:text-slate-400">
                        {user?.email}
                      </p>

                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-lime-500/10 px-2 py-1 text-[10px] font-semibold text-lime-700 dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
                        <span className="size-1.5 rounded-full bg-lime-600 dark:bg-[#C4F45A]" />
                        Active Account
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-zinc-200 dark:bg-white/10" />

                {/* Menu Items */}
                <div className="space-y-1 p-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 transition hover:bg-lime-500/10 hover:text-lime-700 dark:text-slate-300 dark:hover:bg-[#C4F45A]/10 dark:hover:text-[#C4F45A]"
                  >
                    <UserRound size={18} />
                    My Profile
                  </Link>
                  <Link
                    href="/add-studio"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 transition hover:bg-lime-500/10 hover:text-lime-700 dark:text-slate-300 dark:hover:bg-[#C4F45A]/10 dark:hover:text-[#C4F45A]"
                  >
                    <PlusCircle size={20} />
                    Add New Studio
                  </Link>
                  <Link
                    href="/my-listing"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 transition hover:bg-lime-500/10 hover:text-lime-700 dark:text-slate-300 dark:hover:bg-[#C4F45A]/10 dark:hover:text-[#C4F45A]"
                  >
                    <Building2 size={20} />
                    My Studio Listings
                  </Link>

                  <Link
                    href="/my-bookings"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 transition hover:bg-lime-500/10 hover:text-lime-700 dark:text-slate-300 dark:hover:bg-[#C4F45A]/10 dark:hover:text-[#C4F45A]"
                  >
                    <CalendarDays size={18} />
                    My Bookings
                  </Link>
                </div>

                <Separator className="bg-zinc-200 dark:bg-white/10" />

                {/* Sign Out */}
                <div className="p-2">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-500/10 dark:text-red-400"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-full border border-lime-600 px-3 py-1.5 text-sm text-lime-700 transition-colors hover:bg-lime-500 hover:text-black dark:border-[#C6F36B] dark:text-[#C6F36B] dark:hover:bg-[#C6F36B] dark:hover:text-black sm:px-5 sm:py-2"
              >
                Sign In
              </Link>
              <Link href="/sign-up" className="hidden sm:block">
                <Button className="h-9 rounded-full bg-lime-400 px-5 text-black hover:bg-lime-300">
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex size-9 items-center justify-center rounded-md text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-[#111518] lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-lime-600 dark:text-[#94A3B8] dark:hover:bg-zinc-800/60 dark:hover:text-[#C4F45A]",
                  isActive(link.href) &&
                    "bg-lime-500/10 font-semibold text-lime-700 dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]"
                )}
              >
                {link.label}
              </Link>
            ))}

            {!user && (
              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="mt-2 sm:hidden"
              >
                <Button className="h-10 w-full rounded-full bg-lime-400 text-black hover:bg-lime-300">
                  Sign Up
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<div />}>
      <NavbarContent />
    </Suspense>
  );
}