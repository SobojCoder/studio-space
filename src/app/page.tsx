import { HeroBanner } from "@/components/hero-banner"
import { HowBookingWorks } from "@/components/how-booking-works"

export default function Home() {
  return (
    <main className="flex-1">
      <HeroBanner />
      <HowBookingWorks />
    </main>
  )
}
