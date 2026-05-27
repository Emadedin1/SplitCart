"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CartCard } from "@/components/cart/CartCard";
import { getDemoCarts, seedDemoData } from "@/lib/cartStorage";
import type { Cart } from "@/types/cart";

export default function CartsPage() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    seedDemoData();
    setCarts(getDemoCarts());
  }, []);

  const visibleCarts = useMemo(() => {
    const matches = carts.filter((cart) => `${cart.title} ${cart.store_name}`.toLowerCase().includes(query.toLowerCase()));
    return [...matches].sort((a, b) => {
      if (sortBy === "total") return (b.tax_amount + b.shipping_amount + b.service_fee_amount - b.discount_amount) - (a.tax_amount + a.shipping_amount + a.service_fee_amount - a.discount_amount);
      if (sortBy === "date") return new Date(a.cart_date).getTime() - new Date(b.cart_date).getTime();
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [carts, query, sortBy]);

  return (
    <AppShell>
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Carts</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Your saved carts</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">Search, sort, and reopen your shared orders in one place.</p>
          </div>
          <Link href="/carts/new"><Button>New cart</Button></Link>
        </div>

        <Card title="Find a cart" subtitle="Filter by name or store to quickly jump back into a split.">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100" placeholder="Search by title or store" value={query} onChange={(e) => setQuery(e.target.value)} />
            <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="date">Cart date</option>
              <option value="total">Total amount</option>
            </select>
          </div>
        </Card>

        {visibleCarts.length === 0 ? (
          <Card title="No carts yet">Create your first cart and it will appear here with your saved totals and participants.</Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">{visibleCarts.map((cart) => <CartCard key={cart.id} cart={cart} />)}</div>
        )}
      </section>
    </AppShell>
  );
}
