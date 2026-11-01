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
        "relative isolate w-full overflow-hidden bg-black text-white",
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
                  {/* Readability overlays: horizontal fade on desktop, flat dim on mobile. */}
                  <div className="absolute inset-0 hidden bg-gradient-to-r from-black via-black/80 to-transparent md:block" />
                  <div className="absolute inset-0 bg-black/65 md:hidden" />

                  <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 pb-16 md:px-8 md:pb-0">
                    <Badge className="mb-5 h-8! gap-2! rounded-full! border-lime-400/30! bg-lime-400/10! px-3.5! text-[11px]! font-semibold! uppercase tracking-[0.18em] text-white! backdrop-blur-sm">
                      <span
                        aria-hidden
                        className="size-2 rounded-full bg-lime-400"
                      />
                      {slide.badge}
                    </Badge>

                    <Heading className="max-w-[15ch] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                      {slide.title}{" "}
                      <span className="text-lime-400">{slide.highlight}</span>
                    </Heading>

                    <p className="mt-5 max-w-md text-base text-zinc-300 sm:text-lg">
                      {slide.description}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Button
                        render={<Link href="/studios" />}
                        className="h-12! gap-2! rounded-full! bg-lime-400! px-7! text-sm! font-semibold! text-black! hover:bg-lime-300!"
                      >
                        Explore Studios
                        <ArrowRight />
                      </Button>
                      <Button
                        render={<Link href="/list-a-studio" />}
                        variant="outline"
                        className="h-12! rounded-full! border-white/40! bg-transparent! px-7! text-sm! font-semibold! text-white! hover:bg-white/10!"
                      >
                        Host Your Space
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <CarouselPrevious className="left-4! size-11! rounded-full! border-white/20! bg-white/10! text-white! backdrop-blur-md hover:bg-white/20! hover:text-white! [&_svg]:size-5!" />
        <CarouselNext className="right-4! size-11! rounded-full! border-white/20! bg-white/10! text-white! backdrop-blur-md hover:bg-white/20! hover:text-white! [&_svg]:size-5!" />

        <div className="absolute bottom-6 left-0 right-0 z-20">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-2.5 px-6 md:px-8">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}: ${slide.badge}`}
                aria-current={index === current}
                className={cn(
                  "size-2.5 rounded-full transition-colors duration-300",
                  index === current
                    ? "bg-lime-400"
                    : "bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  )
}
