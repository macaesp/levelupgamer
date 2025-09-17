// Función para leer el carrito desde localStorage
function leerCarrito() {
  const carrito = localStorage.getItem("carrito");
  return carrito ? JSON.parse(carrito) : [];
}

// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
  // Buscar el producto en el array de productos
  const producto = productos.find(p => p.id === idProducto);
  
  if (!producto) {
    console.error("Producto no encontrado");
    return;
  }

  // Obtener carrito actual
  let carrito = leerCarrito();

  // Verificar si el producto ya existe en el carrito
  const productoExistente = carrito.find(item => item.id === idProducto);
  
  if (productoExistente) {
    // Si existe, aumentar la cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si no existe, agregar nuevo producto al carrito
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  // Guardar carrito actualizado
  guardarCarrito(carrito);
  
  // Mostrar notificación
  mostrarNotificacion('Producto agregado al carrito');
  
  // Actualizar contador del carrito
  actualizarContadorCarrito();
}

// Función para mostrar el carrito en la página
function mostrarCarrito() {
  const contenedor = document.querySelector("#carrito-lista");
  if (!contenedor) return;

  const carrito = leerCarrito();
  
  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega algunos productos para comenzar!</p>
        <a href="productos.html" class="btn-primary">Ver Productos</a>
      </div>
    `;
    actualizarResumen();
    return;
  }

  let html = '';
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    html += `
      <div class="item-carrito">
        <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='../img/no-image.png'">
        <div class="item-info">
          <h3>${item.nombre}</h3>
          <p>$${item.precio.toLocaleString('es-CL')} c/u</p>
          <div class="item-subtotal">Subtotal: $${subtotal.toLocaleString('es-CL')}</div>
        </div>
        <div class="item-controls">
          <div class="quantity-controls">
            <button onclick="cambiarCantidad(${item.id}, -1)" class="qty-btn">−</button>
            <span class="quantity">${item.cantidad}</span>
            <button onclick="cambiarCantidad(${item.id}, 1)" class="qty-btn">+</button>
          </div>
          <button onclick="eliminarDelCarrito(${item.id})" class="btn-eliminar">
            <i class="fas fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;
  actualizarResumen();
}

// Función para cambiar la cantidad de un producto
function cambiarCantidad(idProducto, delta) {
  let carrito = leerCarrito();
  const item = carrito.find(item => item.id === idProducto);
  
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    // Eliminar producto si la cantidad es 0 o menos
    carrito = carrito.filter(item => item.id !== idProducto);
    mostrarNotificacion('Producto eliminado del carrito');
  } else {
    mostrarNotificacion('Cantidad actualizada');
  }

  guardarCarrito(carrito);
  mostrarCarrito();
  actualizarContadorCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
  let carrito = leerCarrito().filter(item => item.id !== idProducto);
  guardarCarrito(carrito);
  mostrarCarrito();
  actualizarContadorCarrito();
  mostrarNotificacion('Producto eliminado del carrito');
}

// Función para actualizar el resumen de compra
function actualizarResumen() {
  const carrito = leerCarrito();
  let subtotal = 0;

  carrito.forEach(item => {
    subtotal += item.precio * item.cantidad;
  });

  const envio = subtotal > 50000 ? 0 : 3000;
  const descuento = 0; // Se puede modificar con códigos de descuento
  const total = subtotal + envio - descuento;

  // Actualizar elementos del DOM si existen
  if (document.getElementById('subtotal')) {
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-CL')}`;
    document.getElementById('shipping').textContent = envio === 0 ? 'Gratis' : `$${envio.toLocaleString('es-CL')}`;
    document.getElementById('discount').textContent = `-$${descuento.toLocaleString('es-CL')}`;
    document.getElementById('total').textContent = `$${total.toLocaleString('es-CL')}`;
  }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const carrito = leerCarrito();
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  const contador = document.getElementById('header-cart-count');
  
  if (contador) {
    contador.textContent = totalItems;
    contador.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
  // Crear elemento de notificación
  const notificacion = document.createElement('div');
  notificacion.className = `notificacion ${tipo}`;
  notificacion.textContent = mensaje;
  
  document.body.appendChild(notificacion);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notificacion.remove();
  }, 3000);
}

// Función para aplicar código de descuento
function applyPromoCode() {
  const codigo = document.getElementById('promo-code').value;
  if (codigo.toUpperCase() === 'GAMER10') {
    mostrarNotificacion('¡Código GAMER10 aplicado! 10% de descuento.');
    // Aquí iría la lógica para aplicar el descuento
  } else if (codigo) {
    mostrarNotificacion('❌ Código no válido', 'error');
  }
}

// Función para proceder al pago
function proceedToCheckout() {
  const carrito = leerCarrito();
  if (carrito.length === 0) {
    mostrarNotificacion('Tu carrito está vacío', 'error');
    return;
  }
  mostrarNotificacion('Redirigiendo al proceso de pago...');
  // Aquí iría la redirección al checkout
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector("#carrito-lista")) {
    mostrarCarrito();
  }
  actualizarContadorCarrito();
});