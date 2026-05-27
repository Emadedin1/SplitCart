import type { Cart } from "@/types/cart";

const STORAGE_KEY = "splitcart-demo-carts";

function readCarts(): Cart[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Cart[]) : [];
  } catch (error) {
    console.error("Failed to read carts", error);
    return [];
  }
}

function writeCarts(carts: Cart[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(carts));
}

export function getDemoCarts() {
  return readCarts();
}

export function saveDemoCart(cart: Cart) {
  const carts = readCarts();
  const next = carts.some((item) => item.id === cart.id)
    ? carts.map((item) => (item.id === cart.id ? cart : item))
    : [cart, ...carts];
  writeCarts(next);
  return next;
}

export function deleteDemoCart(cartId: string) {
  const next = readCarts().filter((cart) => cart.id !== cartId);
  writeCarts(next);
  return next;
}

export function seedDemoData() {
  if (typeof window === "undefined") return;
  if (readCarts().length > 0) return;

  const sampleCart: Cart = {
    id: "demo-cart-1",
    title: "Shared Grocery Run",
    store_name: "Walmart",
    cart_date: "2026-05-27",
    tax_amount: 4.25,
    shipping_amount: 0,
    service_fee_amount: 0,
    discount_amount: 3.0,
    notes: "Weekend groceries for the apartment.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    participants: [
      { id: "p1", name: "John" },
      { id: "p2", name: "Sarah" },
    ],
    items: [
      {
        id: "i1",
        name: "Milk",
        price: 4.5,
        quantity: 2,
        assignedParticipantIds: ["p1"],
      },
      {
        id: "i2",
        name: "Pasta",
        price: 6,
        quantity: 2,
        assignedParticipantIds: ["p1", "p2"],
      },
    ],
  };

  writeCarts([sampleCart]);
}
