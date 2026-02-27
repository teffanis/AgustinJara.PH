# 📋 Ejemplos de Uso de la API - cURL

Ejemplos prácticos de cómo usar todos los endpoints disponibles usando `curl`.

## 🛍️ PRODUCTOS

### 1️⃣ Listar productos sin filtros
```bash
curl "http://localhost:8080/api/products"
```

### 2️⃣ Listar productos con paginación (página 1, 10 productos)
```bash
curl "http://localhost:8080/api/products?limit=10&page=1"
```

### 3️⃣ Buscar productos por categoría
```bash
curl "http://localhost:8080/api/products?query=retratos&limit=10&page=1"
```

### 4️⃣ Ordenar productos por precio (ascendente)
```bash
curl "http://localhost:8080/api/products?sort=asc&limit=10"
```

### 5️⃣ Ordenar productos por precio (descendente)
```bash
curl "http://localhost:8080/api/products?sort=desc&limit=10"
```

### 6️⃣ Búsqueda avanzada: "retratos" ordenados por precio descendente
```bash
curl "http://localhost:8080/api/products?query=retratos&sort=desc&limit=15&page=1"
```

### 7️⃣ Obtener un producto específico por ID
```bash
curl "http://localhost:8080/api/products/507f1f77bcf86cd799439011"
```

### 8️⃣ Crear un nuevo producto
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Retrato Artístico",
    "description": "Fotografía de retrato con estilos artísticos",
    "code": "RET-ART-001",
    "price": 350.00,
    "stock": 5,
    "category": "retratos",
    "thumbnails": ["https://ejemplo.com/foto.jpg"],
    "status": true
  }'
```

### 9️⃣ Actualizar un producto
```bash
curl -X PUT http://localhost:8080/api/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 400.00,
    "stock": 8,
    "description": "Descripción actualizada del producto"
  }'
```

### 🔟 Eliminar un producto
```bash
curl -X DELETE http://localhost:8080/api/products/507f1f77bcf86cd799439011
```

---

## 🛒 CARRITOS

### 1️⃣ Crear un nuevo carrito
```bash
curl -X POST http://localhost:8080/api/carts \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Respuesta de ejemplo (guarda el ID):**
```json
{
  "status": "success",
  "payload": {
    "_id": "507f1f77bcf86cd799439012",
    "products": [],
    "createdAt": "2026-02-27T10:30:00Z"
  }
}
```

### 2️⃣ Obtener un carrito (con productos completos)
```bash
curl "http://localhost:8080/api/carts/507f1f77bcf86cd799439012"
```

### 3️⃣ Agregar un producto al carrito (método antiguo, aún funciona)
```bash
curl -X POST http://localhost:8080/api/carts/507f1f77bcf86cd799439012/product/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```

### 4️⃣ Eliminar un producto específico del carrito
```bash
curl -X DELETE http://localhost:8080/api/carts/507f1f77bcf86cd799439012/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json"
```

### 5️⃣ Actualizar cantidad de un producto en el carrito
```bash
curl -X PUT http://localhost:8080/api/carts/507f1f77bcf86cd799439012/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

**Nota:** Si la cantidad es 0, se elimina el producto del carrito.

### 6️⃣ Actualizar TODOS los productos del carrito
```bash
curl -X PUT http://localhost:8080/api/carts/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {
        "product": "507f1f77bcf86cd799439011",
        "quantity": 3
      },
      {
        "product": "507f1f77bcf86cd799439013",
        "quantity": 2
      }
    ]
  }'
```

### 7️⃣ Vaciar el carrito (eliminar todos los productos)
```bash
curl -X DELETE http://localhost:8080/api/carts/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json"
```

---

## 🌐 VISTAS (Handlebars)

### 1️⃣ Ver página principal
```
http://localhost:8080/
```

### 2️⃣ Ver catálogo de productos
```
http://localhost:8080/products
```

### 3️⃣ Ver catálogo con filtros
```
http://localhost:8080/products?query=retratos&sort=asc&limit=10&page=1
```

### 4️⃣ Ver detalle de un producto
```
http://localhost:8080/products/507f1f77bcf86cd799439011
```

### 5️⃣ Ver carrito específico
```
http://localhost:8080/carts/507f1f77bcf86cd799439012
```

### 6️⃣ Ver productos en tiempo real (Socket.io)
```
http://localhost:8080/realtimeproducts
```

---

## 🧪 Script de Prueba Integrada

Copia y ejecuta esto en tu terminal para probar todo:

```bash
#!/bin/bash

BASE_URL="http://localhost:8080"

echo "=== 1. CREAR CARRITO ==="
CART_RESPONSE=$(curl -s -X POST $BASE_URL/api/carts)
CART_ID=$(echo $CART_RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
echo "Carrito creado: $CART_ID"

echo ""
echo "=== 2. LISTAR PRODUCTOS ==="
curl -s "$BASE_URL/api/products?limit=5&sort=asc" | jq .

echo ""
echo "=== 3. OBTENER PRIMER PRODUCTO ==="
PRODUCTS=$(curl -s "$BASE_URL/api/products?limit=1")
PRODUCT_ID=$(echo $PRODUCTS | jq -r '.payload[0]._id')
echo "Producto seleccionado: $PRODUCT_ID"

echo ""
echo "=== 4. AGREGAR PRODUCTO AL CARRITO ==="
curl -s -X POST "$BASE_URL/api/carts/$CART_ID/product/$PRODUCT_ID" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}' | jq .

echo ""
echo "=== 5. VER CARRITO ==="
curl -s "$BASE_URL/api/carts/$CART_ID" | jq .

echo ""
echo "=== ✅ PRUEBAS COMPLETADAS ==="
```

---

## 🔍 Interpretación de Respuestas

### Respuesta exitosa (2xx)
```json
{
  "status": "success",
  "payload": { /* datos aquí */ },
  "message": "Operación realizada"
}
```

### Respuesta con error (4xx, 5xx)
```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

---

## 💡 Consejos Útiles

1. **Guardar IDs de ejemplo** para hacer pruebas posteriores
2. **Usar `jq`** para embellecer JSON: `curl ... | jq .`
3. **Windows:** Si no tiene jq, usar PowerShell:
   ```powershell
   $response = Invoke-WebRequest -Uri "http://localhost:8080/api/products" | ConvertFrom-Json
   $response | ConvertTo-Json
   ```

4. **Postman:** También puedes importar la colección `Ecommerce_Fotografias_API.postman_collection.json`

---

## 🚨 Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Cannot GET /api/products` | Servidor no está ejecutándose | `npm run dev` |
| `ECONNREFUSED` | MongoDB no está disponible | Iniciar MongoDB |
| `404 Not Found` | ID inexistente | Verificar ID del producto/carrito |
| `400 Bad Request` | JSON malformado | Verificar formato y headers |

---

**Última actualización:** 27 de febrero de 2026
