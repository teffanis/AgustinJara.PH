# Guía de Pruebas - API Ecommerce de Fotografías

## Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor:**
   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:8080`

## Pruebas con curl

### Productos

#### 1. Listar todos los productos
```bash
curl http://localhost:8080/api/products
```

#### 2. Obtener un producto por ID
```bash
curl http://localhost:8080/api/products/1
```

#### 3. Crear un nuevo producto
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Colección Fotografía de Producto",
    "description": "Fotografías profesionales de productos",
    "code": "PROD-002",
    "price": 189.99,
    "status": true,
    "stock": 35,
    "category": "🔹#fotoproducto",
    "thumbnails": ["https://example.com/products.jpg"]
  }'
```

#### 4. Actualizar un producto
```bash
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Atardecer en la Playa - Edición Premium",
    "price": 199.99,
    "stock": 45
  }'
```

#### 5. Eliminar un producto
```bash
curl -X DELETE http://localhost:8080/api/products/2
```

### Carritos

#### 1. Crear un nuevo carrito
```bash
curl -X POST http://localhost:8080/api/carts
```

#### 2. Obtener productos del carrito
```bash
curl http://localhost:8080/api/carts/1
```

#### 3. Agregar producto al carrito
```bash
curl -X POST http://localhost:8080/api/carts/1/product/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```

## Pruebas con Postman

1. **Importar la colección:**
   - Abre Postman
   - Haz clic en "Import"
   - Selecciona el archivo `Ecommerce_Fotografias_API.postman_collection.json`

2. **Ejecutar requests:**
   - Todos los endpoints están configurados con URLs y body listos para usar
   - Puedes modificar los parámetros según necesites

## Respuestas Esperadas

### Crear Producto (POST /api/products)
**Status:** 201 Created
```json
{
  "id": 4,
  "title": "Cielo Estrellado",
  "description": "Fotografía nocturna con miles de estrellas",
  "code": "NIGHT-001",
  "price": 129.99,
  "status": true,
  "stock": 40,
  "category": "Nocturna",
  "thumbnails": ["https://example.com/starry-sky.jpg"]
}
```

### Crear Carrito (POST /api/carts)
**Status:** 201 Created
```json
{
  "id": 1,
  "products": []
}
```

### Agregar Producto a Carrito (POST /api/carts/1/product/1)
**Status:** 200 OK
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

### Agregar nuevamente el mismo producto
**Status:** 200 OK
```json
{
  "id": 1,
  "products": [
    {
      "product": 1,
      "quantity": 3
    }
  ]
}
```

## Manejo de Errores

### Producto no encontrado
**Status:** 404 Not Found
```json
{
  "error": "Producto con id 999 no encontrado"
}
```

### Carrito no encontrado
**Status:** 404 Not Found
```json
{
  "error": "Carrito con id 999 no encontrado"
}
```

### Campo requerido faltante
**Status:** 400 Bad Request
```json
{
  "error": "El campo title es requerido"
}
```

## Persistencia de Datos

Los datos se almacenan en archivos JSON:
- **`data/products.json`** - Lista de todos los productos
- **`data/carts.json`** - Lista de todos los carritos

Estos archivos se crean y actualizan automáticamente.

## Comportamiento Especial

### Carritos
- Los carritos se crean vacíos con un array `products: []`
- Cuando agregas un producto, se añade con su ID y cantidad
- Si el producto ya existe en el carrito, se incrementa la cantidad

### Productos
- El ID se autogenera automáticamente (no se envía en el body)
- El campo `status` por defecto es `true` si no se especifica
- El campo `thumbnails` por defecto es un array vacío
- No se puede modificar el ID de un producto (intentos serán ignorados)

## Categorías Disponibles

- 🔹#Lookbooks
- 🔹#fotoproducto
- 🔹#eventossociales

## Contacto

📧 **Email:** awstinjara@gmail.com
📱 **Teléfono:** +54 9 1140608953

## Notas Importantes

- **Puerto:** El servidor corre en puerto 8080
- **Base URL:** `http://localhost:8080`
- **Content-Type:** Todos los POST/PUT deben incluir `Content-Type: application/json`
- **Sin autenticación:** Este servidor no implementa autenticación
- **Modo desarrollo:** Usa `npm run dev` para ejecutar con nodemon (reinicio automático)

