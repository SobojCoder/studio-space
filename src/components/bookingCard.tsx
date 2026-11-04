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

const BookingCard = ({ booking }: { booking: IBooking }) => {
  const handleBookingDelete = async () => {
    const res = await fetch(
      `http://localhost:5000/my-bookings/${booking.studioId}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();
    redirect('/my-bookings')
    console.log(data);
  };
  return (
    <div
      key={booking._id}
      className="rounded-2xl border border-white/10 bg-[#181A20] p-4 sm:p-5"
    >
      {/* Studio */}
      <div className="flex gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
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
            <span className="text-xs text-[#C4F45A]">STUDIO BOOKING</span>
          </div>

          <h3 className="mt-2 text-base font-bold text-white">
            {booking.title}
          </h3>

          <p className="mt-1 truncate text-xs text-[#94A3B8]">
            ID: {booking._id}
          </p>
        </div>
      </div>

      {/* Booking Info */}
      <div className="my-5 grid grid-cols-2 gap-4 border-y border-white/10 py-4">
        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <CalendarDays size={16} className="text-[#C4F45A]" />
          {booking.bookingDate}
        </div>

        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <Clock size={16} className="text-[#C4F45A]" />
          {booking.startingTime}
        </div>

        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <Users size={16} className="text-[#C4F45A]" />
          {booking.guests} Guests
        </div>

        <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
          <Timer size={16} className="text-[#C4F45A]" />
          {booking.duration} Hours
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-[#94A3B8]">Grand Total</p>
          <h3 className="text-2xl font-bold text-[#C4F45A]">
            ${booking.pricing.grandTotal}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/studio-list/${booking.studioId}`}
            className="rounded-lg bg-[#C4F45A] px-4 py-1.5 text-sm font-bold text-[#111518] hover:bg-[#A8E83E]"
          >
            View Details
          </Link>
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all duration-300 hover:border-red-400 hover:bg-red-400 hover:text-white">
                  <XCircle size={16} />
                  Cancel Booking
                </Button>
              }
            />
            <AlertDialogContent className="border border-white/10 bg-[#15191F] text-white sm:max-w-[425px]">
              <AlertDialogHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <XCircle className="text-red-400" size={25} />
                </div>

                <AlertDialogTitle className="text-xl font-bold text-white">
                  Cancel Your Booking?
                </AlertDialogTitle>

                <AlertDialogDescription className="text-sm leading-6 text-[#9299A5]">
                  Are you sure you want to cancel this studio booking? This
                  action cannot be undone. Your booking will be permanently
                  cancelled.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-5 gap-2">
                <AlertDialogCancel className="border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white">
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
