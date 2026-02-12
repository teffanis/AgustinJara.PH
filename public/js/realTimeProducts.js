const socket = io();

// Referencias al DOM
const addProductForm = document.getElementById('addProductForm');
const productsList = document.getElementById('productsList');

// Función para renderizar la lista de productos
function renderProducts(products) {
  if (!products || products.length === 0) {
    productsList.innerHTML = '<p class="no-products">No hay productos disponibles.</p>';
    return;
  }

  productsList.innerHTML = products.map(product => `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.thumbnails && product.thumbnails[0] ? product.thumbnails[0] : 'https://via.placeholder.com/300x200?text=Sin+Imagen'}" 
           alt="${product.title}" 
           onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'">
      <div class="product-info">
        <h4>${product.title}</h4>
        <p class="description">${product.description}</p>
        <p class="price">$${product.price}</p>
        <p class="stock">Stock: ${product.stock}</p>
        <p class="code">Código: ${product.code}</p>
        <p class="category">Categoría: ${product.category}</p>
        <button class="btn btn-danger delete-btn" data-id="${product.id}">Eliminar</button>
      </div>
    </div>
  `).join('');

  // Agregar event listeners a los botones de eliminar
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      deleteProduct(productId);
    });
  });
}

// Agregar producto
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(addProductForm);
  const thumbnails = formData.get('thumbnails');
  
  const product = {
    title: formData.get('title'),
    description: formData.get('description'),
    code: formData.get('code'),
    price: parseFloat(formData.get('price')),
    stock: parseInt(formData.get('stock')),
    category: formData.get('category'),
    thumbnails: thumbnails ? thumbnails.split(',').map(url => url.trim()) : []
  };

  // Emitir evento al servidor
  socket.emit('addProduct', product);
  
  // Limpiar formulario
  addProductForm.reset();
});

// Eliminar producto
function deleteProduct(productId) {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    socket.emit('deleteProduct', productId);
  }
}

// Escuchar actualizaciones del servidor
socket.on('updateProducts', (products) => {
  console.log('Productos actualizados:', products);
  renderProducts(products);
});

// Mensajes de error
socket.on('error', (error) => {
  alert('Error: ' + error.message);
});

// Mensajes de éxito
socket.on('success', (message) => {
  console.log('Éxito:', message);
});

// Conexión establecida
socket.on('connect', () => {
  console.log('Conectado al servidor');
});

// Desconexión
socket.on('disconnect', () => {
  console.log('Desconectado del servidor');
});
