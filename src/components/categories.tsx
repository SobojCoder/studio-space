import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Clapperboard,
  Drama,
  Guitar,
  Mic,
  Music,
} from "lucide-react";

const categories = [
  {
    name: "Photo Studio",
    description: "Daylight bays, cycloramas and backdrop walls.",
    Icon: Camera,
  },
  {
    name: "Film Stage",
    description: "Sound stages with lighting grids and rigging.",
    Icon: Clapperboard,
  },
  {
    name: "Recording Booth",
    description: "Acoustically treated rooms for vocals & ADR.",
    Icon: Mic,
  },
  {
    name: "Podcast Lounge",
    description: "Plug-and-play setups for two to six voices.",
    Icon: Music,
  },
  {
    name: "Dance Studio",
    description: "Sprung floors, mirrors and open movement space.",
    Icon: Drama,
  },
  {
    name: "Rehearsal Room",
    description: "Amplified rooms ready for bands and casts.",
    Icon: Guitar,
  },
];

const Categories = () => {
  return (
    <section className="w-full bg-black py-16 text-white md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
        <div className="flex items-center gap-4">
          <span aria-hidden className="h-0.5 w-12 bg-lime-400" />
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Browse by <span className="text-lime-400">Category</span>
          </h2>
        </div>

        <p className="mt-4 max-w-xl text-base text-zinc-400 md:text-lg">
          Pick the kind of space you need and get straight to creating.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/studio-list?category=${encodeURIComponent(category.name)}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-[#111518] p-6 transition duration-300 hover:-translate-y-1 hover:border-lime-400/40"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-lime-400/10 text-lime-400 transition group-hover:bg-lime-400 group-hover:text-black">
                <category.Icon aria-hidden className="size-6" strokeWidth={2} />
              </span>

              <h3 className="mt-5 text-lg font-semibold text-white">
                {category.name}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {category.description}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lime-400">
                Explore spaces
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
