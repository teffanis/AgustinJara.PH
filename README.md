# Ecommerce de Fotografías - API

Servidor de ecommerce para la venta de fotografías, desarrollado con Node.js y Express.

## Requisitos

- Node.js v14 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecución

### Modo producción
```bash
npm start
```

### Modo desarrollo (con nodemon)
```bash
npm run dev
```

El servidor escuchará en `http://localhost:8080`

## Estructura del Proyecto

```
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
```

## Desarrollo

El servidor utiliza:
- **Express.js** - Framework web
- **File System** - Persistencia de datos en JSON
- **Nodemon** - Reinicio automático durante desarrollo

## Persistencia

Los datos se almacenan en archivos JSON:
- `data/products.json` - Almacena todos los productos
- `data/carts.json` - Almacena todos los carritos

Los archivos se crean automáticamente cuando se agregan datos.

## Testing

Puedes probar los endpoints usando:
- **Postman** - Cliente HTTP con interfaz gráfica
- **curl** - Cliente HTTP desde terminal
- **Insomnia** - Cliente HTTP alternativo

## Ejemplos de uso

### Crear un producto

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Atardecer en la Playa",
    "description": "Fotografía de un hermoso atardecer",
    "code": "BEACH-001",
    "price": 149.99,
    "status": true,
    "stock": 30,
    "category": "Playas",
    "thumbnails": ["https://example.com/sunset.jpg"]
  }'
```

### Crear un carrito

```bash
curl -X POST http://localhost:8080/api/carts
```

### Agregar producto al carrito

```bash
curl -X POST http://localhost:8080/api/carts/1/product/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```

## Contacto

📧 **Email:** awstinjara@gmail.com
📱 **Teléfono:** +54 9 1140608953

## Categorías de Productos

- 🔹#Lookbooks
- 🔹#fotoproducto
- 🔹#eventossociales

## Autor

Ortiz Estefanis 
