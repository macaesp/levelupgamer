// Productos iniciales
const productos = [
  { id: 1, nombre: "Mouse Gamer RGB", precio: 19990, imagen: "img/mouse.jpg" },
  { id: 2, nombre: "Teclado Mecánico", precio: 45990, imagen: "img/teclado.jpg" },
  { id: 3, nombre: "Audífonos HyperX", precio: 35990, imagen: "img/audifonos.jpg" },
  { id: 4, nombre: "Silla Gamer", precio: 99990, imagen: "img/silla.jpg" }
];

function mostrarProductos() {
  const contenedor = document.querySelector("#lista-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" alt="${p.nombre}">
        <p class="titulo">${p.nombre}</p>
        <p class="precio">$${p.precio}</p>
        <button onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
