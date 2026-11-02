
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  ArrowRight,
  Camera,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

export default function BookingPage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState(2);
  const [guests, setGuests] = useState(2);

  // Demo studio information
  const studio = {
    name: "Creative Photography Studio",
    location: "Dhanmondi, Dhaka",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000",
    price: 1500,
    rating: 4.9,
  };

  const totalPrice = studio.price * duration;
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date) {
      alert("Please select a booking date!");
      return;
    }

    alert("Booking details submitted successfully!");
  };

  return (
    <main className="min-h-screen bg-[#0B0D10] px-4 py-10 text-[#F5F5F5] md:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          href="/studios"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#9299A5] transition hover:text-[#C6F36B]"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        {/* Page Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold tracking-widest text-[#C6F36B]">
            COMPLETE YOUR RESERVATION
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">
            Book Your <span className="text-[#C6F36B]">Studio</span>
          </h1>

          <p className="mt-3 text-[#9299A5]">
            Choose your preferred date and time to reserve your creative space.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Booking Form */}
          <div className="lg:col-span-2">

            <form onSubmit={handleBooking} className="space-y-7">

              {/* Date and Time */}
              <div className="rounded-2xl border border-white/10 bg-[#171A20] p-6 md:p-8">

                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-[#C6F36B]/10 p-3 text-[#C6F36B]">
                    <CalendarDays size={23} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">Date & Time</h2>
                    <p className="text-sm text-[#9299A5]">
                      Select your booking schedule
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Booking Date
                    </label>

                    <input
                      type="date"
                      value={date}
                      min={new Date().toLocaleDateString("en-CA")}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-white outline-none focus:border-[#C6F36B]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Starting Time
                    </label>

                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-white outline-none focus:border-[#C6F36B]"
                    >
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Booking Details */}
              <div className="rounded-2xl border border-white/10 bg-[#171A20] p-6 md:p-8">

                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-[#C6F36B]/10 p-3 text-[#C6F36B]">
                    <Clock size={23} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">Booking Details</h2>
                    <p className="text-sm text-[#9299A5]">
                      Customize your reservation
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Duration
                    </label>

                    <select
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-white outline-none focus:border-[#C6F36B]"
                    >
                      <option value={1}>1 Hour</option>
                      <option value={2}>2 Hours</option>
                      <option value={3}>3 Hours</option>
                      <option value={4}>4 Hours</option>
                      <option value={5}>5 Hours</option>
                      <option value={6}>6 Hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Number of Guests
                    </label>

                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-white outline-none focus:border-[#C6F36B]"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5 Guests</option>
                      <option value={6}>6 Guests</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Personal Information */}
              <div className="rounded-2xl border border-white/10 bg-[#171A20] p-6 md:p-8">

                <h2 className="mb-6 text-xl font-bold">
                  Personal Information
                </h2>

                <div className="space-y-5">

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 outline-none placeholder:text-[#9299A5] focus:border-[#C6F36B]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 outline-none placeholder:text-[#9299A5] focus:border-[#C6F36B]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 outline-none placeholder:text-[#9299A5] focus:border-[#C6F36B]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Special Instructions (Optional)
                    </label>

                    <textarea
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0D10] p-4 outline-none placeholder:text-[#9299A5] focus:border-[#C6F36B]"
                    />
                  </div>

                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#C6F36B] py-4 font-bold text-[#0B0D10] transition hover:bg-[#d5ff85]"
              >
                Confirm Booking
                <ArrowRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />
              </button>

            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">

            <div className="sticky top-8 overflow-hidden rounded-2xl border border-white/10 bg-[#171A20]">

              {/* Studio Image */}
              <div className="relative h-52">
                <Image
                  src={studio.image}
                  alt={studio.name}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#171A20] to-transparent" />

                <div className="absolute bottom-4 left-5">
                  <span className="rounded-full bg-[#C6F36B] px-3 py-1 text-xs font-bold text-[#0B0D10]">
                    PREMIUM STUDIO
                  </span>
                </div>
              </div>

              <div className="p-6">

                <h2 className="text-xl font-bold">{studio.name}</h2>

                <p className="mt-3 flex items-center gap-2 text-sm text-[#9299A5]">
                  <MapPin size={16} className="text-[#C6F36B]" />
                  {studio.location}
                </p>

                <div className="my-6 border-t border-white/10" />

                <h3 className="mb-5 font-bold">Booking Summary</h3>

                <div className="space-y-4 text-sm">

                  <div className="flex justify-between">
                    <span className="text-[#9299A5]">Date</span>
                    <span>{date || "Not selected"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#9299A5]">Starting Time</span>
                    <span>{time}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#9299A5]">Duration</span>
                    <span>{duration} Hours</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#9299A5]">Guests</span>
                    <span>{guests} People</span>
                  </div>

                </div>

                <div className="my-6 border-t border-white/10" />

                {/* Price */}
                <div className="space-y-4 text-sm">

                  <div className="flex justify-between">
                    <span className="text-[#9299A5]">
                      Studio Price ({duration}h)
                    </span>
                    <span>৳{totalPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#9299A5]">Service Fee (5%)</span>
                    <span>৳{serviceFee.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-base font-bold">Total Amount</span>

                    <span className="text-2xl font-extrabold text-[#C6F36B]">
                      ৳{grandTotal.toLocaleString()}
                    </span>
                  </div>

                </div>

                {/* Secure Booking */}
                <div className="mt-7 rounded-xl border border-[#C6F36B]/20 bg-[#C6F36B]/5 p-4">

                  <div className="flex gap-3">
                    <ShieldCheck
                      size={22}
                      className="shrink-0 text-[#C6F36B]"
                    />

                    <div>
                      <h4 className="font-semibold">
                        Secure Booking
                      </h4>

                      <p className="mt-1 text-xs leading-relaxed text-[#9299A5]">
                        Your booking information is protected and secure.
                      </p>
                    </div>
                  </div>

                </div>

                <p className="mt-5 flex items-center justify-center gap-2 text-xs text-[#9299A5]">
                  <CheckCircle2 size={15} className="text-[#C6F36B]" />
                  Easy and hassle-free reservation
                </p>

              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
