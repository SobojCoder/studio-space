
import { Aperture } from "lucide-react";

const surface =
  "border border-[#E4E4E7] bg-white dark:border-white/10 dark:bg-[#181A20]";

const shimmer =
  "animate-pulse rounded-lg bg-[#E8EDDF] dark:bg-white/10";

export function BrandLoader() {
  return (
    <div
      role="status"
      aria-label="Loading StudioSpace"
      className="flex min-h-[65vh] flex-col items-center justify-center gap-5 bg-[#F5F7F0] dark:bg-[#111518]"
    >
      <div className="relative flex size-20 items-center justify-center rounded-3xl bg-[#A3E635] text-[#111518] shadow-lg shadow-[#72951A]/20 dark:bg-[#C4F45A]">
        <Aperture size={42} strokeWidth={1.8} />
        <span className="absolute -inset-2 animate-ping rounded-3xl border border-[#72951A]/30 dark:border-[#C4F45A]/30" />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold text-[#181A20] dark:text-white">
          StudioSpace
        </h2>
        <p className="mt-2 text-sm text-[#71717A] dark:text-[#94A3B8]">
          Preparing your creative space...
        </p>
      </div>

      <div className="h-1.5 w-40 overflow-hidden rounded-full bg-[#E4E4E7] dark:bg-white/10">
        <div className="h-full w-1/2 animate-[loading_1.4s_ease-in-out_infinite] rounded-full bg-[#72951A] dark:bg-[#C4F45A]" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function StudioCardSkeleton() {
  return (
    <div className={`${surface} overflow-hidden rounded-2xl`}>
      <div className={`${shimmer} h-52 w-full rounded-none`} />

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className={`${shimmer} h-6 w-24`} />
          <div className={`${shimmer} h-5 w-16`} />
        </div>

        <div className={`${shimmer} h-6 w-3/4`} />
        <div className={`${shimmer} h-4 w-1/2`} />

        <div className="flex items-center justify-between border-t border-[#E4E4E7] pt-4 dark:border-white/10">
          <div className={`${shimmer} h-6 w-24`} />
          <div className={`${shimmer} h-10 w-28 rounded-xl`} />
        </div>
      </div>
    </div>
  );
}

export function StudioGridSkeleton() {
  return (
    <main className="min-h-screen bg-[#F5F7F0] px-4 py-10 dark:bg-[#111518] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-3">
          <div className={`${shimmer} h-10 w-64`} />
          <div className={`${shimmer} h-4 w-80 max-w-full`} />
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className={`${shimmer} h-12 flex-1`} />
          <div className={`${shimmer} h-12 w-full sm:w-52`} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <StudioCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

export function StudioDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-[#F5F7F0] px-4 py-8 dark:bg-[#111518] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className={`${shimmer} mb-6 h-5 w-32`} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className={`${shimmer} h-72 md:h-[430px]`} />
          <div className="grid grid-cols-2 gap-4">
            <div className={`${shimmer} h-40 md:h-[207px]`} />
            <div className={`${shimmer} h-40 md:h-[207px]`} />
            <div className={`${shimmer} h-40 md:h-[207px]`} />
            <div className={`${shimmer} h-40 md:h-[207px]`} />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className={`${shimmer} h-9 w-2/3`} />
            <div className={`${shimmer} h-5 w-1/3`} />
            <div className={`${shimmer} h-28 w-full`} />
            <div className={`${shimmer} h-36 w-full`} />
          </div>
          <div className={`${surface} h-64 rounded-2xl p-6`}>
            <div className={`${shimmer} h-7 w-1/2`} />
            <div className={`${shimmer} mt-6 h-12 w-full`} />
            <div className={`${shimmer} mt-4 h-12 w-full`} />
            <div className={`${shimmer} mt-6 h-12 w-full`} />
          </div>
        </div>
      </div>
    </main>
  );
}

export function FormPageSkeleton() {
  return (
    <main className="min-h-screen bg-[#F5F7F0] px-4 py-10 dark:bg-[#111518] sm:px-6">
      <div className={`${surface} mx-auto max-w-4xl rounded-3xl p-5 sm:p-8 lg:p-10`}>
        <div className={`${shimmer} mx-auto h-9 w-64 max-w-full`} />
        <div className={`${shimmer} mx-auto mt-3 h-4 w-80 max-w-full`} />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className={`${shimmer} h-4 w-28`} />
              <div className={`${shimmer} h-12 w-full`} />
            </div>
          ))}

          <div className="space-y-3 sm:col-span-2">
            <div className={`${shimmer} h-4 w-32`} />
            <div className={`${shimmer} h-32 w-full`} />
          </div>

          <div className="sm:col-span-2">
            <div className={`${shimmer} h-12 w-full sm:w-48`} />
          </div>
        </div>
      </div>
    </main>
  );
}

export function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-[#F5F7F0] px-4 py-10 dark:bg-[#111518] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className={`${shimmer} h-9 w-64`} />
        <div className={`${shimmer} mt-3 h-4 w-80 max-w-full`} />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={`${surface} rounded-2xl p-6`}>
              <div className={`${shimmer} h-4 w-24`} />
              <div className={`${shimmer} mt-4 h-9 w-32`} />
            </div>
          ))}
        </div>

        <div className={`${surface} mt-8 rounded-2xl p-5 sm:p-7`}>
          <div className={`${shimmer} h-7 w-48`} />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-[#E4E4E7] pb-4 last:border-0 dark:border-white/10"
              >
                <div className={`${shimmer} size-16 shrink-0`} />
                <div className="flex-1 space-y-3">
                  <div className={`${shimmer} h-5 w-2/3`} />
                  <div className={`${shimmer} h-4 w-1/3`} />
                </div>
                <div className={`${shimmer} hidden h-9 w-24 sm:block`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function BookingSkeleton() {
  return (
    <main className="min-h-screen bg-[#F5F7F0] px-4 py-10 dark:bg-[#111518] sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_380px]">
        <div className={`${surface} rounded-3xl p-6 sm:p-8`}>
          <div className={`${shimmer} h-9 w-64`} />
          <div className={`${shimmer} mt-3 h-4 w-80 max-w-full`} />

          <div className="mt-8 space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className={`${shimmer} h-4 w-32`} />
                <div className={`${shimmer} h-12 w-full`} />
              </div>
            ))}
          </div>

          <div className={`${shimmer} mt-8 h-12 w-full`} />
        </div>

        <div className={`${surface} h-fit rounded-3xl p-6`}>
          <div className={`${shimmer} h-44 w-full`} />
          <div className={`${shimmer} mt-5 h-6 w-3/4`} />
          <div className={`${shimmer} mt-3 h-4 w-1/2`} />
          <div className="mt-8 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex justify-between gap-4">
                <div className={`${shimmer} h-4 w-24`} />
                <div className={`${shimmer} h-4 w-20`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function AuthPageSkeleton() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#F5F7F0] px-4 py-10 dark:bg-[#111518]">
      <div className={`${surface} w-full max-w-md rounded-3xl p-6 sm:p-10`}>
        <div className={`${shimmer} mx-auto size-16 rounded-2xl`} />
        <div className={`${shimmer} mx-auto mt-6 h-9 w-40`} />
        <div className={`${shimmer} mx-auto mt-3 h-4 w-56 max-w-full`} />

        <div className="mt-8 space-y-5">
          <div className={`${shimmer} h-12 w-full`} />
          <div className={`${shimmer} h-12 w-full`} />
          <div className={`${shimmer} h-12 w-full`} />
          <div className={`${shimmer} h-12 w-full`} />
        </div>

        <div className={`${shimmer} mt-7 h-12 w-full`} />
      </div>
    </main>
  );
}
