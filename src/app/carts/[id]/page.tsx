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
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingAssignments, setEditingAssignments] = useState<string[]>([]);

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

  function startEditingAssignments(itemId: string) {
    const item = cart?.items.find((entry) => entry.id === itemId);
    if (!item) return;
    setEditingItemId(itemId);
    setEditingAssignments(item.assignedParticipantIds);
  }

  function toggleAssignment(participantId: string) {
    setEditingAssignments((current) =>
      current.includes(participantId)
        ? current.filter((id) => id !== participantId)
        : [...current, participantId],
    );
  }

  function saveAssignments(itemId: string) {
    if (!cart || editingAssignments.length === 0) return;
    const nextCart = {
      ...cart,
      items: cart.items.map((item) =>
        item.id === itemId
          ? { ...item, assignedParticipantIds: editingAssignments }
          : item,
      ),
      updated_at: new Date().toISOString(),
    };
    persist(nextCart);
    setEditingItemId(null);
    setEditingAssignments([]);
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
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Cart detail</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{cart.title}</h1>
              <p className="mt-2 text-sm text-slate-500">{cart.store_name || "General cart"} • {formatDate(cart.cart_date)} • {cart.notes || "No notes yet."}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost" onClick={handleDeleteCart}>Delete cart</Button>
              <CopySummaryButton cart={cart} />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">{cart.participants.length} participant{cart.participants.length === 1 ? "" : "s"}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">{cart.items.length} item{cart.items.length === 1 ? "" : "s"}</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Total {formatCurrency(summary?.grandTotal ?? 0)}</span>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Card title="Participants" subtitle="Add everyone who is sharing the cart.">
              <label className="text-sm font-medium text-slate-700">Participant name</label>
              <div className="mt-2 flex flex-wrap gap-3">
                <Input className="max-w-xl" placeholder="e.g. Sam" value={participantName} onChange={(e) => setParticipantName(e.target.value)} />
                <Button onClick={addParticipant}>Add participant</Button>
              </div>
              <div className="mt-4"><ParticipantList cart={cart} onDelete={removeParticipant} /></div>
            </Card>

            <Card title="Add an item" subtitle="Add the item, its price, quantity, and who should cover it.">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-700 md:col-span-2">
                  <span className="mb-1 block font-medium">Item name</span>
                  <Input placeholder="e.g. Pasta sauce" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                </label>
                <label className="text-sm text-slate-700">
                  <span className="mb-1 block font-medium">Price</span>
                  <Input type="number" min="0" step="0.01" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                </label>
                <label className="text-sm text-slate-700">
                  <span className="mb-1 block font-medium">Quantity</span>
                  <Input type="number" min="1" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
                </label>
              </div>

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Who is paying for this item?</p>
                <p className="mt-1 text-sm text-slate-600">Select one or more people for this item. Shared items are split evenly.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cart.participants.length === 0 ? (
                    <span className="text-sm text-slate-500">Add at least one participant before assigning items.</span>
                  ) : cart.participants.map((participant) => {
                    const checked = selectedParticipants.includes(participant.id);
                    return (
                      <button key={participant.id} type="button" onClick={() => setSelectedParticipants((prev) => checked ? prev.filter((id) => id !== participant.id) : [...prev, participant.id])} className={`rounded-full border px-3 py-2 text-sm font-medium ${checked ? "border-blue-200 bg-blue-600 text-white shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"}`}>
                        {participant.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-sm text-slate-500">Pick the people who should cover this item.</p>
                <Button onClick={addItem}>Add item</Button>
              </div>

              <div className="mt-5 space-y-3">
                {cart.items.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No items yet. Add your first grocery item or household purchase here.</div>
                ) : cart.items.map((item) => {
                  const isEditing = editingItemId === item.id;
                  return (
                    <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-100">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                          <p className="mt-1 text-sm text-slate-500">{item.quantity} × {formatCurrency(item.price)} = <strong className="text-slate-900">{formatCurrency(item.price * item.quantity)}</strong></p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" onClick={() => startEditingAssignments(item.id)}>Edit assignment</Button>
                          <Button variant="danger" onClick={() => removeItem(item.id)}>Delete</Button>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                          <p className="text-sm font-semibold text-slate-900">Assigned to</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {cart.participants.map((participant) => {
                              const checked = editingAssignments.includes(participant.id);
                              return (
                                <button key={participant.id} type="button" onClick={() => toggleAssignment(participant.id)} className={`rounded-full border px-3 py-2 text-sm font-medium ${checked ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-100"}`}>
                                  {participant.name}
                                </button>
                              );
                            })}
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button onClick={() => saveAssignments(item.id)} disabled={editingAssignments.length === 0}>Save assignment</Button>
                            <Button variant="ghost" onClick={() => { setEditingItemId(null); setEditingAssignments([]); }}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.assignedParticipantIds.length === 0 ? <span className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700">No participants assigned</span> : item.assignedParticipantIds.map((id) => (
                            <span key={id} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{cart.participants.find((participant) => participant.id === id)?.name || id}</span>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </Card>

            <Card title="Shared costs" subtitle="Tax, shipping, fees, and discounts are split proportionally based on each participant’s subtotal.">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["tax_amount", "Tax amount"],
                  ["shipping_amount", "Shipping amount"],
                  ["service_fee_amount", "Service fee"],
                  ["discount_amount", "Discount"],
                ].map(([key, label]) => (
                  <label key={key} className="text-sm text-slate-700">
                    <span className="mb-1 block font-medium">{label}</span>
                    <Input type="number" min="0" step="0.01" value={(costs as never)[key]} onChange={(e) => setCosts((prev) => ({ ...prev, [key]: Number(e.target.value) || 0 }))} />
                  </label>
                ))}
              </div>
              <div className="mt-5"><Button onClick={updateSharedCosts}>Save shared costs</Button></div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6" title="Payment summary" subtitle="A clear breakdown of what each person owes.">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">Total cart amount: <strong className="text-slate-900">{formatCurrency(summary?.grandTotal ?? 0)}</strong></div>
              <div className="mt-4"><PaymentSummary cart={cart} /></div>
            </Card>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
