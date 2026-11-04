"use client"
import { IBooking } from '@/Type/booking';
import { CalendarDays, Clock, Timer, Users, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BookingCard = ({booking}:{booking: IBooking}) => {
    const handleBookingDelete = async()=>{
        const res = await fetch(
        `http://localhost:5000/my-bookings/${booking.studioId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

        console.log(data);
    }
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
                    <span className="text-xs text-[#C4F45A]">
                      STUDIO BOOKING
                    </span>
                    
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
                    className="rounded-lg bg-[#C4F45A] px-4 py-2.5 text-sm font-bold text-[#111518] hover:bg-[#A8E83E]"
                  >
                    View Details
                  </Link>

                  <button
                  onClick={handleBookingDelete}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all duration-300 hover:border-red-400 hover:bg-red-400 hover:text-white">
                    <XCircle size={16} />
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
    );
};

export default BookingCard;