
"use client";

import { useState } from "react";
import {
  Home,
  Tag,
  DollarSign,
  Users,
  MapPin,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  Mail,
  User,
  ArrowRight,
  Camera,
  Plus,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Dance Studio",
  "Rehearsal Room",
  "Recording Booth",
];

const amenitiesList = [
  "High-Speed Wi-Fi",
  "Free Parking",
  "Restroom",
  "Kitchen",
  "Green Screen",
  "Lighting Kit",
  "Soundproofing",
  "Air Conditioning",
  "Projector",
  "Changing Room",
  "Coffee & Tea",
  "Wheelchair Access",
];

export default function AddStudioPage() {
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    imageUrl: "",
    overview: "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageChange = (index: number, value: string) => {
    setImageUrls((prev) =>
      prev.map((url, i) => (i === index ? value : url))
    );
  };

  const addImageField = () => setImageUrls((prev) => [...prev, ""]);

  const removeImageField = (index: number) =>
    setImageUrls((prev) => prev.filter((_, i) => i !== index));

  const validImages = imageUrls.map((u) => u.trim()).filter(Boolean);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const studioData = {
      ...formData,
      imageUrl: validImages[0],
      images: validImages,
      hourlyRate: Number(formData.hourlyRate),
      securityDeposit: Number(formData.securityDeposit),
      maxCapacity: Number(formData.maxCapacity),
      amenities: selectedAmenities,
      ownerEmail: session?.user.email,
      ownerName: session?.user.name,
    };

    const token = await getTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(studioData),
    });

    const result = await res.json();

    redirect("/my-listing");
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3.5 text-sm text-[#0B0D10] outline-none transition placeholder:text-zinc-400 focus:border-[#72951A] focus:ring-2 focus:ring-[#72951A]/15 dark:border-white/10 dark:bg-[#111518] dark:text-white dark:placeholder:text-[#94A3B8] dark:focus:border-[#C4F45A] dark:focus:ring-[#C4F45A]/15";

  const labelClass =
    "mb-2 flex items-center gap-2 text-sm font-semibold text-[#0B0D10] dark:text-white";

  const perks = [
    {
      icon: Camera,
      title: "Showcase Your Space",
      description:
        "Reach thousands of creators looking for studios.",
    },
    {
      icon: DollarSign,
      title: "Earn on Your Terms",
      description:
        "Set your own hourly rate and deposit.",
    },
    {
      icon: Sparkles,
      title: "Full Control",
      description:
        "Update amenities and details anytime.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F7F0] text-[#0B0D10] transition-colors duration-300 dark:bg-[#111518] dark:text-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16">

        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#72951A]/20 bg-[#72951A]/10 px-4 py-2 text-sm font-medium text-[#72951A] dark:border-[#C4F45A]/30 dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
            <Sparkles size={16} />
            List Your Studio
          </div>

          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Add a{" "}
            <span className="text-[#72951A] dark:text-[#C4F45A]">
              Studio
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base md:text-lg dark:text-[#94A3B8]">
            Fill in the details below and publish your space to the Studio Space
            community.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr] lg:gap-8">

          {/* Left Side */}
          <aside className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 md:p-8 dark:border-white/10 dark:bg-[#181A20]">

            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#72951A]/10 blur-3xl dark:bg-[#C4F45A]/10" />

            <div className="relative z-10">
              <h2 className="text-xl font-bold sm:text-2xl">
                Why list on{" "}
                <span className="text-[#72951A] dark:text-[#C4F45A]">
                  Studio Space
                </span>
                ?
              </h2>

              <div className="mt-7 space-y-6 sm:mt-8">
                {perks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#A3E635] text-[#0B0D10] dark:bg-[#C4F45A]">
                        <Icon size={19} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#0B0D10] dark:text-white">
                          {item.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-zinc-600 dark:text-[#94A3B8]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Owner Info */}
            <div className="relative z-10 mt-10 rounded-xl border border-[#72951A]/20 bg-[#F5F7F0] p-4 sm:p-5 dark:border-[#C4F45A]/20 dark:bg-[#111518]">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#72951A] dark:text-[#C4F45A]">
                <CheckCircle2 size={16} />
                Listed by (read-only)
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 dark:bg-[#181A20]">
                  <User size={18} className="shrink-0 text-[#72951A] dark:text-[#C4F45A]" />

                  <div className="min-w-0">
                    <p className="text-xs text-zinc-500 dark:text-[#94A3B8]">
                      Name
                    </p>

                    <p className="truncate text-sm font-medium text-[#0B0D10] dark:text-white">
                      {session?.user.name ?? "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 dark:bg-[#181A20]">
                  <Mail size={18} className="shrink-0 text-[#72951A] dark:text-[#C4F45A]" />

                  <div className="min-w-0">
                    <p className="text-xs text-zinc-500 dark:text-[#94A3B8]">
                      Email
                    </p>

                    <p className="truncate text-sm font-medium text-[#0B0D10] dark:text-white">
                      {session?.user.email ?? "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Side - Form */}
          <div className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 md:p-8 lg:p-10 dark:border-white/10 dark:bg-[#181A20]">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title + Category */}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label htmlFor="title" className={labelClass}>
                    <Home size={16} className="text-[#72951A] dark:text-[#C4F45A]" />
                    Studio Title
                  </label>

                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="e.g. Sunlit Photo Studio"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="category" className={labelClass}>
                    <Tag size={16} className="text-[#72951A] dark:text-[#C4F45A]" />
                    Category
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22%2372951A%22 viewBox=%220 0 16 16%22><path d=%22M4 6l4 4 4-4z%22/></svg>')] bg-[length:16px_16px] bg-[right_1rem_center] bg-no-repeat pr-10 dark:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22%23C4F45A%22 viewBox=%220 0 16 16%22><path d=%22M4 6l4 4 4-4z%22/></svg>')]`}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rate + Deposit + Capacity */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label htmlFor="hourlyRate" className={labelClass}>
                    <DollarSign size={16} className="text-[#72951A] dark:text-[#C4F45A]" />
                    Hourly Rate ($)
                  </label>

                  <input
                    type="number"
                    id="hourlyRate"
                    name="hourlyRate"
                    min="0"
                    step="1"
                    placeholder="e.g. 45"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="securityDeposit" className={labelClass}>
                    <DollarSign size={16} className="text-[#72951A] dark:text-[#C4F45A]" />
                    Security Deposit ($)
                  </label>

                  <input
                    type="number"
                    id="securityDeposit"
                    name="securityDeposit"
                    min="0"
                    step="1"
                    placeholder="e.g. 200"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-1">
                  <label htmlFor="maxCapacity" className={labelClass}>
                    <Users size={16} className="text-[#72951A] dark:text-[#C4F45A]" />
                    Max Capacity
                  </label>

                  <input
                    type="number"
                    id="maxCapacity"
                    name="maxCapacity"
                    min="1"
                    step="1"
                    placeholder="e.g. 12"
                    value={formData.maxCapacity}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className={labelClass}>
                  <MapPin size={16} className="text-[#72951A] dark:text-[#C4F45A]" />
                  Location / Address
                </label>

                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g. 123 Creative Ave, Brooklyn, NY"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* Multiple Image URLs */}
              <div>
                <label className={labelClass}>
                  <ImageIcon size={16} className="text-[#72951A] dark:text-[#C4F45A]" />
                  Studio Images
                </label>

                <div className="space-y-3">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <input
                        type="url"
                        name={`imageUrl-${index}`}
                        placeholder={
                          index === 0
                            ? "Cover image: https://example.com/studio.jpg"
                            : "https://example.com/studio-2.jpg"
                        }
                        value={url}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        required={index === 0}
                        className={inputClass}
                      />

                      {imageUrls.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          aria-label={`Remove image ${index + 1}`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-[#F5F7F0] text-zinc-500 transition hover:border-red-400/50 hover:text-red-500 dark:border-white/10 dark:bg-[#111518] dark:text-[#94A3B8] dark:hover:text-red-400"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addImageField}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#72951A]/30 bg-[#72951A]/10 px-4 py-2 text-sm font-medium text-[#72951A] transition hover:bg-[#72951A]/20 dark:border-[#C4F45A]/30 dark:bg-[#C4F45A]/10 dark:text-[#C4F45A] dark:hover:bg-[#C4F45A]/20"
                >
                  <Plus size={16} />
                  Add another image
                </button>
              </div>

              {/* Image Preview */}
              {validImages.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {validImages.map((src, index) => (
                    <div
                      key={`${src}-${index}`}
                      className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10"
                    >
                      <div
                        className="h-32 bg-cover bg-center sm:h-40"
                        style={{
                          backgroundImage: `linear-gradient(to top, rgba(11,13,16,.7), rgba(11,13,16,.05)), url('${src}')`,
                        }}
                      />

                      {index === 0 && (
                        <span className="absolute left-2 top-2 rounded-full bg-[#A3E635] px-3 py-1 text-xs font-semibold text-[#0B0D10] dark:bg-[#C4F45A]">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Amenities */}
              <fieldset>
                <legend className={labelClass}>
                  <Sparkles size={16} className="text-[#72951A] dark:text-[#C4F45A]" />
                  Amenities
                </legend>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {amenitiesList.map((amenity) => {
                    const checked = selectedAmenities.includes(amenity);

                    return (
                      <label
                        key={amenity}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs transition sm:px-4 sm:text-sm ${
                          checked
                            ? "border-[#72951A] bg-[#A3E635] font-semibold text-[#0B0D10] dark:border-[#C4F45A] dark:bg-[#C4F45A] dark:text-[#0B0D10]"
                            : "border-zinc-200 bg-[#F5F7F0] text-zinc-600 hover:border-[#72951A]/50 hover:text-[#0B0D10] dark:border-white/10 dark:bg-[#111518] dark:text-[#94A3B8] dark:hover:border-[#C4F45A]/50 dark:hover:text-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleAmenity(amenity)}
                        />

                        {checked && <CheckCircle2 size={14} />}
                        {amenity}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Detailed Overview */}
              <div>
                <label htmlFor="overview" className={labelClass}>
                  <Sparkles size={16} className="text-[#72951A] dark:text-[#C4F45A]" />
                  Detailed Overview
                </label>

                <textarea
                  id="overview"
                  name="overview"
                  rows={6}
                  placeholder="Describe your studio — layout, equipment, house rules, ideal use cases…"
                  value={formData.overview}
                  onChange={handleChange}
                  required
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#A3E635] py-3.5 font-bold text-[#0B0D10] transition hover:bg-[#84CC16] hover:shadow-lg hover:shadow-[#72951A]/10 sm:py-4 dark:bg-[#C4F45A] dark:hover:bg-[#A8E83E] dark:hover:shadow-[#C4F45A]/10"
              >
                Publish Studio

                <ArrowRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />
              </button>

              <p className="text-center text-xs leading-relaxed text-zinc-500 sm:text-sm dark:text-[#94A3B8]">
                Your name and email are attached automatically and cannot be
                edited here.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}