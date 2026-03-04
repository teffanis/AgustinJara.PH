/**
 * @file loader.js
 * @description Rutas para cargar datos desde archivos JSON locales a MongoDB
 * @author Sistema
 * @version 1.0.0
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const ProductManager = require('../managers/ProductManager');
const CartManager = require('../managers/CartManager');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const router = express.Router();

/**
 * POST /api/loader/products
 * Carga productos desde data/products.json a MongoDB
 * @returns {object} {status, message, loaded, errors}
 */
router.post('/products', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../data/products.json');
    
    // Verificar que el archivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        status: 'error',
        message: 'Archivo products.json no encontrado',
        payload: null
      });
    }

    // Leer el archivo JSON
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(fileContent);

    if (!Array.isArray(products)) {
      return res.status(400).json({
        status: 'error',
        message: 'El archivo debe contener un array de productos',
        payload: null
      });
    }

    // Limpiar colección existente (opcional - comentar si quieres mantener datos)
    await Product.deleteMany({});

    // Insertar nuevos productos
    const insertedProducts = await Product.insertMany(products);

    res.status(200).json({
      status: 'success',
      message: `${insertedProducts.length} productos cargados exitosamente`,
      payload: {
        total: insertedProducts.length,
        products: insertedProducts
      }
    });

  } catch (error) {
    console.error('Error cargando productos:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al cargar productos',
      error: error.message,
      payload: null
    });
  }
});

/**
 * POST /api/loader/carts
 * Carga carritos desde data/carts.json a MongoDB
 * @returns {object} {status, message, loaded}
 */
router.post('/carts', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../data/carts.json');
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        status: 'error',
        message: 'Archivo carts.json no encontrado',
        payload: null
      });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const carts = JSON.parse(fileContent);

    if (!Array.isArray(carts)) {
      return res.status(400).json({
        status: 'error',
        message: 'El archivo debe contener un array de carritos',
        payload: null
      });
    }

    // Limpiar colección existente
    await Cart.deleteMany({});

    // Insertar nuevos carritos
    const insertedCarts = await Cart.insertMany(carts);

    res.status(200).json({
      status: 'success',
      message: `${insertedCarts.length} carritos cargados exitosamente`,
      payload: {
        total: insertedCarts.length,
        carts: insertedCarts
      }
    });

  } catch (error) {
    console.error('Error cargando carritos:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al cargar carritos',
      error: error.message,
      payload: null
    });
  }
});

/**
 * GET /api/loader/status
 * Verifica el estado de los datos en MongoDB y archivos locales
 * @returns {object} {status, databases, files}
 */
router.get('/status', async (req, res) => {
  try {
    const productsFile = path.join(__dirname, '../../data/products.json');
    const cartsFile = path.join(__dirname, '../../data/carts.json');

    // Contar documentos en BD
    const productCount = await Product.countDocuments();
    const cartCount = await Cart.countDocuments();

    // Leer archivos locales
    let productsLocal = 0;
    let cartsLocal = 0;

    if (fs.existsSync(productsFile)) {
      const fileContent = fs.readFileSync(productsFile, 'utf-8');
      const products = JSON.parse(fileContent);
      productsLocal = products.length;
    }

    if (fs.existsSync(cartsFile)) {
      const fileContent = fs.readFileSync(cartsFile, 'utf-8');
      const carts = JSON.parse(fileContent);
      cartsLocal = carts.length;
    }

    res.status(200).json({
      status: 'success',
      message: 'Estado de datos',
      payload: {
        database: {
          products: productCount,
          carts: cartCount
        },
        files: {
          products: productsLocal,
          carts: cartsLocal
        },
        synchronized: productCount === productsLocal && cartCount === cartsLocal
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error obteniendo estado',
      error: error.message
    });
  }
});

module.exports = router;
