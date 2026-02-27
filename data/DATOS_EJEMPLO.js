/**
 * Datos de ejemplo para cargar en MongoDB
 * 
 * Para usar estos datos:
 * 1. Inicia MongoDB
 * 2. Ejecuta: mongoimport --db ecommerce_fotografias --collection products --file data/productos_ejemplo.json
 * 
 * O copia los datos manualmente usando un cliente MongoDB.
 */

db.products.insertMany([
  {
    title: "Retrato Profesional en Studio",
    description: "Fotografía de retrato profesional con iluminación de estudio, reflectores y fondo personalizado. Perfecta para perfiles corporativos.",
    code: "RET-001",
    price: 150.00,
    stock: 15,
    category: "retratos",
    thumbnails: ["https://via.placeholder.com/400x300?text=Retrato+1"],
    status: true,
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-02-20")
  },
  {
    title: "Retrato Familia Extended",
    description: "Sesión de fotos familiar con duración de 2 horas. Incluye múltiples cambios de vestuario y fondos naturales.",
    code: "RET-002",
    price: 250.00,
    stock: 8,
    category: "retratos",
    thumbnails: ["https://via.placeholder.com/400x300?text=Retrato+Familia"],
    status: true,
    createdAt: new Date("2026-01-20"),
    updatedAt: new Date("2026-02-18")
  },
  {
    title: "Paisaje de Montaña Nevada",
    description: "Fotografía de paisaje de alta resolución capturada en las montañas de los Andes. Incluye edición profesional y retoque.",
    code: "PAI-001",
    price: 200.00,
    stock: 12,
    category: "paisajes",
    thumbnails: ["https://via.placeholder.com/400x300?text=Paisaje+Montaña"],
    status: true,
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-02-25")
  },
  {
    title: "Atardecer en la Playa",
    description: "Hermosa fotografía de atardecer captada en una playa tropical. Colores vibrantes y composición profesional.",
    code: "PAI-002",
    price: 180.00,
    stock: 20,
    category: "paisajes",
    thumbnails: ["https://via.placeholder.com/400x300?text=Atardecer+Playa"],
    status: true,
    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-02-27")
  },
  {
    title: "Bosque Encantado - Original",
    description: "Serie limitada de fotografías de bosques antiguos con niebla matinal. Edición artística con tonos sepia.",
    code: "PAI-003",
    price: 300.00,
    stock: 5,
    category: "paisajes",
    thumbnails: ["https://via.placeholder.com/400x300?text=Bosque+Encantado"],
    status: true,
    createdAt: new Date("2025-12-20"),
    updatedAt: new Date("2026-02-19")
  },
  {
    title: "Bodas - Sesión Completa",
    description: "Cobertura completa de boda incluyendo ceremonia, recepción y sesión de novios. Archivo digital de alta resolución.",
    code: "BOD-001",
    price: 1500.00,
    stock: 3,
    category: "bodas",
    thumbnails: ["https://via.placeholder.com/400x300?text=Boda+Completa"],
    status: true,
    createdAt: new Date("2026-01-05"),
    updatedAt: new Date("2026-02-20")
  },
  {
    title: "Bodas - Sesión de Novios",
    description: "Sesión romántica de pareja previa a la boda. Incluye múltiples locaciones y cambios de vestuario.",
    code: "BOD-002",
    price: 500.00,
    stock: 10,
    category: "bodas",
    thumbnails: ["https://via.placeholder.com/400x300?text=Novios"],
    status: true,
    createdAt: new Date("2025-12-28"),
    updatedAt: new Date("2026-02-22")
  },
  {
    title: "Producto con Bajo Stock",
    description: "Fotografía artística experimental con técnicas mixtas y edición digital avanzada.",
    code: "ART-001",
    price: 899.99,
    stock: 1,
    category: "arte",
    thumbnails: ["https://via.placeholder.com/400x300?text=Arte+Bajo+Stock"],
    status: true,
    createdAt: new Date("2026-02-26"),
    updatedAt: new Date("2026-02-27")
  },
  {
    title: "Producto Agotado - Descontinuado",
    description: "Esta fotografía ya no está disponible en stock. Próximamente habrá nueva edición.",
    code: "DIS-001",
    price: 450.00,
    stock: 0,
    category: "especial",
    thumbnails: ["https://via.placeholder.com/400x300?text=Descontinuado"],
    status: false,
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2026-01-15")
  },
  {
    title: "Fotografía Arquitectónica - Centro Moderno",
    description: "Captura de arquitectura moderna con perspectivas dinámicas. Incluye fotografía de día y noche.",
    code: "ARQ-001",
    price: 350.00,
    stock: 6,
    category: "arquitectura",
    thumbnails: ["https://via.placeholder.com/400x300?text=Arquitectura"],
    status: true,
    createdAt: new Date("2026-01-30"),
    updatedAt: new Date("2026-02-24")
  }
]);

/* 
RESULTADO ESPERADO:
{
  "acknowledged": true,
  "insertedIds": [
    ObjectId("..."),
    ObjectId("..."),
    ...
  ]
}

PRUEBAS RECOMENDADAS:

1. Ver todos los productos
   GET http://localhost:8080/api/products

2. Productos de retratos, primera página
   GET http://localhost:8080/api/products?limit=10&page=1&query=retratos&sort=asc

3. Productos de paisajes, ordenados por precio descendente
   GET http://localhost:8080/api/products?category=paisajes&sort=desc&limit=5

4. Ver vista del catálogo
   GET http://localhost:8080/products

5. Ver vista de un producto específico
   GET http://localhost:8080/products/{_id}
*/
