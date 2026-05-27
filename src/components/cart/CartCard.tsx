import Link from "next/link";
import type { Cart } from "@/types/cart";
import { calculateCartSplit } from "@/lib/calculateSplit";
import { formatCurrency, formatDate } from "@/lib/format";

export function CartCard({ cart }: { cart: Cart }) {
  const summary = calculateCartSplit(cart);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{cart.store_name || "General cart"}</p>
          <h3 className="text-xl font-semibold text-slate-900">{cart.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{formatDate(cart.cart_date)}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">{formatCurrency(summary.grandTotal)}</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
        <div className="rounded-2xl bg-slate-50 p-3">Participants: {cart.participants.length}</div>
        <div className="rounded-2xl bg-slate-50 p-3">Items: {cart.items.length}</div>
      </dl>
      <p className="mt-4 text-sm text-slate-500">Created {formatDate(cart.created_at)}</p>
      <Link href={`/carts/${cart.id}`} className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">Open cart</Link>
    </article>
  );
}
