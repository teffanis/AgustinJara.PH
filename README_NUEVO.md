# 🎨 Ecommerce de Fotografías - API Profesional MongoDB

Servidor Express.js profesional con MongoDB para gestión de productos y carritos de compra con paginación, filtros, ordenamiento y vistas Handlebars.

## 🚀 Características Principales

✅ **Base de Datos MongoDB** - Persistencia con Mongoose ORM  
✅ **Paginación Profesional** - Control de límite, página, links de navegación  
✅ **Filtros Avanzados** - Búsqueda por categoría y disponibilidad  
✅ **Ordenamiento** - Ascendente/descendente por precio  
✅ **Carritos Inteligentes** - Referencias a productos con populate()  
✅ **Vistas Responsivas** - Handlebars con helpers personalizados  
✅ **Socket.io** - Actualizaciones en tiempo real  
✅ **API RESTful** - Endpoints completamente documentados  

## 📋 Requisitos

- **Node.js** v14 o superior
- **MongoDB** (local en `localhost:27017` o URL personalizada)
- **npm** o **yarn**

## 🔧 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. (Opcional) Configurar MongoDB
# Por defecto usa: mongodb://localhost:27017/ecommerce_fotografias
# Para cambiar, crear archivo .env con:
# MONGODB_URI=tu_url_mongodb

# 3. Iniciar servidor
npm run dev    # Desarrollo con hot-reload (nodemon)
npm start      # Producción
```

**Servidor disponible en:** http://localhost:8080

---

## 📚 API Endpoints - PRODUCTOS

### GET `/api/products` - 📦 Listar Productos con Paginación

Obtiene lista de productos con filtros, paginación y ordenamiento.

**Query Parameters:**
```
limit   : Productos por página (default: 10)
page    : Número de página (default: 1)
query   : Filtro por categoría (búsqueda parcial)
sort    : Ordenamiento: "asc" o "desc" por precio
```

**Ejemplo:**
```bash
GET http://localhost:8080/api/products?limit=10&page=1&query=retratos&sort=asc
```

**Respuesta Success (200):**
```json
{
  "status": "success",
  "payload": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Retrato Profesional",
      "description": "Fotografía de estudio con iluminación profesional",
      "code": "RET-001",
      "price": 150.00,
      "stock": 5,
      "category": "retratos",
      "thumbnails": ["url/imagen.jpg"],
      "status": true,
      "createdAt": "2026-02-27T10:30:00Z",
      "updatedAt": "2026-02-27T10:30:00Z"
    }
  ],
  "totalPages": 5,
  "prevPage": null,
  "nextPage": 2,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevLink": null,
  "nextLink": "/api/products?limit=10&page=2&query=retratos&sort=asc"
}
```

### GET `/api/products/:pid` - 📷 Obtener Producto por ID

```bash
GET http://localhost:8080/api/products/507f1f77bcf86cd799439011
```

**Respuesta (200):**
```json
{
  "status": "success",
  "payload": { ...datos del producto... }
}
```

### POST `/api/products` - ➕ Crear Producto

**Body (application/json):**
```json
{
  "title": "Paisaje de Montaña",
  "description": "Fotografía de paisaje en alta resolución",
  "code": "PAI-001",
  "price": 200,
  "stock": 10,
  "category": "paisajes",
  "thumbnails": ["url/imagen.jpg"],
  "status": true
}
```

### PUT `/api/products/:pid` - ✏️ Actualizar Producto

**Body:** Campos a actualizar

### DELETE `/api/products/:pid` - 🗑️ Eliminar Producto

---

## 📚 API Endpoints - CARRITOS

### POST `/api/carts` - 🛒 Crear Carrito

Crea un nuevo carrito vacío.

```bash
POST http://localhost:8080/api/carts
```

**Respuesta (201):**
```json
{
  "status": "success",
  "payload": {
    "_id": "507f1f77bcf86cd799439012",
    "products": [],
    "createdAt": "2026-02-27T10:30:00Z",
    "updatedAt": "2026-02-27T10:30:00Z"
  },
  "message": "Carrito creado correctamente"
}
```

### GET `/api/carts/:cid` - 👁️ Obtener Carrito (con productos populados)

Obtiene carrito con todos los productos completos.

```bash
GET http://localhost:8080/api/carts/507f1f77bcf86cd799439012
```

**Respuesta (200):** Carrito con array de `products` con data completa del producto.

### POST `/api/carts/:cid/product/:pid` - ➕ Agregar Producto (DEPRECATED)

```bash
POST http://localhost:8080/api/carts/CID/product/PID
Content-Type: application/json

