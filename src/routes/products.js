const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const path = require('path');

// Instanciar ProductManager con la ruta del archivo
const productManager = new ProductManager(path.join(__dirname, '../../data/products.json'));

// GET / - Listar todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /:pid - Obtener un producto por ID
router.get('/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST / - Agregar nuevo producto
router.post('/', async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    
    // Emitir evento de socket.io si está disponible
    if (req.io) {
      const products = await productManager.getProducts();
      req.io.emit('updateProducts', products);
    }
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /:pid - Actualizar producto
router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /:pid - Eliminar producto
router.delete('/:pid', async (req, res) => {
  try {
    const deletedProduct = await productManager.deleteProduct(req.params.pid);
    
    // Emitir evento de socket.io si está disponible
    if (req.io) {
      const products = await productManager.getProducts();
      req.io.emit('updateProducts', products);
    }
    
    res.json({ message: 'Producto eliminado', product: deletedProduct });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
