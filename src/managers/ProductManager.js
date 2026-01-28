const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Leer el archivo JSON de productos
  async readProducts() {
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

  // Escribir productos en el archivo JSON
  async writeProducts(products) {
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
  }

  // Generar ID único
  generateId(products) {
    if (products.length === 0) return 1;
    return Math.max(...products.map(p => typeof p.id === 'number' ? p.id : parseInt(p.id))) + 1;
  }

  // Obtener todos los productos
  async getProducts() {
    return await this.readProducts();
  }

  // Obtener producto por ID
  async getProductById(pid) {
    const products = await this.readProducts();
    const product = products.find(p => p.id == pid);
    if (!product) {
      throw new Error(`Producto con id ${pid} no encontrado`);
    }
    return product;
  }

  // Agregar nuevo producto
  async addProduct(productData) {
    const products = await this.readProducts();

    // Validar que todos los campos requeridos estén presentes
    const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
    for (const field of requiredFields) {
      if (!productData[field]) {
        throw new Error(`El campo ${field} es requerido`);
      }
    }

    // Generar ID automático
    const newProduct = {
      id: this.generateId(products),
      ...productData,
      status: productData.status !== undefined ? productData.status : true,
      thumbnails: productData.thumbnails || []
    };

    products.push(newProduct);
    await this.writeProducts(products);
    return newProduct;
  }

  // Actualizar producto
  async updateProduct(pid, updateData) {
    const products = await this.readProducts();
    const index = products.findIndex(p => p.id == pid);

    if (index === -1) {
      throw new Error(`Producto con id ${pid} no encontrado`);
    }

    // No permitir cambiar el ID
    if (updateData.id) {
      delete updateData.id;
    }

    products[index] = { ...products[index], ...updateData };
    await this.writeProducts(products);
    return products[index];
  }

  // Eliminar producto
  async deleteProduct(pid) {
    const products = await this.readProducts();
    const index = products.findIndex(p => p.id == pid);

    if (index === -1) {
      throw new Error(`Producto con id ${pid} no encontrado`);
    }

    const deletedProduct = products.splice(index, 1);
    await this.writeProducts(products);
    return deletedProduct[0];
  }
}

module.exports = ProductManager;
