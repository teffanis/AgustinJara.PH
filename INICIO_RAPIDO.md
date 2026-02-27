# 🚀 GUÍA DE INICIO RÁPIDO

Sigue estos pasos para tener el proyecto funcionando en 5 minutos.

## Paso 1: Requisitos Previos ✅

Verifica que tengas instalado:
```bash
# Verificar Node.js
node --version  # Debe ser v14 o superior

# Verificar npm
npm --version   # Debe ser v6 o superior
```

**Descargar e instalar:**
- [Node.js](https://nodejs.org/) - Incluye npm
- [MongoDB Community](https://www.mongodb.com/try/download/community) - Local O
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud gratuito

## Paso 2: Instalar Dependencias 📦

```bash
# Navega al directorio del proyecto
cd ecommerce-fotografias

# Instala todas las dependencias
npm install
```

**Output esperado:**
```
added XX packages in X seconds
```

## Paso 3: Configurar MongoDB 🗄️

### Opción A: MongoDB Local (Recomendado para desarrollo)

```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

Verifica que esté ejecutándose:
```bash
mongosh  # O mongo (versiones antiguas)
```

### Opción B: MongoDB Atlas (Cloud)

1. Crea cuenta en [MongoDB Atlas](https://cloud.mongodb.com)
2. Crea un cluster gratuito
3. Obtén la conexión string
4. Crea archivo `.env` en la raíz del proyecto:

```env
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/ecommerce_fotografias
PORT=8080
NODE_ENV=development
```

## Paso 4: Iniciar el Servidor 🚀

```bash
# Modo desarrollo (con hot-reload)
npm run dev

# Modo producción
npm start
```

**Output esperado:**
```
╔════════════════════════════════════════╗
║  🚀 Servidor ejecutándose en puerto 8080   ║
║  🌐 http://localhost:8080                 ║
║  📦 Base de datos: MongoDB               ║
╚════════════════════════════════════════╝
```

## Paso 5: Probar la Aplicación ✅

### Opción A: Navegador Web

Abre en tu navegador:
```
http://localhost:8080/products
```

Deberías ver:
- ✅ Lista de productos (vacía si es primera vez)
- ✅ Filtros y paginación
- ✅ Navegación en la parte superior

### Opción B: Postman

1. Importa archivo: `Ecommerce_Fotografias_API.postman_collection.json`
2. Abre cualquier endpoint
3. Presiona "Send"

### Opción C: cURL (Terminal)

```bash
# Listar productos
curl "http://localhost:8080/api/products"

# Crear un carrito
curl -X POST http://localhost:8080/api/carts
```

## Paso 6: Cargar Datos de Ejemplo (Opcional) 📊

Para tener datos para probar:

### Opción A: MongoDB Compass (Visual)

1. Abre [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
2. Conecta a `mongodb://localhost:27017`
3. Crea base de datos: `ecommerce_fotografias`
4. Crea colección: `products`
5. Importa JSON desde `data/DATOS_EJEMPLO.js`

### Opción B: mongoimport (Terminal)

⚠️ Primero convierte el archivo JS a JSON válido (sin comentarios).

```bash
mongoimport --db ecommerce_fotografias \
  --collection products \
  --file data/productos.json \
  --jsonArray
```

### Opción C: Manual mediante API

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Primera Foto",
    "description": "Descripción del producto",
    "code": "FOTO-001",
    "price": 100,
    "stock": 5,
    "category": "retratos",
    "thumbnails": [],
    "status": true
  }'
```

## Paso 7: Explora la Aplicación 🎨

### Rutas Web (Handlebars)

| Ruta | Descripción |
|------|-------------|
| `http://localhost:8080/` | Inicio (redirige a /products) |
| `http://localhost:8080/products` | Catálogo de productos |
| `http://localhost:8080/products?query=retratos&sort=asc` | Con filtros |
| `http://localhost:8080/products/:id` | Detalle de producto |
| `http://localhost:8080/carts/:id` | Ver carrito |
| `http://localhost:8080/realtimeproducts` | Admin en tiempo real |

### Endpoints API

Ejemplos básicos:
```bash
# Obtener productos
curl "http://localhost:8080/api/products"

# Crear carrito
curl -X POST http://localhost:8080/api/carts

# Listar con filtros
curl "http://localhost:8080/api/products?query=retratos&sort=desc&limit=5"
```

Ver archivo `EJEMPLOS_API.md` para más ejemplos.

## Paso 8: Detener el Servidor 🛑

```bash
# Presiona en la terminal
Ctrl + C
```

## 🐛 Solución de Problemas

### Error: `Cannot GET /api/products`
```
❌ Causa: Servidor no está ejecutándose
✅ Solución: Ejecuta npm run dev
```

### Error: `ECONNREFUSED` o `connect ECONNREFUSED 127.0.0.1:27017`
```
❌ Causa: MongoDB no está corriendo
✅ Solución Windows: mongod
✅ Solución macOS: brew services start mongodb-community
✅ Solución Linux: sudo systemctl start mongod
```

### Error: `404 Not Found` en `/products`
```
❌ Causa: Datos no cargados en MongoDB
✅ Solución: Carga datos de ejemplo (ver Paso 6)
```

### Error: `Connection refused` en MongoDB Atlas
```
❌ Causa: IP no whitelisted o credenciales incorrectas
✅ Solución: 
   1. Verifica MONGODB_URI en .env
   2. Agrega tu IP a IP Whitelist en Atlas
   3. Verifica usuario/contraseña
```

### Módulo no encontrado
```
❌ Causa: Dependencias no instaladas
✅ Solución: rm -rf node_modules && npm install
```

---

## 📝 Estructura de Archivos Clave

```
src/
├── app.js ........................ Archivo principal
├── config/mongodb.js ............. Conexión BD
├── models/
│   ├── Product.js ............... Esquema Producto
│   └── Cart.js .................. Esquema Carrito
├── managers/
│   ├── ProductManager.js ......... Lógica Productos
│   └── CartManager.js ........... Lógica Carritos
├── routes/
│   ├── products.js .............. API Productos
│   ├── carts.js ................. API Carritos
│   └── views.js ................. Rutas Vistas
└── views/ ....................... Plantillas HTML
```

---

## 🎯 Próximos Pasos

Después de verificar que funciona:

1. **Lee la documentación completa:** `README_NUEVO.md`
2. **Explora los ejemplos:** `EJEMPLOS_API.md`
3. **Revisa los cambios realizados:** `CAMBIOS.md`
4. **Crea tus propios productos** mediante la API
5. **Personaliza** colores, textos, etc.

---

## 📚 Recursos Útiles

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Handlebars Guide](https://handlebarsjs.com/)
- [Socket.io Guide](https://socket.io/docs/)

---

## ✨ Comandos Útiles

```bash
# Reiniciar con datos limpios (MongoDB)
# Accede a mongosh y ejecuta:
use ecommerce_fotografias
db.products.deleteMany({})
db.carts.deleteMany({})

# Limpiar cache de npm
npm cache clean --force

# Ver versiones de paquetes
npm list --depth=0

# Actualizar paquetes
npm update

# Auditoría de seguridad
npm audit
```

---

## 🎉 ¡Felicidades!

Si llegaste aquí sin errores, ¡tu servidor está listo!

**Para ayuda adicional, consulta:**
- `README_NUEVO.md` - Documentación completa
- `EJEMPLOS_API.md` - Ejemplos de uso
- `CAMBIOS.md` - Lista de cambios realizados

**Versión:** 2.0.0  
**Fecha:** 27 de febrero de 2026  
**Status:** ✅ Listo para usar
