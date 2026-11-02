import { IReview } from "./review"

export interface IStudio {
  _id: string
  title: string
  category: string
  hourlyRate: number
  securityDeposit: number
  maxCapacity: number
  location: string
  imageUrl: string
  images: string[]
  overview: string
  description: string
  amenities: string[]
  rating: number
  totalReviews: number
  reviews: IReview[]
  ownerName: string
  ownerEmail: string
}


