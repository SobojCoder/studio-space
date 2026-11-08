import { Fragment } from "react"
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CircleCheck,
  CreditCard,
  Headphones,
  Search,
  Shield,
  ShieldCheck,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const steps = [
  {
    number: "1",
    title: "Discover Spaces",
    description: "Browse a wide range of creative studios.",
    Icon: Search,
  },
  {
    number: "2",
    title: "Select Shoot Hours",
    description: "Choose your preferred date and time.",
    Icon: CalendarDays,
  },
  {
    number: "3",
    title: "Book Instantly",
    description: "Secure your booking with confidence.",
    Icon: CreditCard,
  },
  {
    number: "4",
    title: "Create & Produce",
    description: "Bring your vision to life!",
    Icon: CircleCheck,
  },
]

const guarantees = [
  { label: "Liability Protection", Icon: ShieldCheck },
  { label: "Verified Profiles", Icon: BadgeCheck },
  { label: "Equipment Safety", Icon: Shield },
  { label: "24/7 Host Support", Icon: Headphones },
]

export function HowBookingWorks() {
  return (
    <section id="howToWork"  className="w-full scroll-mt-24 bg-[#F5F7F0] py-12 text-[#0B0D10] transition-colors sm:py-16 md:py-20 lg:py-24 dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <span aria-hidden className="h-0.5 w-8 bg-lime-600 sm:w-12 dark:bg-lime-400" />
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            How Booking <span className="text-lime-700 dark:text-lime-400">Works</span>
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-10 sm:mt-10 md:mt-14 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <ol className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:flex lg:flex-1 lg:items-start lg:justify-between">
            {steps.map((step, index) => (
              <Fragment key={step.number}>
                <li className="flex w-full max-w-full flex-col items-start sm:max-w-[220px]">
                  <Badge className="size-7! rounded-full! bg-lime-400! font-bold! text-black! text-xs!">
                    {step.number}
                  </Badge>
                  <step.Icon
                    aria-hidden
                    className="mt-4 size-9 text-zinc-900 sm:size-10 dark:text-white"
                    strokeWidth={1.75}
                  />
                  <h3 className="mt-4 text-base font-semibold sm:mt-5 sm:text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                </li>
                {index < steps.length - 1 && (
                  <li
                    aria-hidden
                    className="mt-14 hidden w-5 shrink-0 text-zinc-400 lg:block dark:text-zinc-500"
                  >
                    <ArrowRight className="size-5" />
                  </li>
                )}
              </Fragment>
            ))}
          </ol>

          <div className="shrink-0 self-center text-center lg:self-start lg:pt-2 lg:text-right">
            <p className="-rotate-2 font-script text-3xl leading-tight text-lime-700 sm:text-4xl lg:text-5xl dark:text-lime-400">
              Your Creative
              <br />
              Journey Starts Here
            </p>
            <svg
              viewBox="0 0 320 24"
              fill="none"
              aria-hidden
              className="-rotate-2 mx-auto mt-1 w-52 text-lime-600 sm:w-64 lg:ml-auto lg:mr-0 dark:text-lime-400"
            >
              <path
                d="M6 17C74 7 220 5 314 11"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <Card className="mt-12 rounded-3xl! bg-white! p-0! text-[#0B0D10]! shadow-sm ring-zinc-200! sm:mt-14 md:mt-16 dark:bg-zinc-900/70! dark:text-white! dark:shadow-none dark:ring-zinc-800!">
          <div className="flex flex-col gap-8 p-5 sm:p-6 md:p-8 lg:flex-row lg:items-center lg:gap-10">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
              <ShieldCheck
                aria-hidden
                className="size-12 shrink-0 text-lime-700 sm:size-14 lg:size-16 dark:text-lime-400"
                strokeWidth={1.75}
              />
              <div>
                <h3 className="text-lg font-bold sm:text-xl lg:text-2xl">
                  Host Guarantee &amp; Creator Support
                </h3>
                <p className="mt-2 max-w-md text-sm text-zinc-600 lg:text-base dark:text-zinc-400">
                  Your creativity is our priority. Enjoy a safe, reliable and
                  hassle-free experience.
                </p>
              </div>
            </div>

            <div aria-hidden className="hidden lg:flex lg:self-stretch">
              <Separator
                orientation="vertical"
                className="w-px! bg-zinc-300! dark:bg-zinc-700!"
              />
            </div>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:flex lg:flex-1 lg:justify-between">
              {guarantees.map((item, index) => (
                <Fragment key={item.label}>
                  {index > 0 && (
                    <li
                      aria-hidden
                      className="hidden lg:flex lg:mx-5 lg:self-stretch"
                    >
                      <Separator
                        orientation="vertical"
                        className="w-px! bg-zinc-200! dark:bg-zinc-800!"
                      />
                    </li>
                  )}
                  <li className="flex flex-col items-center gap-3 text-center">
                    <item.Icon
                      aria-hidden
                      className="size-7 text-lime-700 dark:text-lime-400"
                      strokeWidth={1.75}
                    />
                    <span className="max-w-[9ch] text-sm font-semibold leading-tight">
                      {item.label}
                    </span>
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </section>
  )
}