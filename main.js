console.log(" main.js está conectado correctamente");


// DATASET DE PRUEBA 

const productos = [
  { 
    id: 1, 
    nombre: "Mouse Gamer RGB", 
    precio: 19990, 
    imagen: "img/mouse.jpg",
    descripcion: "Mouse gamer con sensor óptico 16000 DPI e iluminación RGB." 
  },
  { 
    id: 2, 
    nombre: "Teclado Mecánico Redragon", 
    precio: 45990, 
    imagen: "img/teclado.jpg",
    descripcion: "Teclado mecánico retroiluminado con switches azules." 
  }
];


// FUNCIÓN PARA MOSTRAR PRODUCTOS

function mostrarProductos() {
  const contenedor = document.querySelector("#lista-productos");
  if (!contenedor) {
    console.log("⚠️ No encontré el contenedor #lista-productos");
    return;
  }

  contenedor.innerHTML = "";
  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" alt="${p.nombre}">
        <p class="titulo">${p.nombre}</p>
        <p class="precio">$${p.precio.toLocaleString("es-CL")}</p>
        <p class="descripcion">${p.descripcion}</p>
        <a href="detalle-producto.html?id=${p.id}">
          <button>Ver Detalle</button>
        </a>
        <button onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", mostrarProductos);
