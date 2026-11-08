
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Camera,
  Loader2,
  LogOut,
  Mail,
  Pencil,
  PlusCircle,
  User,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const quickLinks = [
  {
    label: "Add New Studio",
    href: "/add-studio",
    icon: PlusCircle,
    description: "Publish a new space to the community.",
  },
  {
    label: "My Studio Listings",
    href: "/studio-list",
    icon: Building2,
    description: "Manage the studios you've listed.",
  },
  {
    label: "Back to Home",
    href: "/",
    icon: ArrowRight,
    description: "Return to the StudioSpace homepage.",
  },
];

const inputClass =
  "w-full rounded-xl border border-[#E4E4E7] bg-[#F5F7F0] px-4 py-4 text-[#181A20] outline-none transition placeholder:text-[#71717A] focus:border-[#72951A] focus:ring-2 focus:ring-[#72951A]/15 dark:border-white/10 dark:bg-[#111518] dark:text-white dark:placeholder:text-[#9299A5] dark:focus:border-[#C4F45A] dark:focus:ring-[#C4F45A]/15";

const labelClass =
  "mb-2 flex items-center gap-2 text-sm font-semibold text-[#181A20] dark:text-white";

type SessionUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

function EditProfileForm({ user }: { user: SessionUser }) {
  const [name, setName] = useState(user.name ?? "");
  const [image, setImage] = useState(user.image ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Display name cannot be empty.");
      return;
    }

    setSaving(true);

    const { error } = await authClient.updateUser({
      name: trimmedName,
      image: image.trim() || null,
    });

    setSaving(false);

    if (error) {
      toast.error(error.message ?? "Your profile could not be updated.");
      return;
    }

    toast.success("Profile updated!");
  };

  const previewImage = image.trim() || user.image || "";
  const previewInitial = (name.trim() || user.name || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="rounded-2xl border border-[#E4E4E7] bg-white p-5 shadow-sm sm:p-6 md:p-8 lg:p-10 dark:border-white/10 dark:bg-[#181A20]">
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-xl font-bold text-[#181A20] sm:text-2xl dark:text-white">
          <Pencil size={20} className="text-[#72951A] dark:text-[#C4F45A]" />
          Edit Profile
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#52525B] dark:text-[#94A3B8]">
          Update your display name and avatar. Your email stays the same so
          your bookings and listings keep working.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Display Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            <User size={16} className="text-[#72951A] dark:text-[#C4F45A]" />
            Display Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label htmlFor="image" className={labelClass}>
            <Camera
              size={16}
              className="text-[#72951A] dark:text-[#C4F45A]"
            />
            Avatar Image URL
          </label>

          <input
            type="url"
            id="image"
            name="image"
            placeholder="https://example.com/avatar.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={inputClass}
          />

          <p className="mt-2 text-xs text-[#71717A] dark:text-[#94A3B8]">
            Paste a link to your photo. Leave it empty to fall back to your
            initial.
          </p>
        </div>

        {/* Live Preview */}
        <div className="flex items-center gap-4 rounded-xl border border-[#E4E4E7] bg-[#F5F7F0] p-4 dark:border-white/10 dark:bg-[#111518]">
          <Avatar className="size-14 border-2 border-[#72951A] dark:border-[#C4F45A]">
            <AvatarImage
              src={previewImage}
              alt={name.trim() || user.name || "User"}
              referrerPolicy="no-referrer"
            />

            <AvatarFallback className="bg-[#A3E635] text-lg font-bold text-[#181A20] dark:bg-[#C4F45A] dark:text-black">
              {previewInitial}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-[#71717A] dark:text-[#94A3B8]">
              Preview
            </p>

            <p className="truncate font-semibold text-[#181A20] dark:text-white">
              {name.trim() || user.name || "Your name"}
            </p>
          </div>
        </div>

        {/* Email Read Only */}
        <div className="flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-[#F5F7F0] px-4 py-3 dark:border-white/10 dark:bg-[#111518]">
          <Mail
            size={18}
            className="shrink-0 text-[#72951A] dark:text-[#C4F45A]"
          />

          <div className="min-w-0">
            <p className="text-xs text-[#71717A] dark:text-[#94A3B8]">
              Email (read-only)
            </p>
            <p className="truncate font-medium text-[#181A20] dark:text-white">
              {user.email}
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#A3E635] py-4 font-bold text-[#181A20] transition hover:bg-[#65A30D] hover:text-white hover:shadow-lg hover:shadow-[#72951A]/10 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#C4F45A] dark:text-[#111518] dark:hover:bg-[#A8E83E] dark:hover:text-[#111518]"
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving…
            </>
          ) : (
            <>
              Save Changes
              <ArrowRight
                size={20}
                className="transition group-hover:translate-x-1"
              />
            </>
          )}
        </button>

        <p className="text-center text-sm text-[#71717A] dark:text-[#94A3B8]">
          Changes apply everywhere you appear on Studio Space.
        </p>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message ?? "You could not be signed out.");
      return;
    }

    toast.success("Signed out. See you soon!");
  };

  const createdAt = user?.createdAt;
  let memberSince: string | null = null;

  if (createdAt) {
    const parsed = new Date(`${createdAt}`);

    if (!Number.isNaN(parsed.getTime())) {
      memberSince = parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F7F0] text-[#181A20] dark:bg-[#111518] dark:text-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#72951A]/25 bg-[#A3E635]/15 px-4 py-2 text-sm font-semibold text-[#52730D] dark:border-[#C4F45A]/30 dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
            <UserRound size={16} />
            My Account
          </div>

          <h1 className="text-3xl font-extrabold leading-tight text-[#181A20] sm:text-4xl md:text-5xl dark:text-white">
            My <span className="text-[#72951A] dark:text-[#C4F45A]">Profile</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#52525B] sm:text-base md:text-lg dark:text-[#94A3B8]">
            Manage how you appear across Studio Space and jump back into your
            listings.
          </p>
        </div>

        {isPending ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-[#E4E4E7] bg-white dark:border-white/10 dark:bg-[#181A20]">
            <Loader2
              size={32}
              className="animate-spin text-[#72951A] dark:text-[#C4F45A]"
            />
          </div>
        ) : !user ? (
          /* Signed Out Prompt */
          <div className="mx-auto max-w-lg rounded-2xl border border-[#E4E4E7] bg-white p-6 text-center shadow-sm sm:p-10 dark:border-white/10 dark:bg-[#181A20]">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#A3E635]/20 text-[#52730D] dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
              <UserRound size={30} />
            </span>

            <h2 className="mt-6 text-xl font-bold text-[#181A20] sm:text-2xl dark:text-white">
              You&apos;re not signed in
            </h2>

            <p className="mt-3 text-sm text-[#52525B] dark:text-[#94A3B8]">
              Sign in to view and edit your Studio Space profile.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/sign-in"
                className="rounded-xl bg-[#A3E635] px-6 py-3 font-bold text-[#181A20] transition hover:bg-[#65A30D] hover:text-white dark:bg-[#C4F45A] dark:text-[#111518] dark:hover:bg-[#A8E83E]"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl border border-[#72951A]/40 px-6 py-3 font-semibold text-[#52730D] transition hover:bg-[#A3E635]/15 dark:border-[#C4F45A]/40 dark:text-[#C4F45A] dark:hover:bg-[#C4F45A]/10"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-8">
            {/* Left — Profile Card */}
            <aside className="relative flex flex-col overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-[#181A20]">
              <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#A3E635]/15 blur-3xl dark:bg-[#C4F45A]/10" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <Avatar className="size-24 border-2 border-[#72951A] sm:size-28 dark:border-[#C4F45A]">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                    referrerPolicy="no-referrer"
                  />

                  <AvatarFallback className="bg-[#A3E635] text-3xl font-bold text-[#181A20] dark:bg-[#C4F45A] dark:text-black">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <h2 className="mt-5 max-w-full truncate text-xl font-bold text-[#181A20] sm:text-2xl dark:text-white">
                  {user.name}
                </h2>

                <p className="mt-1 flex min-w-0 items-center gap-2 text-sm text-[#71717A] dark:text-[#94A3B8]">
                  <Mail
                    size={15}
                    className="shrink-0 text-[#72951A] dark:text-[#C4F45A]"
                  />
                  <span className="truncate">{user.email}</span>
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#A3E635]/15 px-3 py-1.5 text-xs font-semibold text-[#52730D] dark:bg-[#C4F45A]/10 dark:text-[#C4F45A]">
                  <span className="size-1.5 rounded-full bg-[#72951A] dark:bg-[#C4F45A]" />
                  Active Account
                </span>

                {memberSince && (
                  <p className="mt-4 text-xs uppercase tracking-widest text-[#71717A] dark:text-[#94A3B8]">
                    Member since {memberSince}
                  </p>
                )}
              </div>

              {/* Quick Links */}
              <div className="relative z-10 mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#71717A] dark:text-[#94A3B8]">
                  Quick Links
                </p>

                <div className="space-y-2">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center gap-3 rounded-xl border border-[#E4E4E7] bg-[#F5F7F0] px-3 py-3 transition hover:border-[#72951A]/40 hover:bg-[#A3E635]/10 sm:px-4 dark:border-white/10 dark:bg-[#111518] dark:hover:border-[#C4F45A]/40 dark:hover:bg-[#C4F45A]/10"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#A3E635]/20 text-[#52730D] transition group-hover:bg-[#A3E635] group-hover:text-[#181A20] dark:bg-[#C4F45A]/10 dark:text-[#C4F45A] dark:group-hover:bg-[#C4F45A] dark:group-hover:text-black">
                          <Icon size={18} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-[#181A20] dark:text-white">
                            {link.label}
                          </span>

                          <span className="block truncate text-xs text-[#71717A] dark:text-[#94A3B8]">
                            {link.description}
                          </span>
                        </span>

                        <ArrowRight
                          size={16}
                          className="shrink-0 text-[#71717A] transition group-hover:translate-x-1 group-hover:text-[#72951A] dark:text-[#94A3B8] dark:group-hover:text-[#C4F45A]"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleSignOut}
                className="relative z-10 mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-500/20 dark:text-red-400"
              >
                <LogOut size={17} />
                Sign Out
              </button>
            </aside>

            {/* Right — Edit Form */}
            <EditProfileForm key={user.id} user={user} />
          </div>
        )}
      </section>
    </main>
  );
}
