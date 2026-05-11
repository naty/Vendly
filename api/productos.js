// Vendly API — GET /api/productos
// Devuelve productos desde Supabase con CORS habilitado.

const { createClient } = require('@supabase/supabase-js');

const supabaseClient = createClient(
  'https://mzxkpwidnivbhrevcukn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eGtwd2lkbml2YmhyZXZjdWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjE5MTEsImV4cCI6MjA5NDA5NzkxMX0._XtPTWIYkVQk_M07IhI2I2Kmgs6hXY1YJOZOiTLWYco'
);

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' });

  let query = supabaseClient.from('productos').select('*').order('name');

  const { categoria, disponible } = req.query;
  if (categoria) query = query.eq('category', categoria);
  if (disponible === 'true') query = query.gt('qty', 0);

  const { data, error } = await query;
  if (error) return res.status(500).json({ ok: false, error: error.message });

  const productos = data.map(p => ({ ...p, disponible: p.qty > 0 }));
  return res.status(200).json({ ok: true, total: productos.length, productos });
};
