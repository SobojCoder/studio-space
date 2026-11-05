"use client"
import { IListing } from "@/Type/listing";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowUpRight,
  MapPin,
  Pencil,
  ShieldCheck,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const MyStudioListingCard = ({ studio }: { studio: IListing }) => {
      const handleDelete = async () => {
        const res = await fetch(
          `http://localhost:5000/my-listing/${studio._id}`,
          {
            method: "DELETE",
          },
        );
    
        const data = await res.json();
        toast.success("YOUR STUDIO DELETE SUCCESSFULY.")
        redirect('/my-listing')
        console.log(data);
      };
  return (
    <div
      key={studio._id}
      className="group grid overflow-hidden rounded-2xl border border-white/10 bg-[#13171D] transition hover:border-[#C6F36B]/40 md:grid-cols-[260px_1fr]"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden md:h-full md:min-h-[230px]">
        {studio.imageUrl ? (
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#252A32] text-[#94A3B8]">
            No Image Available
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-[#C6F36B] backdrop-blur-md">
          {studio.category}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col justify-between p-5 md:p-7">
        <div>
          <h3 className="text-xl font-bold transition group-hover:text-[#C6F36B]">
            {studio.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-[#9299A5]">
            <MapPin size={15} className="text-[#C6F36B]" />
            {studio.location}
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#9299A5]">
            {studio.overview}
          </p>

          {/* Amenities */}
          <div className="mt-4 flex flex-wrap gap-2">
            {studio.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="rounded-md border border-white/10 bg-[#1B2028] px-3 py-1.5 text-xs text-[#B0B5BF]"
              >
                {amenity}
              </span>
            ))}
          </div>

          {/* Capacity */}
          <div className="mt-5 flex flex-wrap gap-5 text-sm text-[#B0B5BF]">
            <span className="flex items-center gap-2">
              <Users size={16} className="text-[#C6F36B]" />
              Up to {studio.maxCapacity} Guests
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#C6F36B]" />
              Deposit: ৳{studio.securityDeposit}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div>
            <span className="text-2xl font-bold text-[#C6F36B]">
              ৳{studio.hourlyRate}
            </span>
            <span className="ml-1 text-xs text-[#9299A5]">/ hour</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/edit-studio/${studio._id}`}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm transition hover:border-[#C6F36B] hover:text-[#C6F36B]"
            >
              <Pencil size={15} />
              Edit
            </Link>

            
            <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-red-500/20 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <Trash2 size={15} />
              Delete
            </Button>
              }
            />
            <AlertDialogContent className="border border-white/10 bg-[#15191F] text-white sm:max-w-[425px]">
              <AlertDialogHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <XCircle className="text-red-400" size={25} />
                </div>

                <AlertDialogTitle className="text-xl font-bold text-white">
                  Cancel Your studio?
                </AlertDialogTitle>

                <AlertDialogDescription className="text-sm leading-6 text-[#9299A5]">
                  Are you sure you want to cancel this studio? This
                  action cannot be undone. Your studio will be permanently
                  cancelled.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-5 gap-2">
                <AlertDialogCancel className="border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white">
                  Keep
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Yes, Cancel 
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

            <Link
              href={`/studio-list/${studio._id}`}
              className="rounded-lg bg-[#C6F36B] p-2.5 text-black transition hover:bg-[#d7ff88]"
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStudioListingCard;
