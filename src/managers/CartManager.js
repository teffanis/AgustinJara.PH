// Manager de Carritos con MongoDB
const Cart = require('../models/Cart');
const Product = require('../models/Product');

class CartManager {
  // Constructor del manager
  constructor() {
    // Mongoose se inicializa en app.js
  }

  /**
   * Crear un nuevo carrito vacío
   * @returns {Object} Carrito creado
   */
  async createCart() {
    try {
      const newCart = new Cart({
        products: []
      });
      await newCart.save();
      return newCart.toObject();
    } catch (error) {
      throw new Error(`Error al crear carrito: ${error.message}`);
    }
  }

  /**
   * Obtener un carrito por ID con productos populados
   * @param {string} cid - ID del carrito (ObjectId de MongoDB)
   * @returns {Object} Carrito con productos
   */
  async getCartById(cid) {
    try {
      const cart = await Cart.findById(cid).populate('products.product').lean();
      if (!cart) {
        throw new Error(`Carrito con id ${cid} no encontrado`);
      }
      return cart;
    } catch (error) {
      throw new Error(`Error al obtener carrito: ${error.message}`);
    }
  }

  /**
   * Obtener productos del carrito
   * @param {string} cid - ID del carrito
   * @returns {Array} Array de productos en el carrito
   */
  async getCartProducts(cid) {
    try {
      const cart = await this.getCartById(cid);
      return cart.products;
    } catch (error) {
      throw new Error(`Error al obtener productos del carrito: ${error.message}`);
    }
  }

  /**
   * Agregar un producto al carrito
   * @param {string} cid - ID del carrito
   * @param {string} pid - ID del producto (ObjectId de MongoDB)
   * @param {number} quantity - Cantidad de unidades
   * @returns {Object} Carrito actualizado
   */
  async addProductToCart(cid, pid, quantity = 1) {
    try {
      // Validar que el producto existe
      const product = await Product.findById(pid);
      if (!product) {
        throw new Error(`Producto con id ${pid} no encontrado`);
      }

      // Buscar el carrito
      let cart = await Cart.findById(cid);
      if (!cart) {
        throw new Error(`Carrito con id ${cid} no encontrado`);
      }

      // Buscar si el producto ya existe en el carrito
      const existingProduct = cart.products.find(
        p => p.product.toString() === pid
      );

      if (existingProduct) {
        // Incrementar cantidad si el producto ya existe
        existingProduct.quantity += quantity;
      } else {
        // Agregar nuevo producto
        cart.products.push({
          product: pid,
          quantity: quantity
        });
      }

      await cart.save();
      return await cart.populate('products.product');
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito: ${error.message}`);
    }
  }

  /**
   * Eliminar un producto del carrito
   * @param {string} cid - ID del carrito
   * @param {string} pid - ID del producto (ObjectId de MongoDB)
   * @returns {Object} Carrito actualizado
   */
  async removeProductFromCart(cid, pid) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        throw new Error(`Carrito con id ${cid} no encontrado`);
      }

      // Eliminar el producto del array
      cart.products = cart.products.filter(
        p => p.product.toString() !== pid
      );

      await cart.save();
      return await cart.populate('products.product');
    } catch (error) {
      throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
    }
  }

  /**
   * Actualizar la cantidad de un producto en el carrito
   * @param {string} cid - ID del carrito
   * @param {string} pid - ID del producto
   * @param {number} quantity - Nueva cantidad
   * @returns {Object} Carrito actualizado
   */
  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        throw new Error(`Carrito con id ${cid} no encontrado`);
      }

      const productInCart = cart.products.find(
        p => p.product.toString() === pid
      );

      if (!productInCart) {
        throw new Error(`Producto con id ${pid} no está en el carrito`);
      }

      // Actualizar cantidad
      if (quantity <= 0) {
        // Si la cantidad es 0 o menor, eliminar el producto
        cart.products = cart.products.filter(
          p => p.product.toString() !== pid
        );
      } else {
        productInCart.quantity = quantity;
      }

      await cart.save();
      return await cart.populate('products.product');
    } catch (error) {
      throw new Error(`Error al actualizar cantidad: ${error.message}`);
    }
  }

  /**
   * Actualizar todos los productos del carrito
   * @param {string} cid - ID del carrito
   * @param {Array} products - Array de productos con {product: pid, quantity: number}
   * @returns {Object} Carrito actualizado
   */
  async updateAllProducts(cid, products) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        throw new Error(`Carrito con id ${cid} no encontrado`);
      }

      // Validar que todos los productos existan
      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Producto con id ${item.product} no encontrado`);
        }
      }

      // Reemplazar todos los productos
      cart.products = products.map(item => ({
        product: item.product,
        quantity: item.quantity || 1
      }));

      await cart.save();
      return await cart.populate('products.product');
    } catch (error) {
      throw new Error(`Error al actualizar productos: ${error.message}`);
    }
  }

  /**
   * Limpiar todos los productos del carrito
   * @param {string} cid - ID del carrito
   * @returns {Object} Carrito vacío
   */
  async clearCart(cid) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        throw new Error(`Carrito con id ${cid} no encontrado`);
      }

      cart.products = [];
      await cart.save();
      return await cart.populate('products.product');
    } catch (error) {
      throw new Error(`Error al limpiar carrito: ${error.message}`);
    }
  }
}

module.exports = CartManager;
