"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "cn";
import { ChevronLeft, ChevronRight, Images, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type StudioGalleryProps = {
  images: string[];
  title: string;
  location: string;
};

export function StudioGallery({ images, title, location }: StudioGalleryProps) {
  const [api, setApi] = useState<CarouselApi>(undefined);
  const [current, setCurrent] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="space-y-4">
      {/* Main carousel */}
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111C2E]">
        <Carousel
          opts={{ loop: images.length > 1, align: "start" }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {images.map((src, index) => (
              <CarouselItem
                key={`${src}-${index}`}
                className="relative h-[300px] pl-0 md:h-[520px]"
              >
                <Image
                  src={src}
                  alt={`${title} — photo ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover"
                  unoptimized
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Gradient scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080E1B] via-transparent to-black/20" />

        {/* Status badge */}
        <div className="pointer-events-none absolute bottom-5 left-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm backdrop-blur-md">
            <span className="text-lime-400">●</span> Available Studio
          </span>

          <span className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-gray-200 backdrop-blur-md sm:inline-flex">
            <MapPin size={15} className="text-lime-400" />
            {location}
          </span>
        </div>

        {/* Counter */}
        <div className="pointer-events-none absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-gray-200 backdrop-blur-md">
          <Images size={15} className="text-cyan-400" />
          {current + 1} / {images.length}
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-black/70 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-black/70 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((src, index) => (
            <button
              key={`thumb-${src}-${index}`}
              type="button"
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === current}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition",
                index === current
                  ? "border-[#CCFF00] opacity-100"
                  : "border-white/10 opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
