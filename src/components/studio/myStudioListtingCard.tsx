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
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import EditStudioDialog from "./editStudioDialog";

const MyStudioListingCard = ({ studio }: { studio: IListing }) => {
      const handleDelete = async () => {
        const token = await getTokenFromClient()
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-listing/${studio._id}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${token}`
            }
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
      className="group grid overflow-hidden rounded-2xl border border-black/10 bg-white text-[#0B0D10] shadow-sm transition hover:border-[#8BBF1F] md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr] dark:border-white/10 dark:bg-[#13171D] dark:text-white dark:shadow-none dark:hover:border-[#C6F36B]/40"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden sm:h-56 md:h-full md:min-h-[230px]">
        {studio.imageUrl ? (
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#E8ECE0] text-[#5B6472] dark:bg-[#252A32] dark:text-[#94A3B8]">
            No Image Available
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-[#C6F36B] backdrop-blur-md sm:left-4 sm:top-4">
          {studio.category}
        </span>
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-col justify-between p-4 sm:p-5 md:p-7">
        <div>
          <h3 className="text-lg font-bold transition group-hover:text-[#4F7A00] sm:text-xl dark:group-hover:text-[#C6F36B]">
            {studio.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-[#5B6472] dark:text-[#9299A5]">
            <MapPin size={15} className="shrink-0 text-[#4F7A00] dark:text-[#C6F36B]" />
            {studio.location}
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#5B6472] dark:text-[#9299A5]">
            {studio.overview}
          </p>

          {/* Amenities */}
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.isArray(studio.amenities) &&
  studio.amenities.slice(0, 4).map((amenity, index) => (
    <span
      key={`${amenity}-${index}`}
      className="rounded-md border border-black/10 bg-[#F1F4EA] px-3 py-1.5 text-xs text-[#3F4752] dark:border-white/10 dark:bg-[#1B2028] dark:text-[#B0B5BF]"
    >
      {amenity}
    </span>
  ))}
          </div>

          {/* Capacity */}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#3F4752] dark:text-[#B0B5BF]">
            <span className="flex items-center gap-2">
              <Users size={16} className="text-[#4F7A00] dark:text-[#C6F36B]" />
              Up to {studio.maxCapacity} Guests
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#4F7A00] dark:text-[#C6F36B]" />
              Deposit: ${studio.securityDeposit}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-5 sm:mt-7 dark:border-white/10">
          <div>
            <span className="text-xl font-bold text-[#4F7A00] sm:text-2xl dark:text-[#C6F36B]">
              ${studio.hourlyRate}
            </span>
            <span className="ml-1 text-xs text-[#5B6472] dark:text-[#9299A5]">/ hour</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <EditStudioDialog  studio={studio} />

            
            <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-600 transition hover:bg-red-500/10 sm:px-4 sm:py-2.5 dark:border-red-500/20 dark:text-red-400"
            >
              <Trash2 size={15} />
              Delete
            </Button>
              }
            />
            <AlertDialogContent className="border border-black/10 bg-white text-[#0B0D10] sm:max-w-[425px] dark:border-white/10 dark:bg-[#15191F] dark:text-white">
              <AlertDialogHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <XCircle className="text-red-500 dark:text-red-400" size={25} />
                </div>

                <AlertDialogTitle className="text-lg font-bold text-[#0B0D10] sm:text-xl dark:text-white">
                  Cancel Your studio?
                </AlertDialogTitle>

                <AlertDialogDescription className="text-sm leading-6 text-[#5B6472] dark:text-[#9299A5]">
                  Are you sure you want to cancel this studio? This
                  action cannot be undone. Your studio will be permanently
                  cancelled.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-5 gap-2">
                <AlertDialogCancel className="border border-black/10 bg-black/5 text-zinc-700 hover:bg-black/10 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white">
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
              className="rounded-lg bg-[#C6F36B] p-2 text-black transition hover:bg-[#d7ff88] sm:p-2.5"
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