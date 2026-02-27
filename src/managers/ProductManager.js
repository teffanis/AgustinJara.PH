// Manager de Productos con MongoDB
const Product = require('../models/Product');

class ProductManager {
  // Constructor del manager
  constructor() {
    // Mongoose se inicializa en app.js
  }

  /**
   * Obtener productos con filtros, paginación y ordenamiento
   * @param {Object} filters - Filtros de búsqueda (query, status)
   * @param {number} limit - Cantidad de productos por página (default: 10)
   * @param {number} page - Número de página (default: 1)
   * @param {string} sort - Ordenamiento: 'asc' o 'desc' por precio
   * @returns {Object} Objeto con paginación y productos
   */
  async getProducts(filters = {}, limit = 10, page = 1, sort = '') {
    try {
      // Construir objeto de filtrado
      const queryFilter = {};

      // Filtrar por disponibilidad (status)
      if (filters.status !== undefined) {
        queryFilter.status = filters.status;
      }

      // Filtrar por categoría si existe query
      if (filters.query) {
        queryFilter.category = { $regex: filters.query, $options: 'i' };
      }

      // Definir opciones de paginación
      const options = {
        limit: parseInt(limit) || 10,
        page: parseInt(page) || 1,
        lean: true
      };

      // Aplicar ordenamiento si existe
      if (sort === 'asc' || sort === 'desc') {
        options.sort = {
          price: sort === 'asc' ? 1 : -1
        };
      }

      // Ejecutar paginación
      const result = await Product.paginate(queryFilter, options);

      // Construir URLs de navegación
      const baseUrl = '/api/products';
      const hasPrevPage = page > 1;
      const hasNextPage = page < result.totalPages;

      const prevLink = hasPrevPage
        ? `${baseUrl}?limit=${limit}&page=${page - 1}&query=${filters.query || ''}&sort=${sort}`
        : null;

      const nextLink = hasNextPage
        ? `${baseUrl}?limit=${limit}&page=${page + 1}&query=${filters.query || ''}&sort=${sort}`
        : null;

      // Retornar respuesta estructurada
      return {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: prevLink,
        nextLink: nextLink
      };
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  /**
   * Obtener un producto por su ID
   * @param {string} pid - ID del producto (ObjectId de MongoDB)
   * @returns {Object} Producto encontrado
   */
  async getProductById(pid) {
    try {
      const product = await Product.findById(pid).lean();
      if (!product) {
        throw new Error(`Producto con id ${pid} no encontrado`);
      }
      return product;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }

  /**
   * Agregrar un nuevo producto
   * @param {Object} productData - Datos del nuevo producto
   * @returns {Object} Producto creado
   */
  async addProduct(productData) {
    try {
      // Validar campos requeridos
      const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
      for (const field of requiredFields) {
        if (!productData[field]) {
          throw new Error(`El campo ${field} es requerido`);
        }
      }

      // Crear nuevo producto
      const newProduct = new Product({
        title: productData.title,
        description: productData.description,
        code: productData.code,
        price: productData.price,
        stock: productData.stock,
        category: productData.category,
        thumbnails: productData.thumbnails || [],
        status: productData.status !== undefined ? productData.status : true
      });

      // Guardar en base de datos
      await newProduct.save();
      return newProduct.toObject();
    } catch (error) {
      throw new Error(`Error al agregar producto: ${error.message}`);
    }
  }

  /**
   * Actualizar un producto
   * @param {string} pid - ID del producto (ObjectId de MongoDB)
   * @param {Object} updateData - Datos a actualizar
   * @returns {Object} Producto actualizado
   */
  async updateProduct(pid, updateData) {
    try {
      // No permitir cambiar el ID
      if (updateData._id) {
        delete updateData._id;
      }

      // Actualizar producto
      const updatedProduct = await Product.findByIdAndUpdate(
        pid,
        updateData,
        { new: true, runValidators: true }
      ).lean();

      if (!updatedProduct) {
        throw new Error(`Producto con id ${pid} no encontrado`);
      }

      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }

  /**
   * Eliminar un producto
   * @param {string} pid - ID del producto (ObjectId de MongoDB)
   * @returns {Object} Producto eliminado
   */
  async deleteProduct(pid) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(pid).lean();

      if (!deletedProduct) {
        throw new Error(`Producto con id ${pid} no encontrado`);
      }

      return deletedProduct;
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }
}

module.exports = ProductManager;
