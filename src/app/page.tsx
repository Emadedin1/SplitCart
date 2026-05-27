import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";

const features = [
  { title: "Assign items", text: "Mark who owes for each product, even when an item is shared." },
  { title: "Split tax and shipping", text: "Apply proportional sharing for fees, discounts, and service charges." },
  { title: "Save and revisit", text: "Keep past carts handy for group orders and roommate budgets." },
  { title: "Copy summaries", text: "Send a clean payment summary straight to your group chat." },
];

export default function HomePage() {
  return (
    <AppShell>
      <section className="grid items-center gap-10 py-8 lg:grid-cols-[1fr_0.9fr] lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">SplitCart</p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">Split shared carts without the spreadsheet.</h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">Assign items, split tax and shipping proportionally, and copy a clean payment summary for your group.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">Get Started</Link>
          </div>
        </div>
        <aside className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm shadow-blue-100">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Why teams like it</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Add roommates, friends, or classmates in seconds.</li>
            <li>• Share tax, shipping, fees, and discounts fairly.</li>
            <li>• Save and reopen past carts whenever you need them.</li>
          </ul>
        </aside>
      </section>
      <section className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature.text}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
