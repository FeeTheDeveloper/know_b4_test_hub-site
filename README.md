# Know B4 Certification Hub

Professional certification and compliance training platform for workplace drug testing, DOT compliance, and safety standards — built for **Know Before You Go**.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with custom brand theme
- **Auth:** Supabase Auth + SSR helpers
- **Database:** Supabase (PostgreSQL)
- **PDF:** jsPDF (server-side certificate generation)
- **Animation:** Framer Motion (splash screen, scroll reveals)
- **Icons:** Lucide React
- **Deployment:** Vercel-safe (no custom server)

## Brand Colors

| Token | Hex | Usage |
| --- | --- | --- |
| `brandBlue` | `#0B2A4A` | Primary navy backgrounds |
| `brandBlueDark` | `#071c32` | Darker variant |
| `brandGold` | `#D4AF37` | Gold accent / CTAs |
| `brandGoldLight` | `#E8C76A` | Light gold hover state |

## Project Structure

```text
src/
├── app/
│   ├── (auth)/              # Auth pages (login, signup, forgot-password)
│   ├── (dashboard)/         # Authenticated user pages
│   │   └── dashboard/
│   │       ├── courses/     # Course list + detail + quiz
│   │       ├── certificates/# Earned certificates + detail
│   │       └── profile/     # User profile
│   ├── (admin)/             # Admin dashboard pages
│   │   └── admin/
│   │       ├── courses/     # Manage courses + create new
│   │       ├── users/       # Manage users
│   │       └── certificates/# Manage certificates
│   ├── (public)/            # Public pages with shared layout
│   │   └── certifications/  # Public certifications catalog
│   ├── api/certificates/    # PDF download API route
│   ├── certificates/        # Redirect → /dashboard/certificates
│   ├── verify-certificate/  # Public certificate verification
│   ├── layout.tsx           # Root layout (splash screen wrapper)
│   └── page.tsx             # Homepage
├── components/
│   ├── auth/                # Auth form
│   ├── home/                # HowItWorks section
│   ├── layout/              # DashboardShell, Sidebar, Header
│   ├── ui/                  # Reusable: Button, CourseCard, StatCard, etc.
│   └── SplashScreen.tsx     # Animated brand splash
├── data/
│   └── certifications.ts    # Public catalog seed data
├── lib/
│   ├── actions/             # Server actions (auth, courses, enrollment, etc.)
│   ├── supabase/            # Supabase client / server / middleware
│   ├── auth.ts              # getCurrentProfile, requireAdmin helpers
│   ├── certificate-pdf.ts   # PDF certificate generator
│   ├── mock-data.ts         # Development seed data
│   ├── navigation.tsx       # Sidebar nav configuration
│   └── utils.ts             # formatDate, cn, capitalize, getInitials
├── middleware.ts             # Route protection
└── types/
    ├── database.ts          # All DB interfaces
    └── index.ts             # Barrel export
```

## Local Setup

### Prerequisites

- Node.js 20+
- npm 9+

### Install & Run

