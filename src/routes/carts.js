// Rutas de API para gestión de Carritos
const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');

// Instanciar CartManager
const cartManager = new CartManager();

/**
 * POST / - Crear un nuevo carrito vacío
 */
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({
      status: 'success',
      payload: newCart,
      message: 'Carrito creado correctamente'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * GET /:cid - Obtener carrito con todos sus productos populados (completos)
 */
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    res.json({
      status: 'success',
      payload: cart
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * POST /:cid/product/:pid - Agregar un producto al carrito (se mantiene para compatibilidad)
 * Body: { quantity: number (optional, default: 1) }
 */
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await cartManager.addProductToCart(cid, pid, quantity || 1);
    res.json({
      status: 'success',
      payload: updatedCart,
      message: 'Producto agregado al carrito'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * DELETE /:cid/products/:pid - Eliminar un producto específico del carrito
 */
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.removeProductFromCart(cid, pid);
    res.json({
      status: 'success',
      payload: updatedCart,
      message: 'Producto eliminado del carrito'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * PUT /:cid/products/:pid - Actualizar solo la cantidad de un producto en el carrito
 * Body: { quantity: number }
 */
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      throw new Error('La cantidad es requerida');
    }

    const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);
    res.json({
      status: 'success',
      payload: updatedCart,
      message: 'Cantidad del producto actualizada'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * PUT /:cid - Actualizar TODOS los productos del carrito
 * Body: { products: [ { product: ObjectId, quantity: number }, ... ] }
 */
router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      throw new Error('Se requiere un arreglo de productos en el body');
    }

    const updatedCart = await cartManager.updateAllProducts(cid, products);
    res.json({
      status: 'success',
      payload: updatedCart,
      message: 'Productos del carrito actualizados'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * DELETE /:cid - Limpiar TODOS los productos del carrito
 */
router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const updatedCart = await cartManager.clearCart(cid);
    res.json({
      status: 'success',
      payload: updatedCart,
      message: 'Carrito vaciado correctamente'
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
