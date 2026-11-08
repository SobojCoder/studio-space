
"use client";

import { IListing } from "@/Type/listing";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const EditStudioDialog = ({ studio }: { studio: IListing }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: studio.title || "",
    category: studio.category || "",
    hourlyRate: String(studio.hourlyRate || ""),
    securityDeposit: String(studio.securityDeposit || ""),
    maxCapacity: String(studio.maxCapacity || ""),
    location: studio.location || "",
    imageUrl: studio.imageUrl || "",
    overview: studio.overview || "",
    amenities: Array.isArray(studio.amenities)
  ? studio.amenities.join(", ")
  : typeof studio.amenities === "string"
    ? studio.amenities
    : "",
  });
  console.log("form data",formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getTokenFromClient();
      const {_id, ...updatedStudio} = studio

      const updatedData = {
        ...updatedStudio,
  ...formData,
  hourlyRate: Number(formData.hourlyRate),
  securityDeposit: Number(formData.securityDeposit),
  maxCapacity: Number(formData.maxCapacity),
  amenities: formData.amenities
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
};

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-listing/${studio._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update studio");
      }

      toast.success("Studio updated successfully!");
      setOpen(false);
      router.push("/my-listing");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#111518] px-4 py-3 text-sm text-white outline-none transition focus:border-[#C4F45A]";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#94A3B8]";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm transition hover:border-[#8BBF1F] hover:text-[#4F7A00] sm:px-4 sm:py-2.5 dark:border-white/10 dark:hover:border-[#C6F36B] dark:hover:text-[#C6F36B]"
        >
          <Pencil size={15} />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border border-white/10 bg-[#181A20] text-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Your Studio
          </DialogTitle>

          <DialogDescription className="text-[#94A3B8]">
            Update your studio information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Studio Title */}
          <div>
            <label className={labelClass}>Studio Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Price and Deposit */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Hourly Rate (৳)</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                min="0"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Security Deposit (৳)</label>
              <input
                type="number"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                min="0"
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Capacity */}
          <div>
            <label className={labelClass}>Maximum Capacity</label>
            <input
              type="number"
              name="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleChange}
              min="1"
              className={inputClass}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className={labelClass}>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className={labelClass}>Studio Image URL</label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Overview */}
          <div>
            <label className={labelClass}>Overview</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows={3}
              className={inputClass}
              required
            />
          </div>

         

          {/* Amenities */}
          <div>
            <label className={labelClass}>
              Amenities (comma separated)
            </label>
            <textarea
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              rows={3}
              placeholder="Wi-Fi, Soundproofing, Air Conditioning"
              className={inputClass}
            />
          </div>

          {/* Read Only Host Information */}
          <div className="space-y-4 rounded-xl border border-[#C4F45A]/20 bg-[#C4F45A]/5 p-4">
            <h3 className="font-semibold text-[#C4F45A]">
              Host Information
            </h3>

            <div>
              <label className={labelClass}>Host Name</label>
              <input
                value={studio.ownerName || ""}
                readOnly
                className={`${inputClass} cursor-not-allowed opacity-60`}
              />
            </div>

            <div>
              <label className={labelClass}>Host Email</label>
              <input
                value={studio.ownerEmail || ""}
                readOnly
                className={`${inputClass} cursor-not-allowed opacity-60`}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#C4F45A] px-6 py-3 text-sm font-bold text-[#111518] transition hover:bg-[#A8E83E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Studio"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudioDialog;
