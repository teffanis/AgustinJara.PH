// Rutas de vistas con Handlebars
const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const CartManager = require('../managers/CartManager');

// Instanciar managers
const productManager = new ProductManager();
const cartManager = new CartManager();

/**
 * GET / - Ruta principal, redirecciona a productos
 */
router.get('/', (req, res) => {
  res.redirect('/products');
});

/**
 * GET /products - Vista de todos los productos con paginación
 * Query params: limit, page, query, sort
 */
router.get('/products', async (req, res) => {
  try {
    // Extraer parámetros de query
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const query = req.query.query || '';
    const sort = req.query.sort || '';

    // Construir filtros
    const filters = {};
    if (query) {
      filters.query = query;
    }

    // Obtener productos
    const result = await productManager.getProducts(filters, limit, page, sort);

    // Renderizar vista con datos de paginación
    res.render('products', {
      title: 'Productos - Ecommerce Fotografías',
      products: result.payload,
      totalPages: result.totalPages,
      currentPage: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
      query: query,
      sort: sort
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      message: error.message
    });
  }
});

/**
 * GET /products/:pid - Vista detallada de un producto específico
 */
router.get('/products/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);

    res.render('productDetail', {
      title: `${product.title} - Ecommerce Fotografías`,
      product: product
    });
  } catch (error) {
    res.status(404).render('error', {
      title: 'Producto no encontrado',
      message: error.message
    });
  }
});

/**
 * GET /carts/:cid - Vista de un carrito específico
 * Muestra solo los productos que pertenecen a ese carrito
 */
router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);

    res.render('cart', {
      title: `Carrito ${req.params.cid} - Ecommerce Fotografías`,
      cart: cart,
      cartId: req.params.cid,
      products: cart.products
    });
  } catch (error) {
    res.status(404).render('error', {
      title: 'Carrito no encontrado',
      message: error.message
    });
  }
});

/**
 * GET /realtimeproducts - Vista de productos en tiempo real (compatibilidad con socket.io)
 */
router.get('/realtimeproducts', async (req, res) => {
  try {
    const result = await productManager.getProducts({}, 100, 1, '');
    res.render('realTimeProducts', {
      title: 'Productos en Tiempo Real - Ecommerce Fotografías',
      products: result.payload,
      useSocket: true
    });
  } catch (error) {
    res.status(500).render('realTimeProducts', {
      title: 'Error',
      products: [],
      error: error.message
    });
  }
});

module.exports = router;
