import Categories from "@/components/HomePage/categories"
import Featured from "@/components/HomePage/featured"
import { HeroBanner } from "@/components/HomePage/hero-banner"
import { HowBookingWorks } from "@/components/HomePage/how-booking-works"

export default function Home() {
  return (
    <main className="flex-1">
      <HeroBanner />
      <Featured />
      <Categories />
      <HowBookingWorks />
    </main>
  )
}
