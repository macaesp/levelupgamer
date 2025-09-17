
function leerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

// guarda el carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// agrega un producto al carrito 
function agregarAlCarrito(idProducto) {

  const producto = (typeof productos !== "undefined") ? productos.find(p => p.id === idProducto) : null;

  // obtener carrito actual
  let carrito = leerCarrito();

  if (producto) {
    // si existe en carrito, aumentar cantidad; si no, agregar con cantidad 1
    const existente = carrito.find(item => item.id === idProducto);
    if (existente) {
      existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen || "",
        cantidad: 1
      });
    }
  } else {

    const existente = carrito.find(item => item.id === idProducto);
    if (existente) {
      existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
      carrito.push({ id: idProducto, nombre: "Producto", precio: 0, cantidad: 1 });
    }
  }

  guardarCarrito(carrito);

  // redirigir al carrito para confirmar compra 
  window.location.href = "carrito.html";
}

// muestra el carrito en carrito.html
function mostrarCarrito() {
  const cont = document.querySelector("#carrito-lista");
  if (!cont) return; // si no existe, salimos 

  const carrito = leerCarrito();
  if (carrito.length === 0) {
    cont.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  let total = 0;
  let html = "";

  carrito.forEach(item => {
    const subtotal = (item.precio || 0) * (item.cantidad || 1);
    total += subtotal;

    html += `
      <div class="item-carrito">
        <img src="${item.imagen || 'img/no-image.png'}" alt="${item.nombre}" style="width:80px;height:80px;object-fit:cover;border-radius:6px;margin-right:10px;">
        <div style="flex:1;">
          <strong>${item.nombre}</strong>
          <div>$${(item.precio||0).toLocaleString('es-CL')} x ${item.cantidad} = $${subtotal.toLocaleString('es-CL')}</div>
        </div>
        <div>
          <button onclick="cambiarCantidad(${item.id}, -1)">➖</button>
          <button onclick="cambiarCantidad(${item.id}, 1)">➕</button>
          <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        </div>
      </div>
      <hr>
    `;
  });

  html += `<p style="text-align:right;"><strong>Total: $${total.toLocaleString('es-CL')}</strong></p>`;

  cont.innerHTML = html;
}

// cambiar cantidad 
function cambiarCantidad(idProducto, delta) {
  let carrito = leerCarrito();
  const item = carrito.find(i => i.id === idProducto);
  if (!item) return;
  item.cantidad = (item.cantidad || 1) + delta;
  if (item.cantidad <= 0) {
    carrito = carrito.filter(i => i.id !== idProducto);
  }
  guardarCarrito(carrito);
  mostrarCarrito();
}

// eliminar item
function eliminarDelCarrito(idProducto) {
  let carrito = leerCarrito().filter(i => i.id !== idProducto);
  guardarCarrito(carrito);
  mostrarCarrito();
}

// al cargar la página, renderizamos si existe el contenedor
document.addEventListener("DOMContentLoaded", mostrarCarrito);
