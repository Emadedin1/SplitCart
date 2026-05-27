# SplitCart

SplitCart is a polished student project for splitting shared shopping carts, assigning items to participants, and calculating a clear payment summary for roommates, friends, and student groups.

DEMO VIDEO HERE -> https://youtu.be/Oor7Ig7dTW0

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
<img width="1719" height="854" alt="Screenshot 2026-05-27 at 5 45 51 PM" src="https://github.com/user-attachments/assets/a4b4dbbd-b3a7-4138-a8fd-90b08631a167" />

## Database setup
1. Create a Supabase project.
2. Run the SQL in `supabase/schema.sql` in the SQL editor.
3. Optionally load `supabase/seed.sql` for sample data.

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
