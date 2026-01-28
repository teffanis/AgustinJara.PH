const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido al servidor de ecommerce de fotografías',
    endpoints: {
      products: '/api/products',
      carts: '/api/carts'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
