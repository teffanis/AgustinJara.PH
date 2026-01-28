const fs = require('fs').promises;
const path = require('path');

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Leer el archivo JSON de carritos
  async readCarts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  // Escribir carritos en el archivo JSON
  async writeCarts(carts) {
    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
  }

  // Generar ID único
  generateId(carts) {
    if (carts.length === 0) return 1;
    return Math.max(...carts.map(c => typeof c.id === 'number' ? c.id : parseInt(c.id))) + 1;
  }

  // Crear nuevo carrito
  async createCart() {
    const carts = await this.readCarts();
    const newCart = {
      id: this.generateId(carts),
      products: []
    };
    carts.push(newCart);
    await this.writeCarts(carts);
    return newCart;
  }

  // Obtener carrito por ID
  async getCartById(cid) {
    const carts = await this.readCarts();
    const cart = carts.find(c => c.id == cid);
    if (!cart) {
      throw new Error(`Carrito con id ${cid} no encontrado`);
    }
    return cart;
  }

  // Agregar producto al carrito
  async addProductToCart(cid, pid, quantity = 1) {
    const carts = await this.readCarts();
    const cartIndex = carts.findIndex(c => c.id == cid);

    if (cartIndex === -1) {
      throw new Error(`Carrito con id ${cid} no encontrado`);
    }

    const cart = carts[cartIndex];
    const existingProduct = cart.products.find(p => p.product == pid);

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

    carts[cartIndex] = cart;
    await this.writeCarts(carts);
    return cart;
  }

  // Obtener productos del carrito
  async getCartProducts(cid) {
    const cart = await this.getCartById(cid);
    return cart.products;
  }
}

module.exports = CartManager;
