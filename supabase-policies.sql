-- ============================================================
-- VENDLY — Políticas RLS de Supabase
-- Ejecutar en el SQL Editor del proyecto Supabase
-- Proyecto: mzxkpwidnivbhrevcukn
-- ============================================================

-- Habilitar RLS en todas las tablas (ya habilitado)
ALTER TABLE productos    ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE proveedores  ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventas       ENABLE ROW LEVEL SECURITY;
ALTER TABLE compras      ENABLE ROW LEVEL SECURITY;
ALTER TABLE gastos       ENABLE ROW LEVEL SECURITY;
ALTER TABLE suscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos        ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- TENANT ISOLATION — Cada usuario solo ve sus propios datos
-- Aplica a todas las tablas operativas del ERP
-- ============================================================

CREATE POLICY "tenant_isolation" ON productos
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "tenant_isolation" ON clientes
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "tenant_isolation" ON proveedores
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "tenant_isolation" ON ventas
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "tenant_isolation" ON compras
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "tenant_isolation" ON gastos
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================
-- SUSCRIPCIONES
-- Los usuarios pueden ver su propia suscripción
-- El admin puede gestionar todas
-- Anónimos pueden leer (para validar códigos de referido)
-- ============================================================

CREATE POLICY "user_read_own" ON suscripciones
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "user_insert_own" ON suscripciones
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "admin_bypass" ON suscripciones
  FOR ALL TO authenticated
  USING (auth.email() = 'corporativogestion2025@gmail.com')
  WITH CHECK (auth.email() = 'corporativogestion2025@gmail.com');

CREATE POLICY "anon_read_subs" ON suscripciones
  FOR SELECT TO anon, authenticated
  USING (true);

-- ============================================================
-- PAGOS — Solo el admin puede crear/ver registros de pago
-- ============================================================

CREATE POLICY "admin_bypass" ON pagos
  FOR ALL TO authenticated
  USING (auth.email() = 'corporativogestion2025@gmail.com')
  WITH CHECK (auth.email() = 'corporativogestion2025@gmail.com');

-- ============================================================
-- NOTAS
-- - user_id se rellena automáticamente con DEFAULT auth.uid()
--   en todas las tablas, no hace falta enviarlo en los INSERTs
-- - El admin usa corporativogestion2025@gmail.com
-- - Los clientes se crean con admin.html (panel admin) o
--   se auto-registran en login.html
-- ============================================================
