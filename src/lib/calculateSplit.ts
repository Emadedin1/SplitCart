import type { Cart, CartItem, Participant } from "@/types/cart";

export type ParticipantSplit = {
  participant: Participant;
  itemSubtotal: number;
  sharedCostShare: number;
  discountShare: number;
  total: number;
};

function getItemShare(item: CartItem, participantId: string) {
  if (item.assignedParticipantIds.length === 0) return 0;
  if (item.assignedParticipantIds.includes(participantId)) {
    return item.price * item.quantity / item.assignedParticipantIds.length;
  }
  return 0;
}

export function calculateCartSplit(cart: Cart) {
  const itemSubtotalByParticipant = new Map<string, number>();
  const itemTotals = cart.items.map((item) => item.price * item.quantity);
  const subtotal = itemTotals.reduce((sum, current) => sum + current, 0);

  cart.participants.forEach((participant) => {
    const subtotalForParticipant = cart.items.reduce(
      (sum, item) => sum + getItemShare(item, participant.id),
      0,
    );
    itemSubtotalByParticipant.set(participant.id, subtotalForParticipant);
  });

  const participantSubtotalTotal = Array.from(itemSubtotalByParticipant.values()).reduce(
    (sum, value) => sum + value,
    0,
  );

  const sharedCostTotal =
    (cart.tax_amount || 0) +
    (cart.shipping_amount || 0) +
    (cart.service_fee_amount || 0) -
    (cart.discount_amount || 0);

  const splits: ParticipantSplit[] = cart.participants.map((participant) => {
    const itemSubtotal = itemSubtotalByParticipant.get(participant.id) || 0;
    const shareRatio = participantSubtotalTotal > 0 ? itemSubtotal / participantSubtotalTotal : 0;
    const sharedCostShare = sharedCostTotal * shareRatio;
    const discountShare = (cart.discount_amount || 0) * shareRatio;
    const total = itemSubtotal + sharedCostShare - discountShare;

    return {
      participant,
      itemSubtotal,
      sharedCostShare,
      discountShare,
      total,
    };
  });

  return {
    subtotal,
    sharedCostTotal,
    participantSubtotalTotal,
    splits,
    grandTotal: subtotal + sharedCostTotal,
  };
}
