
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  User,
  Users,
  Wallet,
} from "lucide-react";
import type { IStudio } from "@/Type/studio";
import { authClient } from "@/lib/auth-client";

const BOOKING_ENDPOINT = "http://localhost:5000/booking";

type BookingStatus = "idle" | "submitting" | "success" | "error";

type BookingFormProps = {
  studio: IStudio;
};

export function BookingForm({ studio }: BookingFormProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00 AM");
  const [duration, setDuration] = useState(2);
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState<BookingStatus>("idle");
  const [error, setError] = useState("");

    const { data: session } = authClient.useSession();
    const user = session?.user;

  // Studio information
  const maxCapacity = Math.max(studio.maxCapacity || 1, 1);
  const selectedGuests = Math.min(guests, maxCapacity);

  const capacityOptions = Array.from(
    { length: maxCapacity },
    (_, index) => index + 1
  );

  // Price calculation
  const hourlyRate = studio.hourlyRate || 0;
  const securityDeposit = studio.securityDeposit || 0;

  const rentalTotal = hourlyRate * duration;
  const serviceFee = Math.round(rentalTotal * 0.05);
  const grandTotal = rentalTotal + serviceFee + securityDeposit;

  // Minimum booking date
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // Submit booking
  const handleBooking = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const bookingData = {
      title: studio.title,
      studioId: studio._id,
      image: studio.imageUrl,
      userName: user?.name,
      userEmail: user?.email,

      // Date & Time
      bookingDate: date,
      startingTime: time,

      // Booking Details
      duration: duration,
      guests: selectedGuests,

      // Personal Information
      personalInfo: {
        fullName: fullName,
        email: email,
        phone: phone,
      },

      notes: notes,

      // Price Details
      pricing: {
        hourlyRate: hourlyRate,
        rentalTotal: rentalTotal,
        serviceFee: serviceFee,
        securityDeposit: securityDeposit,
        grandTotal: grandTotal,
      },
    }
    

   const res = await fetch("http://localhost:5000/bookings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(bookingData),
});
    const data = await res.json();

    console.log(data);

  };

  // Reset form
  const resetForm = () => {
    setDate("");
    setTime("09:00 AM");
    setDuration(2);
    setGuests(Math.min(2, maxCapacity));
    setFullName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setStatus("idle");
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#0B0D10] px-4 py-10 text-white md:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <Link
          href={`/studio/${studio._id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#9299A5] transition hover:text-[#C6F36B]"
        >
          <ArrowLeft size={18} />
          Back to Studio Details
        </Link>

        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#C6F36B]">
            STUDIOSPACE / RESERVATION
          </p>

          <h1 className="text-3xl font-extrabold md:text-5xl">
            Book Your Creative
            <span className="text-[#C6F36B]"> Space.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#9299A5]">
            You&apos;re one step away from your next great project.
            Complete your booking details below.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-3">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">

            {status === "success" ? (

              /* Success Message */
              <div className="rounded-3xl border border-[#C6F36B]/20 bg-[#171A20] p-8 text-center md:p-12">

                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#C6F36B]/10 text-[#C6F36B]">
                  <CheckCircle2 size={42} />
                </div>

                <h2 className="text-3xl font-bold">
                  Booking Request Sent!
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#9299A5]">
                  Your booking request for {studio.title} has been
                  submitted successfully. The host will review
                  your request.
                </p>

                <div className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-[#0B0D10] p-5 text-left">

                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-[#9299A5]">Date</span>
                    <span>{date}</span>
                  </div>

                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-[#9299A5]">Time</span>
                    <span>{time}</span>
                  </div>

                  <div className="flex justify-between py-3 text-sm">
                    <span className="text-[#9299A5]">Duration</span>
                    <span>{duration} Hours</span>
                  </div>

                  <div className="flex justify-between border-t border-white/10 pt-4">
                    <span className="font-semibold">Total Amount</span>
                    <span className="font-bold text-[#C6F36B]">
                      ৳{grandTotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-[#9299A5]">Booking Status</span>
                    <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                      Pending
                    </span>
                  </div>

                </div>

                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                  <button
                    onClick={resetForm}
                    className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold transition hover:border-[#C6F36B]"
                  >
                    Book Another Studio
                  </button>

                  <Link
                    href="/my-bookings"
                    className="rounded-xl bg-[#C6F36B] px-6 py-3 text-sm font-bold text-[#0B0D10] transition hover:bg-[#d5ff85]"
                  >
                    View My Bookings
                  </Link>

                </div>
              </div>

            ) : (

              <form onSubmit={handleBooking} className="space-y-6">

                {/* 01 Date & Time */}
                <section className="rounded-3xl border border-white/10 bg-[#171A20] p-6 md:p-8">

                  <div className="mb-7 flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6F36B]/10 text-[#C6F36B]">
                      <CalendarDays size={23} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">
                        Date & Time
                      </h2>
                      <p className="mt-1 text-sm text-[#9299A5]">
                        When would you like to book?
                      </p>
                    </div>

                    <span className="ml-auto text-xs font-bold text-[#C6F36B]">
                      STEP 01
                    </span>

                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Booking Date
                      </label>

                      <input
                        type="date"
                        min={minDate}
                        name="bookingDate"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-sm text-white outline-none [color-scheme:dark] focus:border-[#C6F36B]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Starting Time
                      </label>

                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-sm outline-none focus:border-[#C6F36B]"
                      >
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                      </select>
                    </div>

                  </div>
                </section>

                {/* 02 Booking Details */}
                <section className="rounded-3xl border border-white/10 bg-[#171A20] p-6 md:p-8">

                  <div className="mb-7 flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6F36B]/10 text-[#C6F36B]">
                      <Clock size={23} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">
                        Booking Details
                      </h2>
                      <p className="mt-1 text-sm text-[#9299A5]">
                        Customize your studio session
                      </p>
                    </div>

                    <span className="ml-auto text-xs font-bold text-[#C6F36B]">
                      STEP 02
                    </span>

                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Duration
                      </label>

                      <select
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-sm outline-none focus:border-[#C6F36B]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((hour) => (
                          <option key={hour} value={hour}>
                            {hour} Hours
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Number of Guests
                      </label>

                      <select
                        value={selectedGuests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-sm outline-none focus:border-[#C6F36B]"
                      >
                        {capacityOptions.map((value) => (
                          <option key={value} value={value}>
                            {value} Guest{value > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>

                      <p className="mt-2 text-xs text-[#9299A5]">
                        Maximum capacity: {maxCapacity} people
                      </p>
                    </div>

                  </div>
                </section>

                {/* 03 Personal Information */}
                <section className="rounded-3xl border border-white/10 bg-[#171A20] p-6 md:p-8">

                  <div className="mb-7 flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C6F36B]/10 text-[#C6F36B]">
                      <User size={23} />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm text-[#9299A5]">
                        Tell us who is making the reservation
                      </p>
                    </div>

                    <span className="ml-auto text-xs font-bold text-[#C6F36B]">
                      STEP 03
                    </span>

                  </div>

                  <div className="space-y-5">

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Full Name
                      </label>

                      <input
                        type="text"
                        required
                        name="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-sm outline-none placeholder:text-[#9299A5] focus:border-[#C6F36B]"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">

                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Email Address
                        </label>

                        <input
                          type="email"
                          required
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-sm outline-none placeholder:text-[#9299A5] focus:border-[#C6F36B]"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Phone Number
                        </label>

                        <input
                          type="tel"
                          required
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+880 1XXXXXXXXX"
                          className="w-full rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-sm outline-none placeholder:text-[#9299A5] focus:border-[#C6F36B]"
                        />
                      </div>

                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Special Instructions
                        <span className="ml-2 font-normal text-[#9299A5]">
                          (Optional)
                        </span>
                      </label>

                      <textarea
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell the host about your project or requirements..."
                        className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0D10] p-4 text-sm outline-none placeholder:text-[#9299A5] focus:border-[#C6F36B]"
                      />
                    </div>

                  </div>
                </section>

                {/* Error */}
                {status === "error" && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#C6F36B] to-[#A8E83E] py-4 font-bold text-[#0B0D10] transition hover:shadow-lg hover:shadow-[#C6F36B]/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting"
                    ? "Submitting Request..."
                    : "Confirm Booking Request"}

                  <ArrowRight
                    size={20}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

                <p className="text-center text-xs text-[#9299A5]">
                  Your booking will remain pending until the host confirms it.
                </p>

              </form>
            )}
          </div>

          {/* RIGHT SIDE: BOOKING SUMMARY */}
          <aside className="lg:sticky lg:top-8">

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#171A20]">

              {/* Studio Image */}
              <div className="relative h-56">

                <Image
                  src={studio.imageUrl || "/images/studio-placeholder.jpg"}
                  alt={studio.title}
                  fill
                  unoptimized
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#171A20] via-transparent to-transparent" />

                <span className="absolute bottom-5 left-5 rounded-full bg-[#C6F36B] px-4 py-1.5 text-xs font-bold text-[#0B0D10]">
                  {studio.category}
                </span>

              </div>

              <div className="p-6">

                <h2 className="text-xl font-bold">
                  {studio.title}
                </h2>

                <p className="mt-3 flex items-center gap-2 text-sm text-[#9299A5]">
                  <MapPin size={16} className="text-[#C6F36B]" />
                  {studio.location}
                </p>

                <div className="mt-5 flex items-center justify-between rounded-xl bg-[#0B0D10] p-4">
                  <div>
                    <p className="text-xs text-[#9299A5]">
                      Hourly Rate
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#C6F36B]">
                      ৳{hourlyRate.toLocaleString()}
                      <span className="text-xs font-normal text-[#9299A5]">
                        /hour
                      </span>
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C6F36B]/10 text-[#C6F36B]">
                    <Wallet size={20} />
                  </div>
                </div>

                <div className="my-6 border-t border-white/10" />

                {/* Booking Information */}
                <h3 className="mb-5 font-bold">
                  Your Reservation
                </h3>

                <div className="space-y-4 text-sm">

                  <div className="flex justify-between gap-3">
                    <span className="flex items-center gap-2 text-[#9299A5]">
                      <CalendarDays size={15} />
                      Date
                    </span>
                    <span>{date || "Not selected"}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="flex items-center gap-2 text-[#9299A5]">
                      <Clock size={15} />
                      Starting Time
                    </span>
                    <span>{time}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-[#9299A5]">
                      <Users size={15} />
                      Guests
                    </span>
                    <span>{selectedGuests} People</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#9299A5]">
                      Duration
                    </span>
                    <span>{duration} Hours</span>
                  </div>

                </div>

                <div className="my-6 border-t border-white/10" />

                {/* Price Details */}
                <h3 className="mb-5 font-bold">
                  Price Details
                </h3>

                <div className="space-y-4 text-sm">

                  <div className="flex justify-between gap-2">
                    <span className="text-[#9299A5]">
                      Studio Rent ({duration}h)
                    </span>
                    <span>৳{rentalTotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between gap-2">
                    <span className="text-[#9299A5]">
                      Service Fee (5%)
                    </span>
                    <span>৳{serviceFee.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between gap-2">
                    <span className="text-[#9299A5]">
                      Security Deposit
                    </span>
                    <span>৳{securityDeposit.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-white/10 pt-5">

                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        Total Amount
                      </span>

                      <span className="text-2xl font-extrabold text-[#C6F36B]">
                        ৳{grandTotal.toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-[#9299A5]">
                      Includes refundable security deposit.
                    </p>

                  </div>

                </div>

                {/* Security */}
                <div className="mt-7 rounded-2xl border border-[#C6F36B]/20 bg-[#C6F36B]/5 p-4">

                  <div className="flex gap-3">

                    <ShieldCheck
                      size={23}
                      className="shrink-0 text-[#C6F36B]"
                    />

                    <div>
                      <h4 className="text-sm font-bold">
                        Secure Reservation
                      </h4>

                      <p className="mt-2 text-xs leading-6 text-[#9299A5]">
                        Your booking request will be sent securely
                        to the studio host for confirmation.
                      </p>
                    </div>

                  </div>

                </div>

                <p className="mt-5 text-center text-xs text-[#9299A5]">
                  Need help? Contact the StudioSpace team.
                </p>

              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
