// Configuración de conexión a MongoDB
const mongoose = require('mongoose');

// URL de conexión a MongoDB (local)
// Cambiar a tu URL de MongoDB si es necesario
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_fotografias';

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Conectado a MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('✗ Error al conectar a MongoDB:', error.message);
    throw error;
  }
};

module.exports = { connectDB, MONGODB_URI };
