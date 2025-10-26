# Grant Automation Platform - Frontend

Customer-facing Next.js application for the 4-stage grant automation workflow.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Clerk
- **Payments**: Stripe (to be configured)
- **Deployment**: Vercel

## Project Structure

```
frontend/
├── app/
│   ├── (marketing)/      # Public pages (landing, pricing, etc.)
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Protected dashboard routes
│   └── api/             # API routes
├── components/
│   └── ui/              # shadcn/ui components
├── lib/
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (or pnpm)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and add your keys:
   - Clerk keys from https://dashboard.clerk.com
   - Stripe keys from https://dashboard.stripe.com (for payment features)
   - Backend API URL (default: http://localhost:8000/api/v1)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding shadcn/ui Components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
```

## Routes

### Public Routes
- `/` - Landing page
- `/pricing` - Pricing page
- `/about` - About page
- `/contact` - Contact page

### Auth Routes
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

### Protected Routes (Dashboard)
- `/dashboard` - Dashboard home
- `/profile` - Stage 1: Company Profile
- `/discover` - Stage 2: Grant Discovery
- `/analyze/[id]` - Stage 3: Grant Analysis ($199)
- `/generate/[id]` - Stage 4: Application Generation ($999)
- `/applications` - All applications
- `/settings` - User settings

## Environment Variables

See `.env.local.example` for all required environment variables.

### Required
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL

### Optional (for production)
- Stripe keys (for payments)
- PostHog keys (for analytics)
- Sentry DSN (for error monitoring)

## Integration with Backend

The frontend communicates with the FastAPI backend running on `http://localhost:8000` (or the URL specified in `NEXT_PUBLIC_API_BASE_URL`).

### API Endpoints
- `POST /api/v1/stage1/profile` - Company profiling
- `POST /api/v1/stage2/discover` - Grant discovery
- `POST /api/v1/stage3/analyze` - Grant analysis
- `POST /api/v1/stage4/generate-application` - Application generation

## Phase 1 Status: Complete ✅

- [x] Next.js 14 project initialized with TypeScript
- [x] Tailwind CSS + shadcn/ui configured
- [x] Clerk authentication setup
- [x] Basic routing structure created
- [x] Environment variables template
- [x] Middleware configured

## Next Steps

- **Phase 2**: Landing page + Auth flows
- **Phase 3**: Stage 1 & 2 implementation
- **Phase 4**: Stripe payments integration
- **Phase 5**: Stage 3 & 4 implementation
- **Phase 6**: Polish & deploy

## Documentation

- [Frontend INITIAL.md](../PRPs/frontend_INITIAL.md) - Complete specifications
- [Frontend Handoff](../FRONTEND_HANDOFF.md) - Implementation guide
- [Backend API Docs](../docs/stages/stage4_api.md) - API documentation
