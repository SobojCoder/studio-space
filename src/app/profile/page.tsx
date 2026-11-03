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
  "w-full rounded-xl border border-white/10 bg-[#171A20] px-4 py-4 text-[#F5F5F5] outline-none transition placeholder:text-[#9299A5] focus:border-[#C6F36B] focus:ring-2 focus:ring-[#C6F36B]/15";

const labelClass =
  "mb-2 flex items-center gap-2 text-sm font-semibold text-[#F5F5F5]";

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
    <div className="rounded-2xl border border-white/10 bg-[#171A20] p-6 md:p-10">
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Pencil size={20} className="text-[#C6F36B]" />
          Edit Profile
        </h2>

        <p className="mt-2 text-sm text-[#9299A5]">
          Update your display name and avatar. Your email stays the same so
          your bookings and listings keep working.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Display Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
            <User size={16} className="text-[#C6F36B]" />
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
            <Camera size={16} className="text-[#C6F36B]" />
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

          <p className="mt-2 text-xs text-[#9299A5]">
            Paste a link to your photo. Leave it empty to fall back to your
            initial.
          </p>
        </div>

        {/* Live preview */}
        <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#0B0D10] p-4">
          <Avatar className="size-14 border-2 border-[#C6F36B]">
            <AvatarImage
              src={previewImage}
              alt={name.trim() || user.name || "User"}
              referrerPolicy="no-referrer"
            />

            <AvatarFallback className="bg-[#C6F36B] text-lg font-bold text-black">
              {previewInitial}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-[#9299A5]">
              Preview
            </p>

            <p className="truncate font-semibold">
              {name.trim() || user.name || "Your name"}
            </p>
          </div>
        </div>

        {/* Email (read-only) */}
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B0D10] px-4 py-3">
          <Mail size={18} className="shrink-0 text-[#C6F36B]" />

          <div className="min-w-0">
            <p className="text-xs text-[#9299A5]">Email (read-only)</p>
            <p className="truncate font-medium">{user.email}</p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#C6F36B] py-4 font-bold text-[#0B0D10] transition hover:bg-[#d5ff85] hover:shadow-lg hover:shadow-[#C6F36B]/10 disabled:cursor-not-allowed disabled:opacity-60"
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

        <p className="text-center text-sm text-[#9299A5]">
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
    <main className="min-h-screen bg-[#0B0D10] text-[#F5F5F5]">
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C6F36B]/30 bg-[#C6F36B]/10 px-4 py-2 text-sm text-[#C6F36B]">
            <UserRound size={16} />
            My Account
          </div>

          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            My <span className="text-[#C6F36B]">Profile</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-[#9299A5]">
            Manage how you appear across Studio Space and jump back into your
            listings.
          </p>
        </div>

        {isPending ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-[#11151A]">
            <Loader2 size={32} className="animate-spin text-[#C6F36B]" />
          </div>
        ) : !user ? (
          /* Signed-out prompt */
          <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-[#11151A] p-10 text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#C6F36B]/10 text-[#C6F36B]">
              <UserRound size={30} />
            </span>

            <h2 className="mt-6 text-2xl font-bold">
              You&apos;re not signed in
            </h2>

            <p className="mt-3 text-sm text-[#9299A5]">
              Sign in to view and edit your Studio Space profile.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/sign-in"
                className="rounded-xl bg-[#C6F36B] px-6 py-3 font-bold text-[#0B0D10] transition hover:bg-[#d5ff85]"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl border border-[#C6F36B]/40 px-6 py-3 font-semibold text-[#C6F36B] transition hover:bg-[#C6F36B]/10"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            {/* Left — Profile card */}
            <aside className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#11151A] p-8">
              <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#C6F36B]/10 blur-3xl" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <Avatar className="size-28 border-2 border-[#C6F36B]">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                    referrerPolicy="no-referrer"
                  />

                  <AvatarFallback className="bg-[#C6F36B] text-3xl font-bold text-black">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <h2 className="mt-5 text-2xl font-bold">{user.name}</h2>

                <p className="mt-1 flex min-w-0 items-center gap-2 text-sm text-[#9299A5]">
                  <Mail size={15} className="shrink-0 text-[#C6F36B]" />
                  <span className="truncate">{user.email}</span>
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#C6F36B]/10 px-3 py-1.5 text-xs font-semibold text-[#C6F36B]">
                  <span className="size-1.5 rounded-full bg-[#C6F36B]" />
                  Active Account
                </span>

                {memberSince && (
                  <p className="mt-4 text-xs uppercase tracking-widest text-[#9299A5]">
                    Member since {memberSince}
                  </p>
                )}
              </div>

              {/* Quick Links */}
              <div className="relative z-10 mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#9299A5]">
                  Quick Links
                </p>

                <div className="space-y-2">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center gap-3 rounded-xl border border-white/10 bg-[#171A20] px-4 py-3 transition hover:border-[#C6F36B]/40 hover:bg-[#C6F36B]/10"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C6F36B]/10 text-[#C6F36B] transition group-hover:bg-[#C6F36B] group-hover:text-black">
                          <Icon size={18} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold">
                            {link.label}
                          </span>

                          <span className="block truncate text-xs text-[#9299A5]">
                            {link.description}
                          </span>
                        </span>

                        <ArrowRight
                          size={16}
                          className="shrink-0 text-[#9299A5] transition group-hover:translate-x-1 group-hover:text-[#C6F36B]"
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
                className="relative z-10 mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                <LogOut size={17} />
                Sign Out
              </button>
            </aside>

            {/* Right — Edit form */}
            <EditProfileForm key={user.id} user={user} />
          </div>
        )}
      </section>
    </main>
  );
}
