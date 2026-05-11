// Vendly API — GET /api/productos
// Devuelve el catálogo de productos con stock en tiempo real.
// CORS habilitado para que cualquier dominio pueda consumirlo.

const PRODUCTS = [
  { id: 1,  code: 'PRD-001', name: 'Laptop Pro 15"',        category: 'Electrónica', price: 1200000, stock: 12, unit: 'Unid.', type: 'simple',    img: '' },
  { id: 2,  code: 'PRD-002', name: 'Mouse Inalámbrico',      category: 'Electrónica', price: 28000,   stock: 45, unit: 'Unid.', type: 'simple',    img: '' },
  { id: 3,  code: 'PRD-003', name: 'Teclado Mecánico RGB',   category: 'Electrónica', price: 55000,   stock: 28, unit: 'Unid.', type: 'simple',    img: '' },
  { id: 4,  code: 'PRD-004', name: 'Monitor 24" Full HD',    category: 'Electrónica', price: 290000,  stock: 8,  unit: 'Unid.', type: 'simple',    img: '' },
  { id: 5,  code: 'PRD-005', name: 'Remera Básica Blanca',   category: 'Ropa',        price: 9500,    stock: 80, unit: 'Unid.', type: 'simple',    img: '' },
  { id: 6,  code: 'PRD-006', name: 'Pantalón Jean Slim',     category: 'Ropa',        price: 24000,   stock: 35, unit: 'Unid.', type: 'simple',    img: '' },
  { id: 7,  code: 'PRD-007', name: 'Mochila Urbana 25L',     category: 'Accesorios',  price: 35000,   stock: 22, unit: 'Unid.', type: 'compuesto', img: '' },
  { id: 8,  code: 'PRD-008', name: 'Servicio Técnico PC',    category: 'Servicios',   price: 15000,   stock: 999,unit: 'Serv.', type: 'servicio',  img: '' },
  { id: 9,  code: 'PRD-009', name: 'Cable HDMI 2m',          category: 'Electrónica', price: 5500,    stock: 60, unit: 'Unid.', type: 'simple',    img: '' },
  { id: 10, code: 'PRD-010', name: 'Auriculares Bluetooth',  category: 'Electrónica', price: 42000,   stock: 18, unit: 'Unid.', type: 'simple',    img: '' },
  { id: 11, code: 'PRD-011', name: 'Zapatillas Running',     category: 'Calzado',     price: 75000,   stock: 14, unit: 'Par',   type: 'simple',    img: '' },
  { id: 12, code: 'PRD-012', name: 'Camisa Oxford',          category: 'Ropa',        price: 19000,   stock: 42, unit: 'Unid.', type: 'simple',    img: '' },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { categoria, disponible } = req.query;

  let productos = PRODUCTS.map(p => ({
    ...p,
    disponible: p.stock > 0,
  }));

  if (categoria) {
    productos = productos.filter(p =>
      p.category.toLowerCase() === categoria.toLowerCase()
    );
  }

  if (disponible === 'true') {
    productos = productos.filter(p => p.disponible);
  }

  return res.status(200).json({
    ok: true,
    total: productos.length,
    productos,
  });
}
