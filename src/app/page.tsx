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
      <section className="grid items-center gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">SplitCart</p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">Split shared carts without the spreadsheet.</h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">Assign items, divide tax and shipping proportionally, and generate a clean payment summary for your group.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard" className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">Get Started</Link>
            <Link href="/carts" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">View Demo</Link>
          </div>
        </div>
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">What it does</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Create a cart and add roommates or friends.</li>
            <li>• Assign items to one or many people.</li>
            <li>• Split shared costs and discounts fairly.</li>
            <li>• Copy a clean payment summary in one click.</li>
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
