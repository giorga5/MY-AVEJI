-- =============================================================================
-- MY AVEJI — Supabase setup script
-- Run this once, in full, in your Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste this whole file -> Run).
-- =============================================================================

-- ---------- Tables ----------

create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  icon_key    text not null default 'default',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  category_id   uuid not null references categories(id) on delete restrict,
  name          text not null,
  description   text,
  price         numeric(10,2) not null,
  is_featured   boolean not null default false,
  is_visible    boolean not null default true,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists products_category_id_idx on products(category_id);
create index if not exists products_visible_sort_idx on products(is_visible, sort_order);

create table if not exists product_images (
  id            uuid primary key default gen_random_uuid(),
  product_id    uuid not null references products(id) on delete cascade,
  storage_path  text not null,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);
create index if not exists product_images_product_id_idx on product_images(product_id);

create table if not exists site_settings (
  id               integer primary key default 1,
  store_name       text not null default 'MY AVEJI',
  tagline          text default 'ავეჯის მაღაზია თბილისში',
  hero_headline    text default 'ხარისხიანი ავეჯი, შექმნილი თქვენი სახლისთვის',
  hero_subtext     text default 'ჩვენ გთავაზობთ გამძლე და ესთეტიურ ავეჯს — დივნებიდან საწოლებამდე.',
  about_text       text,
  phone            text,
  phone_2          text,
  whatsapp_number  text,
  facebook_url     text,
  instagram_url    text,
  address          text default 'სავაჭრო ცენტრი საბა, 5 თორნიკე ერისთავის ქუჩა, თბილისი',
  business_hours   text default 'ორშ-შაბ: 10:00-20:00
კვირა: 12:00-18:00',
  map_embed_url    text default 'https://www.google.com/maps?q=%e1%83%a1%e1%83%90%e1%83%95%e1%83%90%e1%83%ad%e1%83%a0%e1%83%9d+%e1%83%aa%e1%83%94%e1%83%9c%e1%83%a2%e1%83%a0%e1%83%98+%e1%83%a1%e1%83%90%e1%83%91%e1%83%90%2c+5+%e1%83%97%e1%83%9d%e1%83%a0%e1%83%9c%e1%83%98%e1%83%99%e1%83%94+%e1%83%94%e1%83%a0%e1%83%98%e1%83%a1%e1%83%97%e1%83%90%e1%83%95%e1%83%98%e1%83%a1+%e1%83%a5%e1%83%a3%e1%83%a9%e1%83%90%2c+%e1%83%97%e1%83%91%e1%83%98%e1%83%9a%e1%83%98%e1%83%a1%e1%83%98&output=embed',
  updated_at       timestamptz not null default now(),
  constraint site_settings_single_row check (id = 1)
);
insert into site_settings (id) values (1) on conflict (id) do nothing;

-- Safe to re-run: adds phone_2 to a site_settings table created before this
-- column existed. No-op if the column is already there (e.g. fresh installs
-- that already got it from the create table statement above).
alter table site_settings add column if not exists phone_2 text;

-- ---------- updated_at triggers ----------

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_categories_updated_at on categories;
create trigger trg_categories_updated_at before update on categories
  for each row execute function set_updated_at();

drop trigger if exists trg_products_updated_at on products;
create trigger trg_products_updated_at before update on products
  for each row execute function set_updated_at();

drop trigger if exists trg_site_settings_updated_at on site_settings;
create trigger trg_site_settings_updated_at before update on site_settings
  for each row execute function set_updated_at();

-- ---------- Row Level Security ----------

alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table site_settings enable row level security;

drop policy if exists "categories_public_read" on categories;
create policy "categories_public_read" on categories for select using (true);
drop policy if exists "categories_admin_write" on categories;
create policy "categories_admin_write" on categories for all to authenticated using (true) with check (true);

drop policy if exists "products_public_read" on products;
create policy "products_public_read" on products for select using (is_visible = true);
drop policy if exists "products_admin_all" on products;
create policy "products_admin_all" on products for all to authenticated using (true) with check (true);

drop policy if exists "product_images_public_read" on product_images;
create policy "product_images_public_read" on product_images for select using (
  exists (select 1 from products p where p.id = product_images.product_id and p.is_visible = true)
);
drop policy if exists "product_images_admin_all" on product_images;
create policy "product_images_admin_all" on product_images for all to authenticated using (true) with check (true);

drop policy if exists "site_settings_public_read" on site_settings;
create policy "site_settings_public_read" on site_settings for select using (true);
drop policy if exists "site_settings_admin_update" on site_settings;
create policy "site_settings_admin_update" on site_settings for update to authenticated using (true) with check (true);

-- ---------- Storage policies ----------
-- Before running this section: Dashboard -> Storage -> New bucket
-- -> name it exactly "product-images" -> toggle "Public bucket" ON -> Create.

drop policy if exists "product_images_bucket_public_read" on storage.objects;
create policy "product_images_bucket_public_read" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "product_images_bucket_admin_insert" on storage.objects;
create policy "product_images_bucket_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');

drop policy if exists "product_images_bucket_admin_update" on storage.objects;
create policy "product_images_bucket_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'product-images');

drop policy if exists "product_images_bucket_admin_delete" on storage.objects;
create policy "product_images_bucket_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');

-- ---------- Seed data (safe to skip/edit -- purely so the site isn't empty) ----------

insert into categories (name, icon_key, sort_order)
select * from (values
  ('დივნები', 'sofa', 1),
  ('მაგიდები', 'table', 2),
  ('სკამები', 'chair', 3),
  ('საწოლები', 'bed', 4),
  ('კარადები', 'wardrobe', 5),
  ('განათება', 'lamp', 6)
) as v(name, icon_key, sort_order)
where not exists (select 1 from categories);

insert into products (category_id, name, description, price, is_featured, is_visible, sort_order)
select c.id, p.name, p.description, p.price, p.is_featured, true, p.sort_order
from (values
  ('დივნები', 'კუთხის დივანი „თბილისი"', 'გამძლე და მოხერხებული კუთხის დივანი, იდეალური საოჯახო სივრცისთვის.', 1690.00, false, 1),
  ('მაგიდები', 'ჟურნალის მაგიდა „ავლაბარი"', 'ხის ჟურნალის მაგიდა თანამედროვე დიზაინით.', 420.00, true, 2),
  ('სკამები', 'სასადილო სკამი „ვაკე"', 'მოხერხებული და ესთეტიური სასადილო სკამი.', 245.00, false, 3),
  ('საწოლები', 'ორადგილიანი საწოლი „საბურთალო"', 'მყარი კარკასი და მაღალი ხარისხის მასალები.', 1450.00, false, 4),
  ('კარადები', 'კარადა „რუსთაველი"', 'ტევადი კარადა ორი გამწყობი კარით.', 980.00, false, 5),
  ('განათება', 'სამაგიდო ნათურა „ფუნიკულიორი"', 'თბილი განათება სამუშაო თუ დასასვენებელი სივრცისთვის.', 165.00, false, 6)
) as p(category_name, name, description, price, is_featured, sort_order)
join categories c on c.name = p.category_name
where not exists (select 1 from products);
