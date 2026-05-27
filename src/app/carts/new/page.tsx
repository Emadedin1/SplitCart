"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { saveDemoCart } from "@/lib/cartStorage";
import type { Cart } from "@/types/cart";

export default function NewCartPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", store_name: "", cart_date: "", notes: "" });

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    if (!form.title.trim()) {
      alert("Please add a cart title.");
      return;
    }

    const cart: Cart = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      store_name: form.store_name.trim(),
      cart_date: form.cart_date || "",
      tax_amount: 0,
      shipping_amount: 0,
      service_fee_amount: 0,
      discount_amount: 0,
      notes: form.notes.trim(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      participants: [],
      items: [],
    };

    saveDemoCart(cart);
    router.push(`/carts/${cart.id}`);
  }

  return (
    <AppShell>
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">New Cart</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">Start a fresh shared order.</h1>
      </div>
      <Card title="Cart details" subtitle="Create the base cart first, then add participants and items on the details page.">
        <div className="grid gap-4">
          <Input placeholder="Cart title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
          <Input placeholder="Store name" value={form.store_name} onChange={(e) => handleChange("store_name", e.target.value)} />
          <Input type="date" value={form.cart_date} onChange={(e) => handleChange("cart_date", e.target.value)} />
          <Textarea rows={4} placeholder="Notes" value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} />
          <Button onClick={handleSubmit}>Create cart</Button>
        </div>
      </Card>
    </AppShell>
  );
}
