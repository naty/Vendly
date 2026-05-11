-- VENDLY — Schema inicial
-- Ejecutar en Supabase SQL Editor

create table public.productos (
  id        bigserial primary key,
  code      text default '',
  name      text not null,
  category  text default 'Sin categoría',
  cost      numeric default 0,
  price     numeric default 0,
  qty       integer default 0,
  unit      text default 'Unid.',
  type      text default 'simple',
  img       text default '',
  created_at timestamptz default now()
);

create table public.clientes (
  id        bigserial primary key,
  code      text default '',
  name      text not null,
  phone     text default '',
  email     text default '',
  grp       text default 'Minorista',
  balance   numeric default 0,
  status    text default 'activo',
  created_at timestamptz default now()
);

create table public.proveedores (
  id        bigserial primary key,
  code      text default '',
  name      text not null,
  phone     text default '',
  email     text default '',
  cuit      text default '',
  balance   numeric default 0,
  status    text default 'activo',
  created_at timestamptz default now()
);

create table public.ventas (
  id          bigserial primary key,
  date        date default current_date,
  client_name text default '',
  total       numeric default 0,
  payment     text default 'Efectivo',
  status      text default 'pendiente',
  items       integer default 0,
  created_at  timestamptz default now()
);

create table public.compras (
  id            bigserial primary key,
  code          text default '',
  date          date default current_date,
  supplier_name text default '',
  total         numeric default 0,
  payment       text default 'Contado',
  status        text default 'pendiente',
  items         integer default 0,
  created_at    timestamptz default now()
);

create table public.gastos (
  id          bigserial primary key,
  code        text default '',
  date        date default current_date,
  category    text default '',
  description text default '',
  amount      numeric default 0,
  payment     text default 'Efectivo',
  created_at  timestamptz default now()
);

-- Habilitar RLS en todas las tablas
alter table public.productos   enable row level security;
alter table public.clientes    enable row level security;
alter table public.proveedores enable row level security;
alter table public.ventas      enable row level security;
alter table public.compras     enable row level security;
alter table public.gastos      enable row level security;

-- Acceso público por ahora (se restringe cuando agregamos auth)
create policy "public_all" on public.productos   for all using (true) with check (true);
create policy "public_all" on public.clientes    for all using (true) with check (true);
create policy "public_all" on public.proveedores for all using (true) with check (true);
create policy "public_all" on public.ventas      for all using (true) with check (true);
create policy "public_all" on public.compras     for all using (true) with check (true);
create policy "public_all" on public.gastos      for all using (true) with check (true);
