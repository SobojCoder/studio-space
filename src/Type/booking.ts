

export interface IBooking {
  _id: string
  title: string
  image: string
  studioId: string
  userName: string
  userEmail: string
  bookingDate: string
  startingTime: string
  duration: number
  guests: number
  personalInfo: PersonalInfo
  notes: string
  pricing: Pricing
}

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
}

export interface Pricing {
  hourlyRate: number
  rentalTotal: number
  serviceFee: number
  securityDeposit: number
  grandTotal: number
}
