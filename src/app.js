// Cargar variables de entorno antes que todo
require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
const { connectDB } = require('./config/mongodb');
const handlebarsHelpers = require('./helpers/handlebarsHelpers');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const loaderRouter = require('./routes/loader');

const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB().catch(error => {
  console.error('Error al conectar a MongoDB:', error);
  process.exit(1);
});

// Configurar Handlebars con helpers personalizados
app.engine('handlebars', engine({
  helpers: handlebarsHelpers
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para compartir io con las rutas
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Rutas API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/loader', loaderRouter);

// Rutas de vistas
const viewsRouter = require('./routes/views');
app.use('/', viewsRouter);

// Socket.io - Manejo de conexiones
const ProductManager = require('./managers/ProductManager');
const productManager = new ProductManager();

io.on('connection', async (socket) => {
  console.log('✓ Cliente conectado:', socket.id);

  // Enviar lista de productos actualizada al conectarse
  try {
    const result = await productManager.getProducts({}, 100, 1, '');
    socket.emit('updateProducts', result.payload);
  } catch (error) {
    socket.emit('error', { message: error.message });
  }

  // Evento para agregar producto
  socket.on('addProduct', async (productData) => {
    try {
      const newProduct = await productManager.addProduct(productData);
      const result = await productManager.getProducts({}, 100, 1, '');
      
      // Emitir a todos los clientes conectados
      io.emit('updateProducts', result.payload);
      socket.emit('success', { message: 'Producto agregado correctamente' });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Evento para eliminar producto
  socket.on('deleteProduct', async (productId) => {
    try {
      await productManager.deleteProduct(productId);
      const result = await productManager.getProducts({}, 100, 1, '');
      
      // Emitir a todos los clientes conectados
      io.emit('updateProducts', result.payload);
      socket.emit('success', { message: 'Producto eliminado correctamente' });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('✗ Cliente desconectado:', socket.id);
  });
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║  🚀 Servidor ejecutándose en puerto ${PORT}   ║`);
  console.log(`║  🌐 http://localhost:${PORT}                 ║`);
  console.log(`║  📦 Base de datos: MongoDB               ║`);
  console.log(`╚════════════════════════════════════════╝\n`);
});

module.exports = { app, io };
