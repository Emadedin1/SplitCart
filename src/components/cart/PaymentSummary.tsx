import { calculateCartSplit } from "@/lib/calculateSplit";
import { formatCurrency } from "@/lib/format";
import type { Cart } from "@/types/cart";

export function PaymentSummary({ cart }: { cart: Cart }) {
  const summary = calculateCartSplit(cart);

  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">Subtotal: {formatCurrency(summary.subtotal)}</div>
      {summary.splits.map((entry) => (
        <article key={entry.participant.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{entry.participant.name}</h3>
              <p className="text-sm text-slate-500">Item subtotal: {formatCurrency(entry.itemSubtotal)}</p>
            </div>
            <strong className="text-slate-900">{formatCurrency(entry.total)}</strong>
          </div>
          <p className="mt-2 text-xs text-slate-500">Shared costs: {formatCurrency(entry.sharedCostShare)} • Discount share: {formatCurrency(entry.discountShare)}</p>
        </article>
      ))}
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">Total due: {formatCurrency(summary.grandTotal)}</div>
    </div>
  );
}
