// Rutas de API para gestión de Productos
const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

// Instanciar ProductManager
const productManager = new ProductManager();

/**
 * GET / - Listar productos con paginación, filtros y ordenamiento
 * Query params:
 *  - limit: cantidad de productos por página (default: 10)
 *  - page: número de página (default: 1)
 *  - query: filtro por categoría disponibilidad
 *  - sort: asc o desc para ordenar por precio
 * 
 * Respuesta:
 * {
 *   status: "success" | "error"
 *   payload: [products],
 *   totalPages: number,
 *   prevPage: number | null,
 *   nextPage: number | null,
 *   page: number,
 *   hasPrevPage: boolean,
 *   hasNextPage: boolean,
 *   prevLink: string | null,
 *   nextLink: string | null
 * }
 */
router.get('/', async (req, res) => {
  try {
    // Extraer parámetros de query
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const query = req.query.query || '';
    const sort = req.query.sort || '';

    // Construir objeto de filtros
    const filters = {};
    if (query) {
      filters.query = query;
    }

    // Ejecutar búsqueda profesionalizada
    const result = await productManager.getProducts(filters, limit, page, sort);

    // Retornar respuesta estructurada
    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * GET /:pid - Obtener un producto específico por ID
 */
router.get('/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    res.json({
      status: 'success',
      payload: product
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * POST / - Agregar un nuevo producto
 * Body requerido:
 * {
 *   title: string,
 *   description: string,
 *   code: string (unique),
 *   price: number,
 *   stock: number,
 *   category: string,
 *   thumbnails: [array de strings],
 *   status: boolean (optional, default: true)
 * }
 */
router.post('/', async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);

    // Emitir evento de socket.io si está disponible
    if (req.io) {
      req.io.emit('productAdded', newProduct);
    }

    res.status(201).json({
      status: 'success',
      payload: newProduct,
      message: 'Producto agregado correctamente'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * PUT /:pid - Actualizar un producto
 * Body: campos a actualizar
 */
router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);

    // Emitir evento de socket.io si está disponible
    if (req.io) {
      req.io.emit('productUpdated', updatedProduct);
    }

    res.json({
      status: 'success',
      payload: updatedProduct,
      message: 'Producto actualizado correctamente'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
});

/**
 * DELETE /:pid - Eliminar un producto
 */
router.delete('/:pid', async (req, res) => {
  try {
    const deletedProduct = await productManager.deleteProduct(req.params.pid);

    // Emitir evento de socket.io si está disponible
    if (req.io) {
      req.io.emit('productDeleted', deletedProduct);
    }

    res.json({
      status: 'success',
      payload: deletedProduct,
      message: 'Producto eliminado correctamente'
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
});

module.exports = router;
