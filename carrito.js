function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto) {
  let carrito = obtenerCarrito();
  let producto = productos.find(p => p.id === idProducto);

  let item = carrito.find(p => p.id === idProducto);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  alert(`${producto.nombre} añadido al carrito`);
}

function mostrarCarrito() {
  const lista = document.querySelector("#carritoLista");
  if (!lista) return;

  let carrito = obtenerCarrito();
  let total = 0;

  lista.innerHTML = "";
  carrito.forEach(p => {
    total += p.precio * p.cantidad;
    lista.innerHTML += `
      <div class="item-carrito">
        <span>${p.nombre}</span>
        <span>$${p.precio}</span>
        <span>Cant: ${p.cantidad}</span>
        <button onclick="cambiarCantidad(${p.id}, 1)">+</button>
        <button onclick="cambiarCantidad(${p.id}, -1)">-</button>
        <button onclick="eliminarDelCarrito(${p.id})">❌</button>
      </div>
    `;
  });

  lista.innerHTML += `<hr><p>Total: <strong>$${total}</strong></p>`;
}

function cambiarCantidad(id, delta) {
  let carrito = obtenerCarrito();
  let item = carrito.find(p => p.id === id);

  if (item) {
    item.cantidad += delta;
    if (item.cantidad <= 0) carrito = carrito.filter(p => p.id !== id);
    guardarCarrito(carrito);
    mostrarCarrito();
  }
}

function eliminarDelCarrito(id) {
  let carrito = obtenerCarrito().filter(p => p.id !== id);
  guardarCarrito(carrito);
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
