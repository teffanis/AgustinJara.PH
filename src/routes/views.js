const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const path = require('path');

// Instanciar ProductManager
const productManager = new ProductManager(path.join(__dirname, '../../data/products.json'));

// Ruta para la vista home
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', {
      title: 'Productos - Ecommerce Fotografías',
      products: products
    });
  } catch (error) {
    res.status(500).render('home', {
      title: 'Error',
      products: [],
      error: error.message
    });
  }
});

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {
      title: 'Productos en Tiempo Real - Ecommerce Fotografías',
      products: products,
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
