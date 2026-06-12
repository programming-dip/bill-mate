# BillMate

BillMate is a bill management web application that lets users view and pay utility bills using an account balance. Built with React, Vite, Firebase Authentication, and Tailwind CSS / DaisyUI.

## Live Demo

[https://bill-mate-anudip.web.app](https://bill-mate-anudip.web.app)

## Features

### Core layout

- **Navbar** — site navigation with conditional auth UI
- **Carousel** — provider slider on the home page (Swiper.js)
- **Footer** — shared footer across main layout pages
- **Protected routes** — all pages except Home, Login, and Register require authentication

### Navbar

- Shows **Login** and **Register** buttons when the user is not signed in
- Shows the **user profile picture** when signed in
- Clicking the profile avatar opens a dropdown with:
  - Display name and email
  - Current **balance**
  - **Sign out**

### Authentication

- **Email & password login**
  - On success: redirect to the intended route or Home
  - On failure: show an error toast (SweetAlert2)
  - Link to the Register page
- **Google social login**
  - Authenticate with Google
  - On success: redirect to the intended route or Home
- **Registration**
  - On success: redirect to the intended route or Home
  - On failure: show an error toast
- **Forgot password** — password reset via Firebase email
- **Protected route redirect** — visiting a protected page while logged out sends the user to Login; after a successful login they return to that page

### My Profile (`/profile`)

- Displays profile picture, display name, and email
- **Update Information** — form with:
  - Name input
  - Photo URL input
  - Submit button to save changes via Firebase `updateProfile`

### Bills page (`/bills`)

- Lists bills such as Electricity, Gas, Internet, Water, Credit Card, Tuition / School / College fees, and more
- **Bill type filter** — dropdown to filter bills by category
- **Paid indicator** — green checkmark on bills that have already been paid

### Bill Details page (`/bill-details/:id`)

- Two-column layout:
  - **Left:** large organization logo with bill-type icon
  - **Right:** organization name, bill type, amount, due date, and **Pay Bill** button
- Payment uses the balance shown in the navbar dropdown
- After a successful payment, the user is redirected to the Bills page
- **Duplicate payment prevention** — the same bill cannot be paid twice
- **Insufficient balance** — blocked with an error message

### Home page

- Hero section with animated typewriter and Lottie illustration
- Learning cards section (Firebase Authentication topics)
- Connected Providers carousel (Swiper.js with coverflow effect)

### Auth pages

- Login and Register pages use an animated background inspired by [Animate UI backgrounds](https://animate-ui.com/docs/components/backgrounds/bubble)

---

## Tech Stack


| Category | Technologies                                                 |
| -------- | ------------------------------------------------------------ |
| Frontend | React 19, Vite 8, React Router 7                             |
| Styling  | Tailwind CSS 4, DaisyUI, Framer Motion                       |
| Auth     | Firebase Authentication (Email/Password, Google)             |
| UI / UX  | Swiper.js, SweetAlert2, Lucide React, React Icons            |
| Data     | Local JSON files + `localStorage` for balance and paid bills |


---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Authentication enabled (Email/Password + Google)

### Installation

```bash
git clone https://github.com/<your-username>/bill-mate.git
cd bill-mate
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Routes


| Route                   | Access    | Description               |
| ----------------------- | --------- | ------------------------- |
| `/`                     | Public    | Home page                 |
| `/auth/login`           | Public    | Login                     |
| `/auth/register`        | Public    | Register                  |
| `/auth/forgot-register` | Public    | Forgot password           |
| `/bills`                | Protected | View and filter bills     |
| `/bill-details/:id`     | Protected | View bill details and pay |
| `/profile`              | Protected | View and update profile   |


---

## How payment works

- Each authenticated user starts with a **$1000** balance (stored in `localStorage` per Firebase UID)
- Paying a bill deducts the amount from the balance
- Paid bill IDs are stored in `localStorage` so they cannot be paid again
- Paid bills show a green checkmark on the Bills page

---

## Project Structure

```
bill-mate/
├── public/
│   ├── bills.json              # Bill data (organizations, amounts, due dates)
│   ├── icons.svg
│   ├── learningData.json       # Home page learning cards data
│   └── services.json           # Carousel provider data
│
├── src/
│   ├── Auth/
│   │   └── AuthProvider.jsx    # Firebase auth logic (sign in, sign up, Google, logout)
│   │
│   ├── components/
│   │   ├── animate-ui/
│   │   │   └── components/backgrounds/
│   │   │       └── gravity-stars.jsx
│   │   ├── ui/
│   │   │   └── beams.jsx       # Animated auth page background
│   │   ├── BillCards.jsx       # Individual bill card with paid status
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx            # Home hero section
│   │   ├── Learning.jsx        # Firebase learning section
│   │   ├── LearningCard.jsx
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx          # Top navigation with auth UI
│   │   ├── ProfileDropdown.jsx # Avatar dropdown (balance, sign out)
│   │   ├── ServiceCard.jsx
│   │   └── SupportedServices.jsx  # Swiper carousel
│   │
│   ├── contexts/
│   │   ├── AuthContext.jsx     # Auth context definition
│   │   └── PaymentContext.jsx  # Payment context definition
│   │
│   ├── firebase/
│   │   └── firebase.config.js  # Firebase app initialization
│   │
│   ├── layouts/
│   │   ├── AuthLayout.jsx      # Layout for login/register pages
│   │   └── HomeLayOut.jsx      # Main layout (navbar + footer + outlet)
│   │
│   ├── lib/
│   │   └── utils.js            # Utility helpers (cn, etc.)
│   │
│   ├── pages/
│   │   ├── BillDetails.jsx     # Single bill view and payment
│   │   ├── Bills.jsx           # Bills list with type filter
│   │   ├── ForgotPassword.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx         # Profile view and update form
│   │   └── Register.jsx
│   │
│   ├── payment/
│   │   └── PaymentProvider.jsx # Balance and pay-bill logic
│   │
│   ├── provider/
│   │   └── PrivateRoute.jsx    # Route guard for authenticated pages
│   │
│   ├── routes/
│   │   └── router.jsx          # React Router configuration
│   │
│   ├── utils/
│   │   ├── Navlinks.jsx        # Navbar link items
│   │   ├── NavlinksStyle.css
│   │   └── TypeIcon.jsx        # Bill type icon mapper
│   │
│   ├── index.css               # Global styles
│   └── main.jsx                # App entry point
│
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package.json
├── vite.config.js
└── README.md
```

---

## Requirements

This project was built to meet the following assignment specifications:

1. **Bill management** — users can view and pay utility bills (electricity, gas, water, internet, etc.) using account balance
2. **Navbar, Carousel, Footer** — carousel uses Swiper.js (not DaisyUI Carousel)
3. **Route protection** — Home, Login, and Register are public; all other routes require sign-in
4. **Conditional navbar** — Login/Register when logged out; profile avatar when logged in
5. **Profile dropdown** — shows balance and Log Out
6. **Auth flows** — email login/register with error toasts, Google login, redirect to intended route after login
7. **My Profile** — display picture, name, email; update name and photo URL
8. **Bills page** — list bills with bill-type filter dropdown
9. **Bill Details** — two-column layout with org logo, bill type icon, details, and Pay Bill button
10. **Payment rules** — redirect to Bills after payment, green tick on paid bills, no duplicate payments, redirect unauthenticated users to Login then back to protected route

---

## Scripts


| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |


---

## Author

*Anudip Bhoumik*

[https://anudip.dev/](https://anudip.dev/)

## License

This project is open source and available under the [MIT License](LICENSE).