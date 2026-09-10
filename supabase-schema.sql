-- Script SQL para crear las tablas en Supabase
-- Ejecutar este script en el SQL Editor de Supabase

-- Tabla de bebidas
create table drinks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  category text not null,
  category_label text not null,
  description text,
  price integer,
  image_url text,
  available boolean default true,
  sort_order integer default 0
);

-- Tabla de platos
create table dishes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  category text not null,
  description text,
  price integer,
  sort_order integer default 0,
  available boolean default true
);

-- Tabla de tours
create table tours (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  duration text not null,
  type text not null,
  description text,
  price integer,
  image_url text,
  whatsapp_message text,
  available boolean default true,
  sort_order integer default 0
);

-- Tabla de galería
create table gallery (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  image_url text not null,
  alt text,
  sort_order integer default 0
);

-- Tabla de configuración
create table settings (
  id integer primary key default 1,
  whatsapp_number text,
  instagram_url text,
  hero_title text,
  hero_subtitle text,
  hero_image_url text,
  hero_video_url text,
  experience_image_url text
);

-- Insertar configuración inicial
insert into settings (id, whatsapp_number, instagram_url, hero_title, hero_subtitle, hero_image_url, experience_image_url)
values (
  1,
  '573001234567',
  'https://www.instagram.com/vivepatrimoni0/',
  'Vive el río. Vive Patrimonio.',
  'Una experiencia frente al río Sinú, acompañada de bebidas, sabores, tours en lancha y atardeceres inolvidables.',
  '/img/hero.jpg',
  '/img/atardecer.jpg'
);

-- ============================================================
-- Migración: Negocio + Misión/Visión + Suéteres
-- ============================================================

-- Añadir info de negocio y misión/visión a settings
alter table settings add column if not exists about_title text default 'Quiénes somos';
alter table settings add column if not exists about_text text default 'En Vive Patrimonio celebramos el río Sinú. Somos un bar y restaurante frente al agua donde la cultura, la gastronomía y los atardeceres se viven con calma y alegría.';
alter table settings add column if not exists about_image_url text;
alter table settings add column if not exists mission_title text default 'Misión';
alter table settings add column if not exists mission_text text default 'Brindar una experiencia auténtica frente al río Sinú, con sabores típicos, atención cercana y recorridos que conectan a visitantes y locales con nuestro patrimonio natural y cultural.';
alter table settings add column if not exists vision_title text default 'Visión';
alter table settings add column if not exists vision_text text default 'Ser el punto de encuentro más querido del río Sinú, referente de turismo sostenible, tradición y hospitalidad en Montería.';
alter table settings add column if not exists offerings_title text default 'Todo lo que te espera';
alter table settings add column if not exists offerings_subtitle text default 'Bebidas, sabores, tours por el río y nuestros suéteres con identidad local.';

-- Actualizar fila existente con valores por defecto si están vacíos
update settings set
  about_title = coalesce(about_title, 'Quiénes somos'),
  about_text = coalesce(about_text, 'En Vive Patrimonio celebramos el río Sinú. Somos un bar y restaurante frente al agua donde la cultura, la gastronomía y los atardeceres se viven con calma y alegría.'),
  mission_title = coalesce(mission_title, 'Misión'),
  mission_text = coalesce(mission_text, 'Brindar una experiencia auténtica frente al río Sinú, con sabores típicos, atención cercana y recorridos que conectan a visitantes y locales con nuestro patrimonio natural y cultural.'),
  vision_title = coalesce(vision_title, 'Visión'),
  vision_text = coalesce(vision_text, 'Ser el punto de encuentro más querido del río Sinú, referente de turismo sostenible, tradición y hospitalidad en Montería.'),
  offerings_title = coalesce(offerings_title, 'Todo lo que te espera'),
  offerings_subtitle = coalesce(offerings_subtitle, 'Bebidas, sabores, tours por el río y nuestros suéteres con identidad local.')
where id = 1;

-- Tabla de suéteres
create table if not exists sweaters (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  type text not null,
  description text,
  price integer,
  image_url text,
  sizes text[] default '{}',
  colors text[] default '{}',
  available boolean default true,
  sort_order integer default 0
);

alter table sweaters enable row level security;

drop policy if exists "Allow public read access on sweaters" on sweaters;
create policy "Allow public read access on sweaters" on sweaters
  for select to anon using (true);

drop policy if exists "Allow authenticated write access on sweaters" on sweaters;
create policy "Allow authenticated write access on sweaters" on sweaters
  for all to authenticated using (true) with check (true);

-- Bucket para suéteres
insert into storage.buckets (id, name, public) values ('sweaters', 'sweaters', true) on conflict (id) do nothing;

