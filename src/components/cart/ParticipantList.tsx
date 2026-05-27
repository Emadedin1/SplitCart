import { Button } from "@/components/ui/Button";
import type { Cart } from "@/types/cart";

export function ParticipantList({ cart, onDelete }: { cart: Cart; onDelete: (id: string) => void }) {
  return (
    <div className="space-y-3">
      {cart.participants.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">Add your first participant to start building the split.</div>
      ) : (
        cart.participants.map((participant) => {
          const assignedCount = cart.items.filter((item) => item.assignedParticipantIds.includes(participant.id)).length;
          return (
            <article key={participant.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100">
              <div>
                <h3 className="text-base font-semibold text-slate-900">{participant.name}</h3>
                <p className="text-sm text-slate-500">{assignedCount} assigned item{assignedCount === 1 ? "" : "s"}</p>
              </div>
              <Button variant="ghost" onClick={() => onDelete(participant.id)}>Remove</Button>
            </article>
          );
        })
      )}
    </div>
  );
}
