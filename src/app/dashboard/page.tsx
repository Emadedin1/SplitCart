"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getDemoCarts, seedDemoData } from "@/lib/cartStorage";
import { calculateCartSplit } from "@/lib/calculateSplit";
import { formatCurrency } from "@/lib/format";
import type { Cart } from "@/types/cart";

export default function DashboardPage() {
  const [carts, setCarts] = useState<Cart[]>([]);

  useEffect(() => {
    seedDemoData();
    setCarts(getDemoCarts());
  }, []);

  const metrics = useMemo(() => {
    const totals = carts.map((cart) => calculateCartSplit(cart).grandTotal);
    const totalAmount = totals.reduce((sum, value) => sum + value, 0);
    const totalItems = carts.reduce((sum, cart) => sum + cart.items.length, 0);
    const averageCart = carts.length > 0 ? totalAmount / carts.length : 0;
    const largest = carts.reduce((best, cart) => (calculateCartSplit(cart).grandTotal > calculateCartSplit(best).grandTotal ? cart : best), carts[0]);
    const recent = [...carts].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4);
    const activeParticipants = carts.reduce((sum, cart) => sum + cart.participants.length, 0);

    return { totalAmount, totalItems, averageCart, largest, recent, activeParticipants };
  }, [carts]);

  return (
    <AppShell>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">Track your shared carts at a glance.</h1>
        </div>
        <Link href="/carts/new"><Button>New cart</Button></Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Saved carts" subtitle="Current carts in your workspace"><p className="text-3xl font-semibold text-slate-950">{carts.length}</p></Card>
        <Card title="Total split" subtitle="Estimated amount across all saved carts"><p className="text-3xl font-semibold text-slate-950">{formatCurrency(metrics.totalAmount)}</p></Card>
        <Card title="Average cart" subtitle="Typical split amount"><p className="text-3xl font-semibold text-slate-950">{formatCurrency(metrics.averageCart)}</p></Card>
        <Card title="Total items" subtitle="Items currently tracked"><p className="text-3xl font-semibold text-slate-950">{metrics.totalItems}</p></Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card title="Recent carts" subtitle="Quick access to your latest cart work.">
          <div className="space-y-3">
            {metrics.recent.map((cart) => (
              <article key={cart.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{cart.title}</h3>
                    <p className="text-sm text-slate-500">{cart.store_name || "General cart"}</p>
                  </div>
                  <Link href={`/carts/${cart.id}`} className="text-sm font-semibold text-slate-700 hover:text-slate-900">Open</Link>
                </div>
              </article>
            ))}
          </div>
        </Card>
        <Card title="Active participants" subtitle="People currently listed across your carts.">
          <p className="text-3xl font-semibold text-slate-950">{metrics.activeParticipants}</p>
        </Card>
        <Card title="Largest cart" subtitle="Highest total amount currently saved.">
          {metrics.largest ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-xl font-semibold text-slate-900">{metrics.largest.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{metrics.largest.store_name}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{formatCurrency(calculateCartSplit(metrics.largest).grandTotal)}</p>
            </div>
          ) : <p className="text-sm text-slate-500">Create your first cart to see the biggest one here.</p>}
        </Card>
      </div>
    </AppShell>
  );
}