```bash
git clone <repo-url>
cd know_b4_test_hub-site
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Key Routes

| Route | Description |
| --- | --- |
| `/` | Public landing page with hero, trust bar, certifications, how-it-works, CTA |
| `/certifications` | Public certification catalog (10 categories) |
| `/verify-certificate` | Public certificate verification lookup |
| `/login` | Login |
| `/signup` | Sign up |
| `/forgot-password` | Password reset |
| `/dashboard` | User dashboard (stats, active courses, upcoming training) |
| `/dashboard/courses` | Browse & enrolled courses |
| `/dashboard/certificates` | Earned certificates with PDF download |
| `/dashboard/profile` | User profile settings |
| `/admin` | Admin overview (users, courses, enrollments, certificates) |
| `/admin/courses` | Manage & create courses |
| `/admin/users` | Manage users |
| `/admin/certificates` | Manage certificates |
| `/certificates` | Redirect → /dashboard/certificates |

### Reusable Components

| Component | Path | Purpose |
| --- | --- | --- |
| `Button` | `components/ui/button.tsx` | Primary / secondary / outline button |
| `SectionWrapper` | `components/ui/section-wrapper.tsx` | Section container (light/dark) |
| `StatCard` | `components/ui/stat-card.tsx` | Metric display card |
| `DashboardCard` | `components/ui/dashboard-card.tsx` | Dashboard stat card |
| `CourseCard` | `components/ui/course-card.tsx` | Course display card |
| `CertificateCard` | `components/ui/certificate-card.tsx` | Certificate display card |
| `AdminTable` | `components/ui/admin-table.tsx` | Generic admin data table |
| `PageHeading` | `components/ui/page-heading.tsx` | Page title + description |
| `DashboardShell` | `components/layout/dashboard-shell.tsx` | Shell (sidebar + header + content) |
| `Header` | `components/layout/header.tsx` | Top header bar |
| `Sidebar` | `components/layout/sidebar.tsx` | Navigation sidebar |
| `HowItWorks` | `components/home/HowItWorks.tsx` | 4-step process section |
| `SplashScreen` | `components/SplashScreen.tsx` | Animated brand splash |

## Deploying to Vercel

### Requirements

- A [Vercel](https://vercel.com) account
- A [Supabase](https://supabase.com) project (see _Connecting Supabase_ below)
- This repo pushed to GitHub (or GitLab / Bitbucket)

### Steps

1. **Import the repo** — go to [vercel.com/new](https://vercel.com/new), select your Git provider, and import this repository.
2. **Set environment variables** — in the Vercel project **Settings → Environment Variables**, add:

   | Variable | Value | Notes |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://<your-project>.supabase.co` | From Supabase dashboard → Settings → API |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ…` | From Supabase dashboard → Settings → API |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Your Vercel production URL (used for auth email redirect links) |

   > **Important:** `NEXT_PUBLIC_SITE_URL` must match your live domain exactly (including `https://`). Auth confirmation and password-reset emails will redirect to this URL.

3. **Deploy** — click Deploy. No custom build commands or server configuration are needed; the default Next.js preset works out of the box.
4. **Update Supabase redirect allow-list** — in Supabase dashboard → Authentication → URL Configuration, add your Vercel URL to the **Redirect URLs** list:

   ```text
   https://your-domain.vercel.app/auth/callback
   ```

5. **(Optional) Custom domain** — if you add a custom domain in Vercel, update `NEXT_PUBLIC_SITE_URL` and the Supabase redirect allow-list to match.

### Redeployment

Pushing to the `main` branch automatically triggers a new production deployment. Environment variables persist across deploys.

## Connecting Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy the project URL and anon key into `.env.local` (see `.env.example` for the template)
3. Run the schema in `supabase/schema.sql` against your database (Supabase dashboard → SQL Editor)
4. Enable the **Email** auth provider in Authentication → Providers
5. Add `http://localhost:3000/auth/callback` to Authentication → URL Configuration → Redirect URLs

## Implementation Roadmap

### Phase 1 — Foundation ✅

- [x] Project scaffold with App Router, TypeScript, Tailwind CSS v4
- [x] Brand design system (navy/gold/white)
- [x] Animated splash screen (Framer Motion)
- [x] Homepage (hero, trust bar, featured courses, how-it-works, CTA, footer)
- [x] Public certifications catalog page
- [x] Certificate verification page
- [x] Auth pages (login, signup, forgot-password)
- [x] Dashboard with stats, active courses, upcoming training
- [x] Admin dashboard with overview stats and quick actions
- [x] Supabase auth integration + middleware route protection
- [x] Role-based layouts (user / admin)
- [x] Reusable component library
- [x] PDF certificate generator with branded template

### Phase 2 — Course Engine

- [x] Course enrollment flow
- [ ] Lesson content viewer (video, document types)
- [x] Progress tracking per lesson/module
- [ ] Module completion gates

### Phase 3 — Assessment & Certification

- [x] Quiz engine (multiple choice)
- [x] Score calculation and pass/fail logic
- [x] Automatic certificate generation (PDF)
- [x] Certificate detail page with visual preview
- [ ] Public certificate verification (real Supabase lookup)

### Phase 4 — Admin Features

- [x] Course creation
- [ ] Course editing with rich text editor
- [x] User management
- [x] Certificate issuance/revocation
- [ ] Completion reports and CSV export

### Phase 5 — Polish

- [ ] Email notifications (enrollment, completion, expiration)
- [ ] Search and filtering across all tables
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization (ISR, image optimization)

## Mock Data

All mock/seed data lives in `src/lib/mock-data.ts`. This file is the single source of development data and is imported by pages while Supabase is not yet connected. When switching to real data, simply replace imports from `@/lib/mock-data` with Supabase query calls.

## License

Private — all rights reserved.
