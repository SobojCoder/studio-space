import Link from "next/link"
import { Aperture, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

const exploreCategories = [
  "Photography Studios",
  "Recording Studios",
  "Film & TV Sets",
  "Event Spaces",
  "Rehearsal Rooms",
]

const navLinks = [
  { label: "List a Studio", href: "/list-a-studio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
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
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-sm text-zinc-300 transition-colors hover:text-white">
              Explore
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="border border-zinc-800 bg-zinc-900 text-zinc-100"
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className=" flex items-center gap-3">
          <span aria-hidden className="h-6 w-px bg-zinc-700" />
          <Link
          href="/sign-in"
          className="rounded-full border border-[#C6F36B] px-5 py-2 text-[#C6F36B] hover:bg-[#C6F36B] hover:text-black"
        >
          Sign In
        </Link>
          <Link href='/sign-up'>
          <Button className="h-9 rounded-full bg-lime-400 px-5 text-black hover:bg-lime-300">
            Sign Up
          </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
