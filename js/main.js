// Productos iniciales
const productos = [
  {id: 1,nombre: "Catan",precio: 29990,descripcion:"",imagen: "img/catan.jpg"},
  {id: 2,nombre: "Carcassonne",precio: 24990,descripcion:"",imagen: "img/carcassonne.jpg"},
  {id: 3,nombre: "PlayStation 5",precio: 549990,descripcion:"",imagen: "img/D_Q_NP_883946-MLA79964406701_102024-O.png"},
  {id: 4,nombre: "Control Xbox Series X",precio: 59990,descripcion:"",imagen: "img/purpleeee.png"},
  {id: 5,nombre: "Audifonos Gamer HyperX Cloud II",precio: 79990,descripcion:"",imagen: "img/sillagamer.png"},
  {id: 6,nombre: "Mouse Gamer RGB",precio: 49990,descripcion:"",imagen: "img/mouse.png"},
  {id: 7,nombre: "Mousepad Razer Goliathus Extended Chroma",precio: 29990,descripcion:"",imagen: "img/rv5qxhyd_523dddfd_thumbnail_512.jpg"},
  {id: 8,nombre: "PC Gamer ASUS ROG Strix",precio: 1299990,descripcion:"",imagen: "img/52.png"},
  {id: 9,nombre: "Silla Gamer Secretlab Titan",precio: 349990,descripcion:"",imagen: "img/410uYasNqFL._AC_SL1000_.jpg"},
  {id: 10,nombre: "Polera Gamer Personaliazda Level-Up",precio: 14990,descripcion:"",imagen: "img/poleragamerlevelup.PNG"}
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

