create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  store_name text,
  cart_date date,
  tax_amount numeric default 0,
  shipping_amount numeric default 0,
  service_fee_amount numeric default 0,
  discount_amount numeric default 0,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references carts(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references carts(id) on delete cascade,
  name text not null,
  price numeric not null default 0,
  quantity integer not null default 1,
  created_at timestamptz default now()
);

create table if not exists item_assignments (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references cart_items(id) on delete cascade,
  participant_id uuid not null references participants(id) on delete cascade,
  share_ratio numeric not null default 1,
  created_at timestamptz default now()
);

alter table carts enable row level security;
alter table participants enable row level security;
alter table cart_items enable row level security;
alter table item_assignments enable row level security;

create policy if not exists carts_owner_select on carts for select using (auth.uid() = user_id);
create policy if not exists carts_owner_insert on carts for insert with check (auth.uid() = user_id);
create policy if not exists carts_owner_update on carts for update using (auth.uid() = user_id);
create policy if not exists carts_owner_delete on carts for delete using (auth.uid() = user_id);

create policy if not exists participants_owner_select on participants for select using (
  exists (select 1 from carts where carts.id = participants.cart_id and carts.user_id = auth.uid())
);
create policy if not exists participants_owner_insert on participants for insert with check (
  exists (select 1 from carts where carts.id = participants.cart_id and carts.user_id = auth.uid())
);
create policy if not exists participants_owner_update on participants for update using (
  exists (select 1 from carts where carts.id = participants.cart_id and carts.user_id = auth.uid())
);
create policy if not exists participants_owner_delete on participants for delete using (
  exists (select 1 from carts where carts.id = participants.cart_id and carts.user_id = auth.uid())
);

create policy if not exists cart_items_owner_select on cart_items for select using (
  exists (select 1 from carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
);
create policy if not exists cart_items_owner_insert on cart_items for insert with check (
  exists (select 1 from carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
);
create policy if not exists cart_items_owner_update on cart_items for update using (
  exists (select 1 from carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
);
create policy if not exists cart_items_owner_delete on cart_items for delete using (
  exists (select 1 from carts where carts.id = cart_items.cart_id and carts.user_id = auth.uid())
);

create policy if not exists item_assignments_owner_select on item_assignments for select using (
  exists (
    select 1
    from cart_items
    join carts on carts.id = cart_items.cart_id
    where cart_items.id = item_assignments.item_id and carts.user_id = auth.uid()
  )
);
create policy if not exists item_assignments_owner_insert on item_assignments for insert with check (
  exists (
    select 1
    from cart_items
    join carts on carts.id = cart_items.cart_id
    where cart_items.id = item_assignments.item_id and carts.user_id = auth.uid()
  )
);
create policy if not exists item_assignments_owner_update on item_assignments for update using (
  exists (
    select 1
    from cart_items
    join carts on carts.id = cart_items.cart_id
    where cart_items.id = item_assignments.item_id and carts.user_id = auth.uid()
  )
);
create policy if not exists item_assignments_owner_delete on item_assignments for delete using (
  exists (
    select 1
    from cart_items
    join carts on carts.id = cart_items.cart_id
    where cart_items.id = item_assignments.item_id and carts.user_id = auth.uid()
  )
);
