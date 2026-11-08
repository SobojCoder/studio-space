"use client"

import { Fragment, useState, type FormEvent } from "react"
import Link from "next/link"
import { Aperture, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const footerLinks = [
  { label: "Explore", href: "/" },
  { label: "About", href: "/about" },
  { label: "Help", href: "/contact" },
  { label: "Contact", href: "/contact" },
]

const socials = [
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-6">
        <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.58A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.12 2.12c1.88.58 9.38.58 9.38.58s7.5 0 9.38-.58a3 3 0 0 0 2.12-2.12c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
        className="size-6"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.25" />
        <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-6">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
]

export function Footer({ year }: { year: number }) {
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="w-full border-t border-zinc-200 bg-[#F5F7F0] text-[#0B0D10] transition-colors dark:border-zinc-800 dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
          <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full bg-lime-400">
                <Aperture className="size-6 text-black" strokeWidth={2.5} />
              </span>
              <span className="text-xl font-bold tracking-tight sm:text-2xl">
                Studio<span className="text-lime-700 dark:text-lime-400">Space</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Create. Book. Inspire.</p>
          </div>

          <div className="flex flex-col items-center gap-5">
            <nav
              aria-label="Footer"
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
            >
              {footerLinks.map((link, index) => (
                <Fragment key={link.label}>
                  {index > 0 && (
                    <Separator
                      orientation="vertical"
                      aria-hidden
                      className="h-4! w-px! bg-zinc-300! dark:bg-zinc-700!"
                    />
                  )}
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </Fragment>
              ))}
            </nav>

            <div className="flex items-center gap-4 sm:gap-5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-zinc-600 transition-colors hover:text-lime-700 dark:text-zinc-300 dark:hover:text-lime-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end">
            <p className="mb-3 text-center text-sm font-semibold sm:text-left">Stay in the loop</p>
            {subscribed ? (
              <p
                aria-live="polite"
                className="flex min-h-12 items-center rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
              >
                You&apos;re on the list — watch your inbox!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <Input
                  type="email"
                  required
                  name="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="h-12! border-zinc-300! bg-white! pr-16! text-sm! text-zinc-900! placeholder:text-zinc-400! focus-visible:border-lime-600! focus-visible:ring-lime-500/30! dark:border-zinc-700! dark:bg-transparent! dark:text-white! dark:placeholder:text-zinc-500! dark:focus-visible:border-lime-400! dark:focus-visible:ring-lime-400/30!"
                />
                <Button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute inset-y-0 right-0 h-full! w-12 rounded-l-none! bg-lime-400! text-black! hover:bg-lime-300! focus-visible:ring-lime-400/40! sm:w-14"
                >
                  <Send className="size-5" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <Separator className="my-6 h-px! w-full! bg-zinc-200! sm:my-8 dark:bg-zinc-800!" />

        <div className="flex flex-col items-center gap-3 text-center sm:gap-4 md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {year} StudioSpace. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/privacy" className="transition-colors hover:text-zinc-900 dark:hover:text-white">
              Privacy Policy
            </Link>
            <span aria-hidden className="text-zinc-300 dark:text-zinc-700">
              |
            </span>
            <Link href="/terms" className="transition-colors hover:text-zinc-900 dark:hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}