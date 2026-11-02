"use client";

import { useState } from "react";
import { cn } from "cn";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type BookableStudio = {
  _id: string;
  title: string;
  location: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  ownerName: string;
  ownerEmail: string;
};

type BookingModalProps = {
  studio: BookableStudio;
  className?: string;
};

type BookingForm = {
  name: string;
  email: string;
  date: string;
  time: string;
  hours: string;
  notes: string;
};

const initialForm: BookingForm = {
  name: "",
  email: "",
  date: "",
  time: "10:00",
  hours: "2",
  notes: "",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0B1220] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/15 [color-scheme:dark]";

const labelClass = "mb-2 flex items-center gap-2 text-sm font-semibold text-gray-200";

export function BookWorkspaceModal({ studio, className }: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [confirmed, setConfirmed] = useState<{
    form: BookingForm;
    total: number;
  } | null>(null);

  const hours = Number(form.hours) || 0;
  const rentalTotal = studio.hourlyRate * hours;
  const total = rentalTotal + studio.securityDeposit;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setStatus("idle");
      setConfirmed(null);
      setForm(initialForm);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // Booking API is not available yet — simulate the request round trip.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setConfirmed({ form, total });
    setStatus("success");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className={cn(
          "group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-400 to-[#CCFF00] px-6 py-4 text-base font-bold text-[#080E1B] shadow-lg shadow-lime-400/10 transition-all duration-300 hover:from-cyan-300 hover:to-lime-400 hover:shadow-lime-400/30",
          className
        )}
      >
        <CalendarDays size={20} />
        Book Workspace Now
        <ArrowUpRight
          size={18}
          className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] overflow-y-auto gap-0 border border-white/10 bg-[#111C2E] p-0 text-white shadow-2xl shadow-black/50 sm:max-w-xl"
      >
        <div className="relative">
          <div className="h-1.5 w-full bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500" />

          <button
            type="button"
            aria-label="Close booking form"
            onClick={() => handleOpenChange(false)}
            className="absolute right-3 top-5 rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>

          {status === "success" && confirmed ? (
            <div className="p-7 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-lime-400/15 text-lime-400">
                <CheckCircle2 size={34} />
              </div>

              <h3 className="text-xl font-bold">Booking Request Sent!</h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
                Your request for {studio.title} has been shared with{" "}
                {studio.ownerName}. A confirmation will be emailed to{" "}
                <span className="text-gray-200">{confirmed.form.email}</span>{" "}
                shortly.
              </p>

              <div className="mt-6 space-y-3 rounded-xl border border-lime-400/20 bg-gradient-to-br from-lime-400/10 to-cyan-400/10 p-4 text-left text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-400">Date</span>
                  <span className="font-semibold">
                    {confirmed.form.date} at {confirmed.form.time}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-semibold">
                    {confirmed.form.hours} hour
                    {confirmed.form.hours === "1" ? "" : "s"}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-400">Guests</span>
                  <span className="font-semibold">
                    Up to {studio.maxCapacity} people
                  </span>
                </div>
                <div className="flex justify-between gap-3 border-t border-white/10 pt-3">
                  <span className="text-gray-400">Estimated total</span>
                  <span className="font-bold text-lime-400">
                    ${confirmed.total}
                  </span>
                </div>
              </div>

              <DialogClose
                render={
                  <button
                    type="button"
                    className="mt-6 w-full rounded-xl bg-gradient-to-r from-lime-400 to-[#CCFF00] px-6 py-3.5 text-sm font-bold text-[#080E1B] transition hover:opacity-90"
                  />
                }
              >
                Done
              </DialogClose>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-7">
              <DialogHeader className="gap-2 pr-10 text-left">
                <DialogTitle className="text-xl font-bold text-white">
                  Book {studio.title}
                </DialogTitle>

                <DialogDescription className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} className="text-lime-400" />
                    {studio.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <User size={14} className="text-lime-400" />
                    Hosted by {studio.ownerName}
                  </span>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="booking-name">
                    Full name
                  </label>
                  <input
                    id="booking-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="booking-email">
                    Email address
                  </label>
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="booking-date">
                    Preferred date
                  </label>
                  <input
                    id="booking-date"
                    name="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="booking-time">
                    Start time
                  </label>
                  <input
                    id="booking-time"
                    name="time"
                    type="time"
                    required
                    value={form.time}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="booking-hours">
                    Duration
                  </label>
                  <select
                    id="booking-hours"
                    name="hours"
                    value={form.hours}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((value) => (
                      <option key={value} value={value}>
                        {value} hour{value === 1 ? "" : "s"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="booking-guests">
                    Guests
                  </label>
                  <input
                    id="booking-guests"
                    type="text"
                    readOnly
                    value={`Up to ${studio.maxCapacity} people`}
                    className={cn(inputClass, "cursor-not-allowed text-gray-400")}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="booking-notes">
                    Special requests <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <textarea
                    id="booking-notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Tell the host what you're planning..."
                    className={cn(inputClass, "resize-none")}
                  />
                </div>
              </div>

              {/* Price summary */}
              <div className="mt-5 space-y-3 rounded-xl border border-lime-400/20 bg-gradient-to-br from-lime-400/10 to-cyan-400/10 p-4 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-400">
                    ${studio.hourlyRate} × {hours} hour{hours === 1 ? "" : "s"}
                  </span>
                  <span className="font-semibold">${rentalTotal}</span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-gray-400">Refundable security deposit</span>
                  <span className="font-semibold">
                    ${studio.securityDeposit}
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-t border-white/10 pt-3">
                  <span className="text-gray-400">Estimated total</span>
                  <span className="font-bold text-lime-400">${total}</span>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-white/[0.03] p-4">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-lime-400" />
                <p className="text-xs leading-5 text-gray-400">
                  No payment is charged now. The host confirms your booking by
                  email, and the deposit is fully refundable after checkout.
                </p>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-400 to-[#CCFF00] px-6 py-3.5 text-sm font-bold text-[#080E1B] transition-all hover:from-cyan-300 hover:to-lime-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>Sending request...</>
                ) : (
                  <>
                    Confirm Booking
                    <ArrowUpRight size={17} />
                  </>
                )}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
                <Mail size={13} />
                Questions? {studio.ownerEmail}
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
