// Carrito vacío al inicio
let carrito = [];

// Guardar en el navegador
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar del navegador
function cargarCarrito() {
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    carrito = JSON.parse(guardado);
  }
}

// Agregar producto al carrito
function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  const enCarrito = carrito.find(item => item.id === idProducto);

  if (enCarrito) {
    enCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();

  // Redirigir al carrito
  window.location.href = "carrito.html";
}

// Mostrar productos en el carrito
function mostrarCarrito() {
  const lista = document.querySelector("#carrito-lista");
  if (!lista) return; // No estamos en carrito.html

  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  carrito.forEach(item => {
    lista.innerHTML += `
      <div>
        <strong>${item.nombre}</strong> - $${item.precio.toLocaleString("es-CL")}
        <br>Cantidad: 
        <button onclick="cambiarCantidad(${item.id}, -1)">➖</button>
        ${item.cantidad}
        <button onclick="cambiarCantidad(${item.id}, 1)">➕</button>
        <button onclick="eliminarDelCarrito(${item.id})">❌</button>
        <br>Total: $${(item.precio * item.cantidad).toLocaleString("es-CL")}
        <hr>
      </div>
    `;
  });

  // Mostrar total general
  const total = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
  lista.innerHTML += `<p><strong>Total general:</strong> $${total.toLocaleString("es-CL")}</p>`;
}

// Cambiar cantidad (sumar o restar)
function cambiarCantidad(idProducto, cantidad) {
  const item = carrito.find(p => p.id === idProducto);
  if (!item) return;

  item.cantidad += cantidad;

  if (item.cantidad <= 0) {
    eliminarDelCarrito(idProducto);
  } else {
    guardarCarrito();
    mostrarCarrito();
  }
}

// Eliminar producto
function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(p => p.id !== idProducto);
  guardarCarrito();
  mostrarCarrito();
}

// Cargar carrito al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();
  mostrarCarrito();
});
