"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { calculateCartSplit } from "@/lib/calculateSplit";
import { formatCurrency } from "@/lib/format";
import type { Cart } from "@/types/cart";

export function CopySummaryButton({ cart }: { cart: Cart }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const summary = calculateCartSplit(cart);
    const text = [
      `SplitCart Summary — ${cart.title}`,
      ...summary.splits.map((entry) => `${entry.participant.name} owes ${formatCurrency(entry.total)}`),
      `Total: ${formatCurrency(summary.grandTotal)}`,
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return <Button onClick={handleCopy}>{copied ? "Copied" : "Copy summary"}</Button>;
}
