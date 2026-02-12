# Ecommerce de Fotografias - API

Servidor de ecommerce para la venta de fotografias, desarrollado con Node.js, Express, Handlebars y Socket.io.

## Requisitos

- Node.js v14 o superior
- npm

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm start
```

El servidor estara disponible en `http://localhost:8080`

## Estructura del Proyecto

```
ecommerce-fotografias/
├── src/
│   ├── app.js                 # Archivo principal del servidor
│   ├── managers/
│   │   ├── ProductManager.js  # Gestor de productos
│   │   └── CartManager.js     # Gestor de carritos
│   ├── routes/
│   │   ├── products.js        # Rutas de productos
│   │   ├── carts.js           # Rutas de carritos
│   │   └── views.js           # Rutas de vistas
│   └── views/
│       ├── layouts/
│       │   └── main.handlebars
│       ├── home.handlebars
│       └── realTimeProducts.handlebars
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── realTimeProducts.js
├── data/
│   ├── products.json          # Base de datos de productos
│   └── carts.json             # Base de datos de carritos
├── package.json
└── README.md
```

## Vistas

### `/` - Home
Lista estatica de productos utilizando Handlebars

### `/realtimeproducts` - Productos en Tiempo Real
Vista con actualizacion en tiempo real mediante WebSockets:
- Formulario para agregar productos
- Eliminacion de productos
- Actualizacion automatica en todos los clientes conectados

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

## Tecnologias

- Express: Framework web
- Express-Handlebars: Motor de plantillas
- Socket.io: WebSockets para actualizaciones en tiempo real
- Node.js: Entorno de ejecucion

## Autor

Ortiz Estefanis