{ "quantity": 2 }
```

### DELETE `/api/carts/:cid/products/:pid` - 🗑️ Eliminar Producto del Carrito

Elimina un producto específico.

```bash
DELETE http://localhost:8080/api/carts/CID/products/PID
```

**Respuesta (200):**
```json
{
  "status": "success",
  "payload": { ...carrito actualizado... },
  "message": "Producto eliminado del carrito"
}
```

### PUT `/api/carts/:cid/products/:pid` - 🔢 Actualizar Cantidad

Actualiza SOLO la cantidad de un producto.

```bash
PUT http://localhost:8080/api/carts/CID/products/PID
Content-Type: application/json

{ "quantity": 5 }
```

### PUT `/api/carts/:cid` - 📋 Actualizar TODOS los Productos

Reemplaza completamente los productos del carrito.

```bash
PUT http://localhost:8080/api/carts/CID
Content-Type: application/json

{
  "products": [
    { "product": "507f1f77bcf86cd799439011", "quantity": 2 },
    { "product": "507f1f77bcf86cd799439013", "quantity": 3 }
  ]
}
```

### DELETE `/api/carts/:cid` - ♻️ Vaciar Carrito Completo

Elimina TODOS los productos del carrito.

```bash
DELETE http://localhost:8080/api/carts/CID
```

---

## 🌐 VISTAS (Rutas Handlebars)

| Ruta | Descripción |
|------|-------------|
| **GET `/`** | Redirecciona a `/products` |
| **GET `/products`** | Catálogo de productos con paginación, filtros y ordenamiento |
| **GET `/products/:pid`** | Detalle completo de un producto específico |
| **GET `/carts/:cid`** | Vista del carrito con todos sus productos |
| **GET `/realtimeproducts`** | Administración en tiempo real con Socket.io |

### 📱 Vista Productos (`/products`)
- Listado en grid responsivo
- Filtros por categoría
- Ordenamiento por precio
- Paginación con links directos
- Botón "Ver detalles" → `/products/:pid`
- Botón "Agregar al carrito" (placeholder)

### 🎯 Vista Detalle Producto (`/products/:pid`)
- Imagen principal con zoom
- Galería de miniaturas
- Datos completos: precio, stock, categoría, código
- Selector de cantidad
- Botón "Agregar al carrito"
- Info de fechas de creación/actualización

### 🛍️ Vista Carrito (`/carts/:cid`)
- Tabla de productos con imagen, precio, cantidad
- Subtotal por producto
- Cálculo de subtotal, impuestos (10%) y total
- Botones: Eliminar producto, Vaciar carrito, Continuar comprando
- Links directos a producto
- Información del carrito (ID, fechas)

---

## 📁 Estructura del Proyecto

```
ecommerce-fotografias/
├── src/
│   ├── app.js                          # 🎯 Punto de entrada
│   ├── config/
│   │   └── mongodb.js                  # 🗄️ Conexión a MongoDB
│   ├── models/
│   │   ├── Product.js                  # 📦 Esquema de Producto
│   │   └── Cart.js                     # 🛒 Esquema de Carrito
│   ├── managers/
│   │   ├── ProductManager.js           # 📦 Lógica de productos
│   │   └── CartManager.js              # 🛒 Lógica de carritos
│   ├── routes/
│   │   ├── products.js                 # 📦 Endpoints productos
│   │   ├── carts.js                    # 🛒 Endpoints carritos
│   │   └── views.js                    # 🌐 Rutas de vistas
│   ├── views/
│   │   ├── products.handlebars         # 📋 Catálogo
│   │   ├── productDetail.handlebars    # 📷 Detalle producto
│   │   ├── cart.handlebars             # 🛒 Vista carrito
│   │   ├── error.handlebars            # ⚠️ Página error
│   │   ├── realTimeProducts.handlebars # ⏱️ Tiempo real
│   │   └── layouts/
│   │       └── main.handlebars         # 📄 Layout principal
│   ├── helpers/
│   │   └── handlebarsHelpers.js        # 🔧 Helpers Handlebars
│   └── public/
│       ├── css/style.css
│       └── js/realTimeProducts.js
├── package.json
├── README.md
└── Ecommerce_Fotografias_API.postman_collection.json
```

---

## 🎯 Características de Negocio

### 📦 Productos
- ✅ Campos requeridos validados: title, description, code, price, stock, category
- ✅ Campo `status` para indicar disponibilidad
- ✅ Filtrado por categoría (case-insensitive)
- ✅ Ordenamiento ASC/DESC por precio
- ✅ Paginación obligatoria con metadata completa
- ✅ Timestamps de creación y actualización automáticos

### 🛒 Carritos
- ✅ Referencias a productos mediante `populate()`
- ✅ Almacena solo ObjectId del producto en el carrito
- ✅ Retorna producto completo al solicitar carrito
- ✅ Cada item tiene cantidad personalizable
- ✅ CRUD completo: agregar, actualizar, eliminar, limpiar
- ✅ Validación de existencia de productos

---

## 🧪 Ejemplos de Uso

### Crear un carrito
```bash
curl -X POST http://localhost:8080/api/carts
```

### Listar productos con filtros
```bash
curl "http://localhost:8080/api/products?limit=10&page=1&query=retratos&sort=asc"
```

### Agregar producto al carrito
```bash
curl -X POST http://localhost:8080/api/carts/CID/product/PID \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```

