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
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

const handleImageChange = (index: number, value: string) => {
  setImageUrls((prev) => prev.map((url, i) => (i === index ? value : url)));
};

const addImageField = () => setImageUrls((prev) => [...prev, ""]);

const removeImageField = (index: number) =>
  setImageUrls((prev) => prev.filter((_, i) => i !== index));

const validImages = imageUrls.map((u) => u.trim()).filter(Boolean);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/add-studio',{
      method:"POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()

    console.log(data);

    const studioData = {
      ...formData,
      amenities: selectedAmenities,
      ownerEmail: session?.user.email,
      ownerName: session?.user.name,
    };
    

    console.log(studioData);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#171A20] px-4 py-4 text-[#F5F5F5] outline-none transition placeholder:text-[#9299A5] focus:border-[#C6F36B] focus:ring-2 focus:ring-[#C6F36B]/15";

  const labelClass =
    "mb-2 flex items-center gap-2 text-sm font-semibold text-[#F5F5F5]";

  const perks = [
    { icon: Camera, title: "Showcase Your Space", description: "Reach thousands of creators looking for studios." },
    { icon: DollarSign, title: "Earn on Your Terms", description: "Set your own hourly rate and deposit." },
    { icon: Sparkles, title: "Full Control", description: "Update amenities and details anytime." },
  ];

  return (
    <main className="bg-[#0B0D10] text-[#F5F5F5]">
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">

        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C6F36B]/30 bg-[#C6F36B]/10 px-4 py-2 text-sm text-[#C6F36B]">
            <Sparkles size={16} />
            List Your Studio
          </div>

          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Add a <span className="text-[#C6F36B]">Studio</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-[#9299A5]">
            Fill in the details below and publish your space to the Studio Space
            community.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr]">

          {/* Left Side — Info + Read-only Owner */}
          <aside className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#11151A] p-8">
            <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#C6F36B]/10 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold">
                Why list on <span className="text-[#C6F36B]">Studio Space</span>?
              </h2>

              <div className="mt-8 space-y-6">
                {perks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C6F36B] text-[#0B0D10]">
                        <Icon size={19} />
                      </div>

                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-[#9299A5]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Read-only Owner Info */}
            <div className="relative z-10 mt-10 rounded-xl border border-[#C6F36B]/20 bg-[#171A20] p-5">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#C6F36B]">
                <CheckCircle2 size={16} />
                Listed by (read-only)
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-[#0B0D10] px-4 py-3">
                  <User size={18} className="text-[#C6F36B]" />
                  <div className="min-w-0">
                    <p className="text-xs text-[#9299A5]">Name</p>
                    <p className="truncate font-medium">
                      {session?.user.name ?? "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg bg-[#0B0D10] px-4 py-3">
                  <Mail size={18} className="text-[#C6F36B]" />
                  <div className="min-w-0">
                    <p className="text-xs text-[#9299A5]">Email</p>
                    <p className="truncate font-medium">
                      {session?.user.email ?? "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Side — Form */}
          <div className="rounded-2xl border border-white/10 bg-[#171A20] p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title + Category */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="title" className={labelClass}>
                    <Home size={16} className="text-[#C6F36B]" />
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
                    <Tag size={16} className="text-[#C6F36B]" />
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22%23C6F36B%22 viewBox=%220 0 16 16%22><path d=%22M4 6l4 4 4-4z%22/></svg>')] bg-[length:16px_16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
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
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label htmlFor="hourlyRate" className={labelClass}>
                    <DollarSign size={16} className="text-[#C6F36B]" />
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
                    <DollarSign size={16} className="text-[#C6F36B]" />
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

                <div>
                  <label htmlFor="maxCapacity" className={labelClass}>
                    <Users size={16} className="text-[#C6F36B]" />
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

              {/* Location + Image URL */}
              {/* Location */}
<div>
  <label htmlFor="location" className={labelClass}>
    <MapPin size={16} className="text-[#C6F36B]" />
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
    <ImageIcon size={16} className="text-[#C6F36B]" />
    Studio Images
  </label>

  <div className="space-y-3">
    {imageUrls.map((url, index) => (
      <div key={index} className="flex items-center gap-3">
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
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B0D10] text-[#9299A5] transition hover:border-red-400/50 hover:text-red-400"
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
    className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#C6F36B]/30 bg-[#C6F36B]/10 px-4 py-2 text-sm text-[#C6F36B] transition hover:bg-[#C6F36B]/20"
  >
    <Plus size={16} />
    Add another image
  </button>
</div>

{/* Image Preview */}
{validImages.length > 0 && (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
    {validImages.map((src, index) => (
      <div
        key={`${src}-${index}`}
        className="relative overflow-hidden rounded-xl border border-white/10"
      >
        <div
          className="h-40 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(11,13,16,.7), rgba(11,13,16,.05)), url('${src}')`,
          }}
        />
        {index === 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-[#C6F36B] px-3 py-1 text-xs font-semibold text-[#0B0D10]">
            Cover
          </span>
        )}
      </div>
    ))}
  </div>
)}

              {/* Image Preview */}
              {formData.imageUrl && (
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(11,13,16,.7), rgba(11,13,16,.05)), url('${formData.imageUrl}')`,
                    }}
                  />
                </div>
              )}

              {/* Amenities */}
              <fieldset>
                <legend className={labelClass}>
                  <Sparkles size={16} className="text-[#C6F36B]" />
                  Amenities
                </legend>

                <div className="flex flex-wrap gap-3">
                  {amenitiesList.map((amenity) => {
                    const checked = selectedAmenities.includes(amenity);

                    return (
                      <label
                        key={amenity}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                          checked
                            ? "border-[#C6F36B] bg-[#C6F36B] font-semibold text-[#0B0D10]"
                            : "border-white/10 bg-[#0B0D10] text-[#9299A5] hover:border-[#C6F36B]/50 hover:text-[#F5F5F5]"
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
                  <Sparkles size={16} className="text-[#C6F36B]" />
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
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#C6F36B] py-4 font-bold text-[#0B0D10] transition hover:bg-[#d5ff85] hover:shadow-lg hover:shadow-[#C6F36B]/10"
              >
                Publish Studio
                <ArrowRight size={20} className="transition group-hover:translate-x-1" />
              </button>

              <p className="text-center text-sm text-[#9299A5]">
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
