import { calculateCartSplit } from "@/lib/calculateSplit";
import { formatCurrency } from "@/lib/format";
import type { Cart } from "@/types/cart";

export function PaymentSummary({ cart }: { cart: Cart }) {
  const summary = calculateCartSplit(cart);
  const hasUnassignedItems = cart.items.some((item) => item.assignedParticipantIds.length === 0);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">Subtotal: <strong className="text-slate-900">{formatCurrency(summary.subtotal)}</strong></div>
      {hasUnassignedItems ? <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">Some items are unassigned and are not included in the split yet.</div> : null}
      {summary.splits.map((entry) => (
        <article key={entry.participant.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{entry.participant.name}</h3>
              <p className="mt-1 text-sm text-slate-500">Item subtotal: {formatCurrency(entry.itemSubtotal)}</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">{formatCurrency(entry.total)}</span>
          </div>
          <p className="mt-3 text-xs text-slate-500">Shared costs: {formatCurrency(entry.sharedCostShare)} • Discount share: {formatCurrency(entry.discountShare)}</p>
        </article>
      ))}
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 shadow-sm">Total due: <strong className="text-emerald-950">{formatCurrency(summary.grandTotal)}</strong></div>
    </div>
  );
}
