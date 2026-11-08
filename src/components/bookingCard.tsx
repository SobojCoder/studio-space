
"use client";
import { IBooking } from "@/Type/booking";
import { CalendarDays, Clock, Timer, Users, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import React from "react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const BookingCard = ({ booking }: { booking: IBooking }) => {
  const handleBookingDelete = async () => {
    const token = await getTokenFromClient()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking.studioId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`
        }
      },
    );

    const data = await res.json();
    redirect('/my-bookings')
    console.log(data);
  };

  return (
    <div
      key={booking._id}
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors sm:p-5 dark:border-white/10 dark:bg-[#181A20]"
    >
      {/* Studio */}
      <div className="flex flex-col gap-4 min-[400px]:flex-row">
        <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl min-[400px]:h-24 min-[400px]:w-24">
          <Image
            src={booking.image}
            alt={booking.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-medium text-green-700 dark:text-[#C4F45A]">
              STUDIO BOOKING
            </span>
          </div>

          <h3 className="mt-2 text-base font-bold text-gray-900 dark:text-white">
            {booking.title}
          </h3>

          <p className="mt-1 truncate text-xs text-gray-500 dark:text-[#94A3B8]">
            ID: {booking._id}
          </p>
        </div>
      </div>

      {/* Booking Info */}
      <div className="my-5 grid grid-cols-1 gap-4 border-y border-gray-200 py-4 min-[400px]:grid-cols-2 dark:border-white/10">
        <div className="flex min-w-0 items-center gap-2 text-sm text-gray-600 dark:text-[#94A3B8]">
          <CalendarDays size={16} className="shrink-0 text-green-700 dark:text-[#C4F45A]" />
          <span className="break-words">{booking.bookingDate}</span>
        </div>

        <div className="flex min-w-0 items-center gap-2 text-sm text-gray-600 dark:text-[#94A3B8]">
          <Clock size={16} className="shrink-0 text-green-700 dark:text-[#C4F45A]" />
          <span>{booking.startingTime}</span>
        </div>

        <div className="flex min-w-0 items-center gap-2 text-sm text-gray-600 dark:text-[#94A3B8]">
          <Users size={16} className="shrink-0 text-green-700 dark:text-[#C4F45A]" />
          <span>{booking.guests} Guests</span>
        </div>

        <div className="flex min-w-0 items-center gap-2 text-sm text-gray-600 dark:text-[#94A3B8]">
          <Timer size={16} className="shrink-0 text-green-700 dark:text-[#C4F45A]" />
          <span>{booking.duration} Hours</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-between">
        <div>
          <p className="text-xs text-gray-500 dark:text-[#94A3B8]">
            Grand Total
          </p>
          <h3 className="text-2xl font-bold text-green-700 dark:text-[#C4F45A]">
            ${booking.pricing.grandTotal}
          </h3>
        </div>

        <div className="flex w-full flex-col gap-2 min-[400px]:flex-row min-[500px]:w-auto">
          <Link
            href={`/studio-list/${booking.studioId}`}
            className="flex items-center justify-center rounded-lg bg-green-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-green-800 dark:bg-[#C4F45A] dark:text-[#111518] dark:hover:bg-[#A8E83E]"
          >
            View Details
          </Link>

          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white min-[400px]:w-auto dark:border-red-400/30 dark:bg-red-400/5 dark:text-red-400 dark:hover:border-red-400 dark:hover:bg-red-400 dark:hover:text-white">
                  <XCircle size={16} />
                  Cancel Booking
                </Button>
              }
            />

            <AlertDialogContent className="border border-gray-200 bg-white text-gray-900 sm:max-w-[425px] dark:border-white/10 dark:bg-[#15191F] dark:text-white">
              <AlertDialogHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <XCircle className="text-red-500 dark:text-red-400" size={25} />
                </div>

                <AlertDialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Cancel Your Booking?
                </AlertDialogTitle>

                <AlertDialogDescription className="text-sm leading-6 text-gray-600 dark:text-[#9299A5]">
                  Are you sure you want to cancel this studio booking? This
                  action cannot be undone. Your booking will be permanently
                  cancelled.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-5 flex-col gap-2 sm:flex-row">
                <AlertDialogCancel className="border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white">
                  Keep Booking
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleBookingDelete}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Yes, Cancel Booking
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;