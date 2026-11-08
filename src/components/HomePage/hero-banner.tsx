
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "cn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const AUTOPLAY_INTERVAL = 5000

/** Shared so the region, the track and every slide stay exactly the same height. */
const SECTION_HEIGHT = "h-[520px] sm:h-[580px] lg:h-[640px]"

type HeroSlide = {
  id: string
  badge: string
  title: string
  highlight: string
  description: string
  image: { src: string; alt: string }
}

const slides: HeroSlide[] = [
  {
    id: "photo-studio",
    badge: "Your creative space awaits",
    title: "Find the perfect space to create something",
    highlight: "extraordinary.",
    description:
      "Discover unique studios, book creative spaces, and bring your next big idea to life.",
    image: {
      src: "https://images.pexels.com/photos/30332804/pexels-photo-30332804/free-photo-of-professional-photography-studio-setup-with-lighting.jpeg?auto=compress&cs=tinysrgb&w=2400",
      alt: "Photography studio with softbox lights flanking a seamless paper backdrop",
    },
  },
  {
    id: "recording-studio",
    badge: "Where sound comes alive",
    title: "Where every voice, riff, and idea finds its",
    highlight: "perfect sound.",
    description:
      "Reserve recording booths, mixing rooms, and rehearsal spaces — by the hour, ready when you are.",
    image: {
      src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=2400&q=80",
      alt: "Condenser microphone on a shock mount inside a dark recording booth",
    },
  },
  {
    id: "event-space",
    badge: "Event spaces made easy",
    title: "Turn your next event into an",
    highlight: "unforgettable stage.",
    description:
      "From pop-up shoots to live showcases, find venues that make your moment unforgettable.",
    image: {
      src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=2400&q=80",
      alt: "Performer on a smoky stage lit by red and blue lights during a live show",
    },
  },
]

export function HeroBanner() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!api) return

    const handleSelect = (emblaApi: CarouselApi) => {
      if (!emblaApi) return
      setCurrent(emblaApi.selectedScrollSnap())
    }

    handleSelect(api)
    api.on("select", handleSelect)
    api.on("reInit", handleSelect)

    return () => {
      api.off("select", handleSelect)
      api.off("reInit", handleSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api || paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timer = setInterval(() => api.scrollNext(), AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [api, paused])

  return (
    <section
      aria-label="Featured spaces"
      className={cn(
        "relative isolate w-full overflow-hidden bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#111518] dark:text-white",
        SECTION_HEIGHT
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className={cn("w-full", SECTION_HEIGHT)}
      >
        <CarouselContent className={cn("ml-0!", SECTION_HEIGHT)}>
          {slides.map((slide, index) => {
            const Heading = index === 0 ? "h1" : "h2"

            return (
              <CarouselItem key={slide.id} className="relative h-full pl-0!">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    sizes="100vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-cover"
                  />

                  {/* Image overlays */}
                  <div className="absolute inset-0 hidden bg-gradient-to-r from-black/95 via-black/75 to-black/10 md:block" />
                  <div className="absolute inset-0 bg-black/65 md:hidden" />

                  <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-5 pb-20 sm:px-8 sm:pb-16 md:px-10 md:pb-0 lg:px-12">
                    <Badge className="mb-5 h-8! w-fit! gap-2! rounded-full! border border-[#C4F45A]/30! bg-[#C4F45A]/10! px-3.5! text-[10px]! font-semibold! uppercase tracking-[0.15em] text-[#C4F45A]! backdrop-blur-sm sm:text-[11px]!">
                      <span
                        aria-hidden
                        className="size-2 rounded-full bg-[#C4F45A]"
                      />
                      {slide.badge}
                    </Badge>

                    <Heading className="max-w-[15ch] text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.05]">
                      {slide.title}{" "}
                      <span className="text-[#C4F45A]">
                        {slide.highlight}
                      </span>
                    </Heading>

                    <p className="mt-4 max-w-md text-sm leading-6 text-zinc-200 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
                      {slide.description}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                      <Link href="/studio-list">
                        <Button className="h-11! gap-2! rounded-full! bg-[#C4F45A]! px-6! text-sm! font-semibold! text-[#111518]! transition-all hover:bg-[#A8E83E]! sm:h-12! sm:px-7!">
                          Explore Studios
                          <ArrowRight />
                        </Button>
                      </Link>

                      <Link href="/add-studio">
                        <Button
                          variant="outline"
                          className="h-11! rounded-full! border-white/40! bg-white/5! px-6! text-sm! font-semibold! text-white! backdrop-blur-sm transition-all hover:border-[#C4F45A]! hover:bg-[#C4F45A]/10! hover:text-[#C4F45A]! sm:h-12! sm:px-7!"
                        >
                          Host Your Space
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <CarouselPrevious className="left-2! size-9! rounded-full! border-white/20! bg-black/30! text-white! backdrop-blur-md hover:bg-[#C4F45A]! hover:text-[#111518]! sm:left-4! sm:size-11! [&_svg]:size-4! sm:[&_svg]:size-5!" />

        <CarouselNext className="right-2! size-9! rounded-full! border-white/20! bg-black/30! text-white! backdrop-blur-md hover:bg-[#C4F45A]! hover:text-[#111518]! sm:right-4! sm:size-11! [&_svg]:size-4! sm:[&_svg]:size-5!" />

        <div className="absolute right-0 bottom-6 left-0 z-20">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-2.5 px-5 sm:px-8 md:px-10 lg:px-12">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.badge}`}
                aria-current={index === current}
                className={cn(
                  "size-2.5 rounded-full transition-all duration-300",
                  index === current
                    ? "w-7! bg-[#C4F45A]!"
                    : "bg-white/40 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  )
}
