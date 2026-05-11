// POST /api/admin/delete-user — Elimina un cliente
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL         = 'https://mzxkpwidnivbhrevcukn.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ADMIN_EMAIL          = 'corporativogestion2025@gmail.com';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Método no permitido' });

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  const userClient = createClient(SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  const { data: { user }, error: authErr } = await userClient.auth.getUser(token);
  if (authErr || !user || user.email !== ADMIN_EMAIL) {
    return res.status(403).json({ ok: false, error: 'Acceso denegado' });
  }

  const { userId } = req.body;
  if (!userId) return res.status(400).json({ ok: false, error: 'userId requerido' });

  const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) return res.status(400).json({ ok: false, error: error.message });

  return res.status(200).json({ ok: true });
};