### Actualizar cantidad en carrito
```bash
curl -X PUT http://localhost:8080/api/carts/CID/products/PID \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

### Vaciar carrito
```bash
curl -X DELETE http://localhost:8080/api/carts/CID
```

---

## 🤝 Helpers Handlebars

```handlebars
{{multiply a b}}                  <!-- Multiplica dos números -->
{{#eq a b}}...{{/eq}}             <!-- Igualdad -->
{{#if (gt a b)}}...{{/if}}        <!-- Mayor que -->
{{#if (lt a b)}}...{{/if}}        <!-- Menor que -->
{{#if (gte a b)}}...{{/if}}       <!-- Mayor o igual -->
{{#if (lte a b)}}...{{/if}}       <!-- Menor o igual -->
{{cartSubtotal products}}         <!-- Subtotal del carrito -->
{{currency amount}}               <!-- Formato divisa -->
{{formatDate date}}               <!-- Formato fecha -->
{{truncate text 50}}              <!-- Truncar texto -->
{{#isEmpty array}}...{{/isEmpty}} <!-- Verificar vacío -->
```

---

## 🔐 Consideraciones de Seguridad

- ✅ Validación de entrada en server-side
- ✅ ObjectId Mongolia válidos
- ✅ Populate solo cuando sea necesario
- ✅ Cantidades nunca negativas
- ✅ Códigos de producto únicos
- ✅ Manejo de errores completo

---

## 📦 Dependencias

```json
{
  "express": "^4.18.2",
  "express-handlebars": "^8.0.3",
  "mongoose": "^7.5.0",
  "mongoose-paginate-v2": "^1.7.31",
  "socket.io": "^4.8.3",
  "nodemon": "^3.0.2" (dev)
}
```

---

## 🚀 Próximas Mejoras

- [ ] Autenticación y autorización
- [ ] Carrito persistente en sesión
- [ ] Integración de pagos
- [ ] Admin dashboard
- [ ] Búsqueda full-text
- [ ] Reviews y ratings

---

## 📞 Variables de Entorno

Archivo `.env` (opcional):
```
MONGODB_URI=mongodb://localhost:27017/ecommerce_fotografias
PORT=8080
NODE_ENV=development
```

---

## ✨ Notas Importantes

1. **MongoDB** debe estar ejecutándose antes de iniciar el servidor
2. Los **ObjectIds** de MongoDB son hexadecimales de 24 caracteres
3. El **populate()** trae la data completa del producto al obtener carritos
4. Las **respuestas API** siempre tienen formato `{ status, payload, ... }`
5. Los **helpers Handlebars** están registrados en `app.js`

---

**Versión:** 2.0.0 - MongoDB Refactor  
**Fecha:** 27 de febrero de 2026  
**Autor:** Equipo de Desarrollo  
**Base de Datos:** MongoDB con Mongoose  
**Framework:** Express.js + Handlebars + Socket.io
