"use client"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Aperture, Building2, CalendarDays, ChevronDown, LogOut, PlusCircle, Settings, UserRound } from "lucide-react";
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
  { label: "Add-studio", href: "/add-studio" },
  { label: "List a Studio", href: "/studio-list" },
  { label: "About-Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export  function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut =()=>{
    authClient.signOut()

    toast.error('You are sign out!')
  }
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black text-white">
      <div className="mx-auto flex h-16 w-full justify-between max-w-7xl items-center gap-8 px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-lime-400">
            <Aperture className="size-5 text-black" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-bold tracking-tight">
            Studio<span className="text-lime-400">Space</span>
          </span>
        </Link>

        <nav className="flex items-center justify-center text-center gap-6">
          
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-sm text-zinc-300 transition-colors hover:text-white">
              Explore
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="border border-zinc-800 bg-zinc-900 text-zinc-100 w-full"
            >
              {exploreCategories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  className="text-zinc-200 focus:bg-zinc-800 focus:text-white"
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className=" flex items-center gap-3">
          <span aria-hidden className="h-6 w-px bg-zinc-700" />
          {user ? (
             <Popover>
      <PopoverTrigger className="flex items-center gap-3 rounded-full border border-white/10 bg-[#181A20] py-1.5 pl-3 pr-2 transition hover:border-[#C4F45A]/60 hover:bg-[#22272B]">

          <span className="text-sm font-semibold text-white">
            {user?.name}
          </span>

          <Avatar className="size-10 border-2 border-[#C4F45A]">
            <AvatarImage
              src={user?.image || ""}
              alt={user?.name || "User"}
              referrerPolicy="no-referrer"
            />

            <AvatarFallback className="bg-[#C4F45A] font-bold text-black">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <ChevronDown size={15} className="text-[#C4F45A]" />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#181A20] p-0 text-white shadow-2xl"
      >

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-[#C4F45A]/10 to-transparent p-4">

          <div className="flex items-center gap-3">

            <Avatar className="size-14 border-2 border-[#C4F45A]">
              <AvatarImage
                src={user?.image || ""}
                alt={user?.name || "User"}
                referrerPolicy="no-referrer"
              />

              <AvatarFallback className="bg-[#C4F45A] text-lg font-bold text-black">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-white">
                {user?.name}
              </h3>

              <p className="truncate text-xs text-slate-400">
                {user?.email}
              </p>

              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#C4F45A]/10 px-2 py-1 text-[10px] font-semibold text-[#C4F45A]">
                <span className="size-1.5 rounded-full bg-[#C4F45A]" />
                Active Account
              </span>
            </div>

          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Menu Items */}
        <div className="space-y-1 p-2">

          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-[#C4F45A]/10 hover:text-[#C4F45A]"
          >
            <UserRound size={18} />
            My Profile
          </Link>
          <Link
            href="/add-studio"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-[#C4F45A]/10 hover:text-[#C4F45A]"
          >
            <PlusCircle size={20} />
           Add New Studio
          </Link>
          <Link
            href="/my-listing"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-[#C4F45A]/10 hover:text-[#C4F45A]"
          >
            <Building2 size={20} />
           My Studio Listings
          </Link>

          <Link
            href="/my-bookings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-[#C4F45A]/10 hover:text-[#C4F45A]"
          >
            <CalendarDays size={18} />
            My Bookings
          </Link>

         

        </div>

        <Separator className="bg-white/10" />

        {/* Sign Out */}
        <div className="p-2">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
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
                className="rounded-full border border-[#C6F36B] px-5 py-2 text-[#C6F36B] hover:bg-[#C6F36B] hover:text-black"
              >
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button className="h-9 rounded-full bg-lime-400 px-5 text-black hover:bg-lime-300">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
