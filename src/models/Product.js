// Modelo de Producto para MongoDB con Mongoose
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Definir esquema de Producto
const productSchema = new mongoose.Schema({
  // Titulo del producto
  title: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Descripción detallada
  description: {
    type: String,
    required: true
  },
  
  // Código único del producto
  code: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  // Precio del producto
  price: {
    type: Number,
    required: true,
    index: true
  },
  
  // Stock disponible
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  
  // Categoría del producto para búsqueda
  category: {
    type: String,
    required: true,
    index: true
  },
  
  // Miniaturas/imágenes del producto
  thumbnails: [{
    type: String
  }],
  
  // Estado de disponibilidad del producto
  status: {
    type: Boolean,
    default: true,
    index: true
  },
  
  // Fecha de creación
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

// Usar plugin de paginación
productSchema.plugin(mongoosePaginate);

// Middleware para actualizar updatedAt
productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Crear modelo
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
