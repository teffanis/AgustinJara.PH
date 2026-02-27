# ✅ CHECKLIST DE VALIDACIÓN

Utiliza esta lista para verificar que todo está funcionando correctamente después de la implementación.

## 1️⃣ VALIDACIÓN DEL ENTORNO

- [ ] `npm --version` retorna versión (v6+)
- [ ] `node --version` retorna versión (v14+)
- [ ] `mongod` o `mongosh` responden correctamente
- [ ] Archivo `.env` creado (si es necesario)

**Comando para verificar:**
```bash
npm install && npm run dev
```

Debería ver en consola:
```
╔════════════════════════════════════════╗
║  🚀 Servidor ejecutándose en puerto 8080   ║
...
✓ Conectado a MongoDB
```

---

## 2️⃣ VALIDACIÓN DE ESTRUCTURA DE CARPETAS

Verifica que existan estos archivos:

- [ ] `src/config/mongodb.js`
- [ ] `src/models/Product.js`
- [ ] `src/models/Cart.js`
- [ ] `src/managers/ProductManager.js` (modificado)
- [ ] `src/managers/CartManager.js` (modificado)
- [ ] `src/routes/products.js` (modificado)
- [ ] `src/routes/carts.js` (modificado)
- [ ] `src/routes/views.js` (modificado)
- [ ] `src/helpers/handlebarsHelpers.js`
- [ ] `src/views/products.handlebars` (nuevo)
- [ ] `src/views/productDetail.handlebars` (nuevo)
- [ ] `src/views/cart.handlebars` (nuevo)
- [ ] `src/views/error.handlebars` (nuevo)

---

## 3️⃣ VALIDACIÓN DE API - PRODUCTOS

### Test 1: GET /api/products (sin filtros)
```bash
curl "http://localhost:8080/api/products"
```

**✅ Esperado:**
- Estado: 200
- Campo `status`: "success"
- Campo `payload`: []  (vacío sin datos)
- Campos: `totalPages`, `page`, `hasPrevPage`, `hasNextPage`

- [ ] Retorna JSON válido
- [ ] Campo `status` existe
- [ ] Campo `payload` es array
- [ ] Campos de paginación presentes

### Test 2: GET /api/products con query params
```bash
curl "http://localhost:8080/api/products?limit=5&page=1&sort=asc"
```

- [ ] Respeta parámetro `limit`
- [ ] Respeta parámetro `page`
- [ ] Respeta parámetro `sort`

### Test 3: POST /api/products (crear)
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Producto",
    "description": "Descripción test",
    "code": "TEST-001",
    "price": 99.99,
    "stock": 5,
    "category": "test",
    "status": true
  }'
```

- [ ] Retorna 201 (Created)
- [ ] Retorna `_id` (ObjectId MongoDB)
- [ ] Todos los campos están presentes
- [ ] Campos `createdAt` y `updatedAt` están en respuesta

### Test 4: GET /api/products/:id (obtener específico)
```bash
# Reemplaza con el _id del producto anterior
curl "http://localhost:8080/api/products/[_id]"
```

- [ ] Retorna 200
- [ ] Objeto producto completo
- [ ] Los datos coinciden con los creados

### Test 5: PUT /api/products/:id (actualizar)
```bash
curl -X PUT http://localhost:8080/api/products/[_id] \
  -H "Content-Type: application/json" \
  -d '{"price": 129.99, "stock": 10}'
```

- [ ] Retorna 200
- [ ] Precio actualizado
- [ ] Stock actualizado
- [ ] ID no cambió

### Test 6: DELETE /api/products/:id (eliminar)
```bash
curl -X DELETE http://localhost:8080/api/products/[_id]
```

- [ ] Retorna 200
- [ ] Retorna el producto eliminado

---

## 4️⃣ VALIDACIÓN DE API - CARRITOS

### Test 1: POST /api/carts (crear carrito)
```bash
curl -X POST http://localhost:8080/api/carts
```

**✅ Esperado:**
- Estado: 201
- Retorna `_id` del carrito
- Campo `products`: [] (vacío)

- [ ] Retorna _id válido (ObjectId)
- [ ] `products` es array vacío
- [ ] `status` es "success"

**⚠️ GUARDA el _id para los siguientes tests**

### Test 2: Crear un producto para agregar al carrito
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Producto para Carrito",
    "description": "Test",
    "code": "PROD-CART-001",
    "price": 50,
    "stock": 20,
    "category": "test"
  }'
```

