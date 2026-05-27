export type Participant = {
  id: string;
  name: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  assignedParticipantIds: string[];
};

export type Cart = {
  id: string;
  title: string;
  store_name: string;
  cart_date: string;
  tax_amount: number;
  shipping_amount: number;
  service_fee_amount: number;
  discount_amount: number;
  notes: string;
  created_at: string;
  updated_at: string;
  participants: Participant[];
  items: CartItem[];
};
