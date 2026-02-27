// Modelo de Carrito para MongoDB con Mongoose
const mongoose = require('mongoose');

// Definir esquema de Carrito
const cartSchema = new mongoose.Schema({
  // Array de productos en el carrito
  products: [{
    // Referencia al modelo de Producto
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    
    // Cantidad de unidades de este producto
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1
    },
    
    // Timestamp de cuando se agregó al carrito
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Fecha de creación del carrito
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // Fecha de última actualización
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar updatedAt
cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Método para obtener el carrito con productos populados
cartSchema.methods.populateProducts = function () {
  return this.populate('products.product');
};

// Crear modelo
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