drop policy if exists "Public read access on sweaters bucket" on storage.objects;
create policy "Public read access on sweaters bucket" on storage.objects
  for select to anon using (bucket_id = 'sweaters');

drop policy if exists "Authenticated upload on sweaters bucket" on storage.objects;
create policy "Authenticated upload on sweaters bucket" on storage.objects
  for insert to authenticated with check (bucket_id = 'sweaters');

drop policy if exists "Authenticated delete on sweaters bucket" on storage.objects;
create policy "Authenticated delete on sweaters bucket" on storage.objects
  for delete to authenticated using (bucket_id = 'sweaters');

drop policy if exists "Authenticated update on sweaters bucket" on storage.objects;
create policy "Authenticated update on sweaters bucket" on storage.objects
  for update to authenticated using (bucket_id = 'sweaters') with check (bucket_id = 'sweaters');

-- Añadir update/delete faltantes a buckets existentes
drop policy if exists "Authenticated update on drinks bucket" on storage.objects;
create policy "Authenticated update on drinks bucket" on storage.objects
  for update to authenticated using (bucket_id = 'drinks') with check (bucket_id = 'drinks');
drop policy if exists "Authenticated update on tours bucket" on storage.objects;
create policy "Authenticated update on tours bucket" on storage.objects
  for update to authenticated using (bucket_id = 'tours') with check (bucket_id = 'tours');
drop policy if exists "Authenticated update on gallery bucket" on storage.objects;
create policy "Authenticated update on gallery bucket" on storage.objects
  for update to authenticated using (bucket_id = 'gallery') with check (bucket_id = 'gallery');
drop policy if exists "Authenticated update on site bucket" on storage.objects;
create policy "Authenticated update on site bucket" on storage.objects
  for update to authenticated using (bucket_id = 'site') with check (bucket_id = 'site');

-- Habilitar RLS (Row Level Security)
alter table drinks enable row level security;
alter table dishes enable row level security;
alter table tours enable row level security;
alter table gallery enable row level security;
alter table settings enable row level security;

-- Políticas de lectura pública
create policy "Allow public read access on drinks" on drinks
  for select to anon using (true);

create policy "Allow public read access on dishes" on dishes
  for select to anon using (true);

create policy "Allow public read access on tours" on tours
  for select to anon using (true);

create policy "Allow public read access on gallery" on gallery
  for select to anon using (true);

create policy "Allow public read access on settings" on settings
  for select to anon using (true);

-- Políticas de escritura para usuarios autenticados
create policy "Allow authenticated write access on drinks" on drinks
  for all to authenticated using (true) with check (true);

create policy "Allow authenticated write access on dishes" on dishes
  for all to authenticated using (true) with check (true);

create policy "Allow authenticated write access on tours" on tours
  for all to authenticated using (true) with check (true);

create policy "Allow authenticated write access on gallery" on gallery
  for all to authenticated using (true) with check (true);

create policy "Allow authenticated write access on settings" on settings
  for all to authenticated using (true) with check (true);

-- ============================================================
-- Storage Buckets y Políticas
-- ============================================================

-- Crear buckets (si no existen)
insert into storage.buckets (id, name, public) values ('drinks', 'drinks', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('tours', 'tours', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('site', 'site', true) on conflict (id) do nothing;

-- Lectura pública para todos los buckets
create policy "Public read access on drinks bucket" on storage.objects
  for select to anon using (bucket_id = 'drinks');

create policy "Public read access on tours bucket" on storage.objects
  for select to anon using (bucket_id = 'tours');

create policy "Public read access on gallery bucket" on storage.objects
  for select to anon using (bucket_id = 'gallery');

create policy "Public read access on site bucket" on storage.objects
  for select to anon using (bucket_id = 'site');

-- Escritura autenticada para todos los buckets
create policy "Authenticated upload on drinks bucket" on storage.objects
  for insert to authenticated with check (bucket_id = 'drinks');

create policy "Authenticated upload on tours bucket" on storage.objects
  for insert to authenticated with check (bucket_id = 'tours');

create policy "Authenticated upload on gallery bucket" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery');

create policy "Authenticated upload on site bucket" on storage.objects
  for insert to authenticated with check (bucket_id = 'site');

-- Eliminación autenticada para todos los buckets
create policy "Authenticated delete on drinks bucket" on storage.objects
  for delete to authenticated using (bucket_id = 'drinks');

create policy "Authenticated delete on tours bucket" on storage.objects
  for delete to authenticated using (bucket_id = 'tours');

create policy "Authenticated delete on gallery bucket" on storage.objects
  for delete to authenticated using (bucket_id = 'gallery');

create policy "Authenticated delete on site bucket" on storage.objects
  for delete to authenticated using (bucket_id = 'site');
