const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const path = require('path');

// Instanciar CartManager con la ruta del archivo
const cartManager = new CartManager(path.join(__dirname, '../../data/carts.json'));

// POST / - Crear nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /:cid - Obtener productos del carrito
router.get('/:cid', async (req, res) => {
  try {
    const products = await cartManager.getCartProducts(req.params.cid);
    res.json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST /:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await cartManager.addProductToCart(cid, pid, quantity || 1);
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
