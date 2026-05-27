# SplitCart

SplitCart is a polished student project for splitting shared shopping carts, assigning items to participants, and calculating a clear payment summary for roommates, friends, and student groups.

## Features
- Create and save shared carts
- Add participants and assign items to one or many people
- Split tax, shipping, fees, and discounts proportionally
- View a clear payment summary and copy it to a group chat
- Ready for a Vercel deployment and a Supabase-backed version

## Tech Stack
- Next.js
- TypeScript
- React
- Tailwind CSS
- Supabase Postgres schema files included

## Screenshots
- Placeholder for a hero screenshot
- Placeholder for a cart detail screenshot

## Database setup
1. Create a Supabase project.
2. Run the SQL in `supabase/schema.sql` in the SQL editor.
3. Optionally load `supabase/seed.sql` for sample data.

## Environment variables
Create a `.env.local` file using `.env.example`:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

## How to run locally
1. npm install
2. npm run dev
3. Visit http://localhost:3000

## How to deploy to Vercel
1. Push the project to GitHub.
2. Import the repo in Vercel.
3. Add the Supabase environment variables in the project settings.
4. Deploy.

## Known limitations
- Does not connect directly to retailer carts
- Does not process payments
- Does not include live collaboration yet

## Future improvements
- Shared cart invite links
- Real-time collaboration
- Receipt upload and parsing
- Payment app links
- Chrome extension companion
- Multi-currency support
- PDF / CSV export

## Resume bullet points
1. Built a full-stack expense-splitting web app using Next.js, TypeScript, Supabase, and PostgreSQL that lets users create shared carts, assign items to participants, and calculate proportional tax, shipping, fees, and discounts.
2. Implemented authenticated user-specific cart management with protected routes, row-level security, CRUD workflows, reusable UI components, and copyable payment summaries.
