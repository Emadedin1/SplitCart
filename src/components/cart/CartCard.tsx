import Link from "next/link";
import type { Cart } from "@/types/cart";
import { calculateCartSplit } from "@/lib/calculateSplit";
import { formatCurrency, formatDate } from "@/lib/format";

export function CartCard({ cart }: { cart: Cart }) {
  const summary = calculateCartSplit(cart);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 transition hover:-translate-y-0.5 hover:border-blue-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{cart.store_name || "General cart"}</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">{cart.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{formatDate(cart.cart_date)}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{formatCurrency(summary.grandTotal)}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1">{cart.participants.length} participant{cart.participants.length === 1 ? "" : "s"}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">{cart.items.length} item{cart.items.length === 1 ? "" : "s"}</span>
      </div>
      <p className="mt-4 text-sm text-slate-500">Created {formatDate(cart.created_at)}</p>
      <Link href={`/carts/${cart.id}`} className="mt-5 inline-flex rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">Open cart</Link>
    </article>
  );
}