**⚠️ GUARDA el _id del producto**

### Test 3: POST /api/carts/:cid/product/:pid (agregar producto)
```bash
curl -X POST http://localhost:8080/api/carts/[CID]/product/[PID] \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```

- [ ] Retorna 200
- [ ] Array `products` tiene 1 elemento
- [ ] Campo `quantity` es 2
- [ ] El producto se agregó correctamente

### Test 4: GET /api/carts/:cid (obtener carrito con populate)
```bash
curl "http://localhost:8080/api/carts/[CID]"
```

- [ ] Retorna 200
- [ ] Campo `products[0].product` es un objeto (no solo ID)
- [ ] Objeto producto contiene: `title`, `price`, `stock`, etc.
- [ ] Campo `quantity` está presente

### Test 5: PUT /api/carts/:cid/products/:pid (actualizar cantidad)
```bash
curl -X PUT http://localhost:8080/api/carts/[CID]/products/[PID] \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

- [ ] Retorna 200
- [ ] Campo `quantity` cambió a 5

### Test 6: DELETE /api/carts/:cid/products/:pid (eliminar producto)
```bash
curl -X DELETE http://localhost:8080/api/carts/[CID]/products/[PID]
```

- [ ] Retorna 200
- [ ] Array `products` está vacío

### Test 7: PUT /api/carts/:cid (agregar múltiples productos)
```bash
# Primero crea 2 productos nuevos y anota sus IDs

curl -X PUT http://localhost:8080/api/carts/[CID] \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {"product": "[PID1]", "quantity": 2},
      {"product": "[PID2]", "quantity": 3}
    ]
  }'
```

- [ ] Retorna 200
- [ ] Array `products` tiene 2 elementos
- [ ] Cantidades son correctas

### Test 8: DELETE /api/carts/:cid (vaciar carrito)
```bash
curl -X DELETE http://localhost:8080/api/carts/[CID]
```

- [ ] Retorna 200
- [ ] Array `products` está vacío

---

## 5️⃣ VALIDACIÓN DE VISTAS (Handlebars)

### Test 1: Vista de Productos
```
http://localhost:8080/products
```

En el navegador verificar:
- [ ] Página carga sin errores (no hay error 500)
- [ ] Si hay productos: se ven en formato grid
- [ ] Barra de filtros presente (query, sort, limit)
- [ ] Paginación visible
- [ ] Botones "Ver detalles" están presentes
- [ ] Botones "Agregar al carrito" están presentes

### Test 2: Vista con Filtros
```
http://localhost:8080/products?query=test&sort=asc&limit=5&page=1
```

- [ ] URL con query params funciona
- [ ] Los filtros se aplicaron
- [ ] La página no se duplica con filtros previos

### Test 3: Vista Detalle Producto
```
# Click en "Ver detalles" o visita manualmente
http://localhost:8080/products/[_id]
```

- [ ] Página carga sin errores
- [ ] Título del producto visible
- [ ] Descripción completa visible
- [ ] Precio visible
- [ ] Stock visible
- [ ] Imagen (si existe) se muestra
- [ ] Selector de cantidad presente
- [ ] Botón "Agregar al carrito" presente
- [ ] Link "Volver" funciona

### Test 4: Vista Carrito
```
http://localhost:8080/carts/[CID]
```

**Prerequisito:** Carrito debe tener al menos 1 producto

- [ ] Página carga sin errores
- [ ] Tabla con productos presente
- [ ] Cada producto muestra: imagen, nombre, precio, cantidad
- [ ] Columna de subtotal visible
- [ ] Cálculo de total es correcto
- [ ] Botones de acciones presentes: Eliminar, Vaciar, Continuar
- [ ] Información del carrito (ID, fechas) visible

### Test 5: Errores
```
http://localhost:8080/products/id-invalido
http://localhost:8080/carts/id-inexistente
```

- [ ] Página de error se muestra
- [ ] Título "no encontrado"
- [ ] Botones de navegación presentes

---

## 6️⃣ VALIDACIÓN DE SOCKET.IO (Tiempo Real)

```
http://localhost:8080/realtimeproducts
```

- [ ] Página carga
- [ ] Consola no muestra errores
- [ ] Conexión Socket.io establecida

### En otra ventana:
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Socket","description":"test","code":"SKT-001","price":99,"stock":5,"category":"test"}'
```

