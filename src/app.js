const express = require('express');
const { engine } = require('express-handlebars');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const PORT = 8080;

// Configurar Handlebars
app.engine('handlebars', engine());
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

// Rutas de vistas
const viewsRouter = require('./routes/views');
app.use('/', viewsRouter);

// Socket.io - Manejo de conexiones
const ProductManager = require('./managers/ProductManager');
const productManager = new ProductManager(path.join(__dirname, '../data/products.json'));

io.on('connection', async (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Enviar lista de productos actualizada al conectarse
  try {
    const products = await productManager.getProducts();
    socket.emit('updateProducts', products);
  } catch (error) {
    socket.emit('error', { message: error.message });
  }

  // Evento para agregar producto
  socket.on('addProduct', async (productData) => {
    try {
      const newProduct = await productManager.addProduct(productData);
      const products = await productManager.getProducts();
      
      // Emitir a todos los clientes conectados
      io.emit('updateProducts', products);
      socket.emit('success', { message: 'Producto agregado correctamente' });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  // Evento para eliminar producto
  socket.on('deleteProduct', async (productId) => {
    try {
      await productManager.deleteProduct(productId);
      const products = await productManager.getProducts();
      
      // Emitir a todos los clientes conectados
      io.emit('updateProducts', products);
      socket.emit('success', { message: 'Producto eliminado correctamente' });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

module.exports = { app, io };
