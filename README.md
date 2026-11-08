# StudioSpace | Creative Space Booking Platform

**Discover. Book. Create.**

StudioSpace is a modern creative space marketplace that connects creators with professional workspaces. Whether you're a photographer, filmmaker, podcaster, musician, or artist, StudioSpace makes it easy to discover and book the perfect creative environment for your next project.

From photography studios and cinema sound stages to podcast rooms and recording suites, StudioSpace brings creative spaces together on one platform.

---
## Live Link
- Studio Space Web: https://studio-space-self.vercel.app/
- Client-site Repo: https://github.com/SobojCoder/studio-space
- Server-site Repo: https://github.com/SobojCoder/studio-space-server

---

## Overview

StudioSpace is designed to simplify the process of finding and booking creative workspaces. Users can explore available studios, compare facilities, check pricing, and make reservations through an intuitive interface.

Studio owners can also showcase their spaces, manage listings, and handle booking requests from one convenient platform.

## Key Features

### Authentication & User Management
- Secure user registration and login.
- Google authentication.
- Protected routes and authenticated API access.
- Personalized user dashboard.

### Studio Discovery
- Browse all available creative spaces.
- Explore studios by category.
- View detailed studio information, images, and amenities.
- Discover workspace pricing and location details.

### Studio Listing Management
- Create and publish studio listings.
- Update existing studio information.
- Delete personal listings.
- Manage studio details and facilities.

### Booking Management
- Book creative spaces with selected dates and time slots.
- Specify starting time, ending time, and guest count.
- Automatically calculate booking costs.
- Prevent overlapping reservations with existing confirmed bookings.
- View personal booking history.
- Cancel eligible pending bookings.


### Modern User Experience
- Responsive design for mobile, tablet, and desktop.
- Modern dark-themed interface.
- Interactive components and intuitive navigation.
- Studio image galleries and detailed workspace information.

---

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React.js, TypeScript |
| Styling | Tailwind CSS, Shadcn UI |
| Icons | Lucide React |
| Authentication | Better Auth, Google OAuth |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Security | JWT, JOSE |
| Deployment | Vercel, Backend Hosting Provider |


---

## Booking Workflow

1. Discover a creative studio.
2. View studio details and available facilities.
3. Select a booking date and time.
4. Enter guest information.
5. Review the booking price.
6. Submit the reservation.
7. Track booking status from My Bookings.

The backend validates booking requests and checks for time conflicts with existing confirmed reservations before accepting a new reservation.

---

## Design System

StudioSpace follows a modern dark visual theme with vibrant lime accents.

| Element | Color |
|---|---|
| Main Background | `#111518` |
| Card Background | `#181A20` |
| Primary Accent | `#C4F45A` |
| Secondary Accent | `#A8E83E` |
| Heading | `#FFFFFF` |
| Description | `#94A3B8` |

---

## Deployment

The frontend can be deployed using Vercel, while the backend can be hosted on a Node.js-compatible hosting platform.

Before deployment:

- Configure production environment variables.
- Update the frontend API URL.
- Configure Google OAuth redirect URLs.
- Add production domains to Better Auth trusted origins.
- Configure MongoDB Atlas network access.
- Verify authentication and booking functionality in production.

---

## Future Improvements

- Real-time booking availability calendar.
- Online payment integration.
- Advanced studio search and filtering.
- Email booking notifications.
- Studio owner analytics dashboard.
- User wishlist and favorite studios.

---

## Author

**Soboj Paul**

- GitHub: [GitHub Profile](https://github.com/SobojCoder)
- LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/soboj-paul/)

---

<div align="center">

**StudioSpace — Find Your Space. Create Your Story.**

Built with passion for the creative community.

</div>
