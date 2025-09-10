// Productos iniciales
const productos = [
  {id: 1,nombre: "Mouse Gamer Logitech",precio: 14990,descripcion:"",imagen: "img/mousegamerlogi.png"},
  {id: 2,nombre: "Teclado Mecánico",precio: 45990,descripcion:"",imagen: "img/tecladogamer1.jpg"},
  {id: 3,nombre: "Audífonos HyperX",precio: 35990,descripcion:"",imagen: "img/audifonosgamer1.png"},
  {id: 4,nombre: "Silla Gamer",precio: 99990,descripcion:"",imagen: "img/sillagamer.png"}
]

function mostrarProductos() {
  const contenedor = document.querySelector("#lista-productos .productos-g")
  if (!contenedor) return

  contenedor.innerHTML = productos
    .map(
      (producto) => `
    <div class="producto">
      <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 8px;">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio.toLocaleString()}</p>
    </div>
  `,
    )
    .join("")
}

document.addEventListener("DOMContentLoaded", mostrarProductos)