- [ ] El nuevo producto aparece en tiempo real en la página
- [ ] No necesita refrescar

---

## 7️⃣ VALIDACIÓN DE HELPERS HANDLEBARS

En las vistas que usan helpers:

- [ ] Cálculos de dinero (multiply) funcionan
- [ ] Comparaciones (eq, gt, lt) funcionan
- [ ] Fechas se formatean correctamente
- [ ] Textos se truncan si es necesario

---

## 8️⃣ VALIDACIÓN DE BASES DE DATOS

Accede a MongoDB Compass o mongosh:

```bash
mongosh
use ecommerce_fotografias
db.products.find()  # Debe mostrar productos creados
db.carts.find()     # Debe mostrar carritos creados
```

- [ ] Base de datos `ecommerce_fotografias` existe
- [ ] Colección `products` existe y tiene documentos
- [ ] Colección `carts` existe
- [ ] ObjectIds están en formato correcto
- [ ] Índices en campos clave (title, code, category)

---

## 9️⃣ VALIDACIÓN DE ERRORES

### Intentar crear producto sin campos requeridos
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"title": "Incompleto"}'
```

- [ ] Retorna 400 o 500 (error esperado)
- [ ] Mensaje de error descriptivo

### Intentar agregar producto inexistente al carrito
```bash
curl -X POST http://localhost:8080/api/carts/[CID]/product/000000000000000000000000
```

- [ ] Retorna error descriptivo
- [ ] No crash del servidor

### Intentar acceder a recurso inexistente
```bash
curl "http://localhost:8080/api/products/000000000000000000000000"
curl "http://localhost:8080/api/carts/000000000000000000000000"
```

- [ ] Retorna 404
- [ ] Mensaje de error apropiado

---

## 🔟 VALIDACIÓN DE PERFORMANCE

### Prueba con muchos productos
```bash
# Crear 100 productos (usa un script)
# Luego verificar que:
```

- [ ] GET `/api/products?limit=10` es rápido (< 500ms)
- [ ] GET `/api/products?limit=100` es rápido
- [ ] Búsqueda por query es eficiente
- [ ] No hay memory leaks (memoria sube pero se estabiliza)

---

## 📝 CHECKLIST FINAL

Marca como completado cuando hayas validado:

- [ ] Todos los tests de API pasan
- [ ] Todas las vistas cargan sin errores
- [ ] Todos los CRUD funcionan (Create, Read, Update, Delete)
- [ ] Paginación funciona correctamente
- [ ] Filtros funcionan
- [ ] Ordenamiento funciona
- [ ] Populate() devuelve productos completos
- [ ] Socket.io funciona en tiempo real
- [ ] Manejo de errores es correcto
- [ ] Base de datos está sincronizada

---

## 🎉 RESULTADO

Si completaste todos los checkboxes:

✅ **¡Tu aplicación está lista para producción!**

---

## 📊 Registro de Validación

```
Fecha de validación: ____________
Desarrollador: ___________________
Versión: 2.0.0
Base de datos: MongoDB
Checkboxes completados: ___ de ___
Status: [ ] Exitoso [ ] Con problemas
Notas:
_________________________________
_________________________________
```

---

**Versión:** 2.0.0  
**Última actualización:** 27 de febrero de 2026
