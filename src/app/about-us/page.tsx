
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clapperboard,
  Heart,
  Lightbulb,
  Mic,
  Music,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Heart,
    title: "Built for Creators",
    description:
      "We understand the creative process and make it easier for creators to find spaces that inspire their best work.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "Transparent pricing, clear information, and a reliable booking experience help everyone feel confident.",
  },
  {
    icon: Lightbulb,
    title: "Creative Freedom",
    description:
      "From photography to music production, we connect people with spaces where new ideas come to life.",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore creative spaces that match your project, style, and budget.",
  },
  {
    number: "02",
    title: "Choose",
    description:
      "Compare facilities, amenities, pricing, and find your perfect workspace.",
  },
  {
    number: "03",
    title: "Book",
    description:
      "Select your preferred date and time and submit your booking request.",
  },
  {
    number: "04",
    title: "Create",
    description:
      "Show up, bring your ideas, and turn your creative vision into reality.",
  },
];

const categories = [
  { icon: Camera, name: "Photography Studio" },
  { icon: Video, name: "Video Production Studio" },
  { icon: Mic, name: "Podcast Studio" },
  { icon: Music, name: "Music Studios" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#111518] text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#C6F36B]/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:py-32">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C6F36B]/30 bg-[#C6F36B]/10 px-4 py-2 text-sm font-medium text-[#C6F36B]">
              <Sparkles size={16} />
              ABOUT STUDIOSPACE
            </span>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Where Creative
              <span className="text-[#C6F36B]"> Ideas </span>
              Find Their Space.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#94A3B8]">
              StudioSpace is a creative space booking platform designed to
              connect creators with inspiring studios. Whether you are a
              photographer, filmmaker, podcaster, or musician, we help you
              find the perfect space to bring your vision to life.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/studio-list"
                className="inline-flex items-center gap-2 rounded-lg bg-[#C6F36B] px-7 py-3.5 font-semibold text-[#111518] transition hover:bg-[#A8E83E]"
              >
                Explore Studios <ArrowRight size={18} />
              </Link>

              <Link
                href="/add-studio"
                className="rounded-lg border border-white/20 px-7 py-3.5 font-semibold transition hover:border-[#C6F36B] hover:text-[#C6F36B]"
              >
                Become a Host
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
                alt="Creative workspace"
                 width={200}
              height={200}
                className="h-[400px] w-full object-cover sm:h-[480px]"
              />
            </div>

            <div className="absolute -bottom-6 -left-5 rounded-xl border border-white/10 bg-[#181A20] p-5 shadow-xl sm:left-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#C6F36B]/10 p-3 text-[#C6F36B]">
                  <Clapperboard size={25} />
                </div>
                <div>
                  <h3 className="font-bold">Create Without Limits</h3>
                  <p className="text-sm text-[#94A3B8]">
                    Your ideas deserve the right space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-semibold tracking-widest text-[#C6F36B]">
              WHO WE ARE
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Making Creative Spaces Accessible to Everyone.
            </h2>

            <p className="mt-6 leading-8 text-[#94A3B8]">
              Finding the right studio should never be a challenge.
              We created StudioSpace to make discovering and booking
              creative workspaces simple, convenient, and transparent.
            </p>

            <p className="mt-4 leading-8 text-[#94A3B8]">
              Our platform brings studio owners and creative professionals
              together in one place. We believe every great project starts
              with the right environment.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Easy studio discovery and booking",
                "Transparent hourly pricing",
                "A variety of creative spaces",
                "A community built around creativity",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-[#C6F36B]"
                  />
                  <span className="text-[#D1D5DB]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb"
              alt="Photography equipment"
              width={200}
              height={200}
              className="h-64 w-full rounded-xl object-cover"
            />
            <Image
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
              alt="Music recording studio"
              width={200}
              height={200}
              className="mt-10 h-64 w-full rounded-xl object-cover"
            />
            <Image
              src="https://images.unsplash.com/photo-1593697821252-0c9137d9fc45"
              alt="Creative recording space"
              width={200}
              height={200}
              className="h-64 w-full rounded-xl object-cover"
            />
            <Image
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
              alt="Music production"
               width={200}
              height={200}
              className="mt-10 h-64 w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="border-y border-white/10 bg-[#181A20]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#111518] p-9">
            <div className="mb-6 inline-flex rounded-xl bg-[#C6F36B]/10 p-4 text-[#C6F36B]">
              <Lightbulb size={30} />
            </div>
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="mt-4 leading-8 text-[#94A3B8]">
              To make creative spaces accessible to everyone by connecting
              talented creators with the perfect environments for their
              projects.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111518] p-9">
            <div className="mb-6 inline-flex rounded-xl bg-[#C6F36B]/10 p-4 text-[#C6F36B]">
              <Sparkles size={30} />
            </div>
            <h3 className="text-2xl font-bold">Our Vision</h3>
            <p className="mt-4 leading-8 text-[#94A3B8]">
              To build a thriving creative community where every idea has
              the opportunity, resources, and space to become something
              extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 font-semibold tracking-widest text-[#C6F36B]">
            WHAT WE OFFER
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            One Platform, Endless Possibilities.
          </h2>
          <p className="mt-4 leading-7 text-[#94A3B8]">
            Discover different types of creative environments for every
            kind of project.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="group rounded-xl border border-white/10 bg-[#181A20] p-7"
              >
                <Icon
                  size={34}
                  className="mb-5 text-[#C6F36B] transition group-hover:scale-110"
                />
                <h3 className="font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm text-[#94A3B8]">
                  Find the right environment for your next creative project.
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#181A20] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 font-semibold tracking-widest text-[#C6F36B]">
              OUR VALUES
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              What Makes Us Different?
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-white/10 bg-[#111518] p-8"
                >
                  <Icon size={35} className="mb-6 text-[#C6F36B]" />
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="mt-4 leading-7 text-[#94A3B8]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="mb-3 font-semibold tracking-widest text-[#C6F36B]">
            SIMPLE PROCESS
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            From Idea to Creation.
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="text-4xl font-bold text-[#C6F36B]">
                {step.number}
              </span>
              <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-7 text-[#94A3B8]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#C6F36B] px-7 py-16 text-center text-[#111518] sm:px-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[40px] border-black/5" />

          <Users size={42} className="mx-auto mb-5" />

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Create Something Amazing?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#26351A]">
            Your next creative project deserves the perfect space.
            Explore StudioSpace and start creating today.
          </p>

          <Link
            href="/studio-list"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#111518] px-8 py-4 font-semibold text-white transition hover:bg-[#252A30]"
          >
            Find Your Studio <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
