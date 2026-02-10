# Ecommerce de Fotografías - API

Servidor de ecommerce para la venta de fotografías, desarrollado con Node.js y Express.

ecommerce-fotografias/
├── src/
│   ├── app.js                 # Archivo principal del servidor
│   ├── managers/
│   │   ├── ProductManager.js  # Gestor de productos
│   │   └── CartManager.js     # Gestor de carritos
│   └── routes/
│       ├── products.js        # Rutas de productos
│       └── carts.js           # Rutas de carritos
├── data/
│   ├── products.json          # Base de datos de productos
│   └── carts.json             # Base de datos de carritos
├── package.json
└── README.md
```

## API Endpoints

### Productos

- `GET /api/products/` - Listar todos los productos
- `GET /api/products/:pid` - Obtener un producto por ID
- `POST /api/products/` - Crear nuevo producto
- `PUT /api/products/:pid` - Actualizar producto
- `DELETE /api/products/:pid` - Eliminar producto

### Carritos

- `POST /api/carts/` - Crear nuevo carrito
- `GET /api/carts/:cid` - Obtener productos del carrito
- `POST /api/carts/:cid/product/:pid` - Agregar producto al carrito

## Formato de Producto

```json
{
  "id": 1,
  "title": "Paisaje Montañoso",
  "description": "Hermosa fotografía de montañas al atardecer",
  "code": "MONT-001",
  "price": 99.99,
  "status": true,
  "stock": 50,
  "category": "Paisajes",
  "thumbnails": ["https://example.com/image1.jpg"]
}
```

## Formato de Carrito

```json
{
  "id": 1,
  "products": [
    {
      "product": 1,
      "quantity": 2
    }
  ]
}

## Autor

Ortiz Estefanis 
