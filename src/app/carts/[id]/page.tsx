"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CopySummaryButton } from "@/components/cart/CopySummaryButton";
import { PaymentSummary } from "@/components/cart/PaymentSummary";
import { ParticipantList } from "@/components/cart/ParticipantList";
import { calculateCartSplit } from "@/lib/calculateSplit";
import { deleteDemoCart, getDemoCarts, saveDemoCart } from "@/lib/cartStorage";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Cart, CartItem } from "@/types/cart";

export default function CartDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [participantName, setParticipantName] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("0");
  const [itemQuantity, setItemQuantity] = useState("1");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [costs, setCosts] = useState({ tax_amount: 0, shipping_amount: 0, service_fee_amount: 0, discount_amount: 0 });

  useEffect(() => {
    const found = getDemoCarts().find((entry) => entry.id === params.id);
    if (found) {
      setCart(found);
      setCosts({
        tax_amount: found.tax_amount || 0,
        shipping_amount: found.shipping_amount || 0,
        service_fee_amount: found.service_fee_amount || 0,
        discount_amount: found.discount_amount || 0,
      });
    }
  }, [params.id]);

  const summary = useMemo(() => (cart ? calculateCartSplit(cart) : null), [cart]);

  function persist(nextCart: Cart) {
    saveDemoCart(nextCart);
    setCart(nextCart);
  }

  function addParticipant() {
    if (!cart || !participantName.trim()) return;
    const nextCart: Cart = {
      ...cart,
      participants: [...cart.participants, { id: crypto.randomUUID(), name: participantName.trim() }],
      updated_at: new Date().toISOString(),
    };
    persist(nextCart);
    setParticipantName("");
  }

  function addItem() {
    if (!cart || !itemName.trim() || !selectedParticipants.length) return;
    const nextCart: Cart = {
      ...cart,
      items: [
        ...cart.items,
        {
          id: crypto.randomUUID(),
          name: itemName.trim(),
          price: Number(itemPrice) || 0,
          quantity: Number(itemQuantity) || 1,
          assignedParticipantIds: selectedParticipants,
        },
      ],
      updated_at: new Date().toISOString(),
    };
    persist(nextCart);
    setItemName("");
    setItemPrice("0");
    setItemQuantity("1");
    setSelectedParticipants([]);
  }

  function updateSharedCosts() {
    if (!cart) return;
    const nextCart = {
      ...cart,
      tax_amount: costs.tax_amount,
      shipping_amount: costs.shipping_amount,
      service_fee_amount: costs.service_fee_amount,
      discount_amount: costs.discount_amount,
      updated_at: new Date().toISOString(),
    };
    persist(nextCart);
  }

  function removeItem(itemId: string) {
    if (!cart) return;
    persist({ ...cart, items: cart.items.filter((item) => item.id !== itemId), updated_at: new Date().toISOString() });
  }

  function removeParticipant(participantId: string) {
    if (!cart) return;
    const hasAssignments = cart.items.some((item) => item.assignedParticipantIds.includes(participantId));
    if (hasAssignments) {
      alert("Remove item assignments first before deleting a participant.");
      return;
    }
    persist({ ...cart, participants: cart.participants.filter((participant) => participant.id !== participantId), updated_at: new Date().toISOString() });
  }

  function handleDeleteCart() {
    if (!cart) return;
    deleteDemoCart(cart.id);
    router.push("/carts");
  }

  if (!cart) return <AppShell><p>Loading cart…</p></AppShell>;

  return (
    <AppShell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Cart detail</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">{cart.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{cart.store_name || "General cart"} • {formatDate(cart.cart_date)} • {cart.notes || "No notes yet."}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleDeleteCart}>Delete</Button>
          <CopySummaryButton cart={cart} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card title="Participants" subtitle="Add people who are sharing the cart.">
            <div className="flex gap-3">
              <Input placeholder="Participant name" value={participantName} onChange={(e) => setParticipantName(e.target.value)} />
              <Button onClick={addParticipant}>Add</Button>
            </div>
            <div className="mt-4"><ParticipantList cart={cart} onDelete={removeParticipant} /></div>
          </Card>

          <Card title="Items" subtitle="Add items and assign them to one or more participants.">
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Item name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
              <Input type="number" min="0" step="0.01" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
              <Input type="number" min="1" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
              <Button onClick={addItem}>Add item</Button>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Assign to participants:</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {cart.participants.map((participant) => {
                const checked = selectedParticipants.includes(participant.id);
                return (
                  <button key={participant.id} type="button" onClick={() => setSelectedParticipants((prev) => checked ? prev.filter((id) => id !== participant.id) : [...prev, participant.id])} className={`rounded-full border px-3 py-2 text-sm ${checked ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700"}`}>
                    {participant.name}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 space-y-3">
              {cart.items.map((item) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-500">{item.quantity} × {formatCurrency(item.price)} = {formatCurrency(item.price * item.quantity)}</p>
                    </div>
                    <Button variant="ghost" onClick={() => removeItem(item.id)}>Delete</Button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Assigned to: {item.assignedParticipantIds.map((id) => cart.participants.find((participant) => participant.id === id)?.name || id).join(", ") || "None"}</p>
                </article>
              ))}
            </div>
          </Card>

          <Card title="Shared costs" subtitle="Tax, shipping, fees, and discounts update the payment summary.">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["tax_amount", "Tax amount"],
                ["shipping_amount", "Shipping amount"],
                ["service_fee_amount", "Service fee"],
                ["discount_amount", "Discount"],
              ].map(([key, label]) => (
                <label key={key} className="text-sm text-slate-600">
                  <span>{label}</span>
                  <Input type="number" min="0" step="0.01" className="mt-2" value={(costs as never)[key]} onChange={(e) => setCosts((prev) => ({ ...prev, [key]: Number(e.target.value) || 0 }))} />
                </label>
              ))}
            </div>
            <div className="mt-4"><Button onClick={updateSharedCosts}>Save shared costs</Button></div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Cart summary" subtitle="Current total and payment breakdown.">
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">Total cart amount: {formatCurrency(summary?.grandTotal ?? 0)}</div>
            <div className="mt-4"><PaymentSummary cart={cart} /></div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
