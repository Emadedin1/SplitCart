import { Button } from "@/components/ui/Button";
import type { Cart } from "@/types/cart";

export function ParticipantList({ cart, onDelete }: { cart: Cart; onDelete: (id: string) => void }) {
  return (
    <div className="space-y-3">
      {cart.participants.map((participant) => (
        <article key={participant.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h3 className="font-semibold text-slate-900">{participant.name}</h3>
            <p className="text-sm text-slate-500">Assigned to {cart.items.filter((item) => item.assignedParticipantIds.includes(participant.id)).length} item(s)</p>
          </div>
          <Button variant="ghost" onClick={() => onDelete(participant.id)}>Remove</Button>
        </article>
      ))}
    </div>
  );
}
