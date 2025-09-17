// ================================
// FUNCIONES AUXILIARES
// ================================

// Validar correos permitidos
function validarCorreo(correo) {
  return /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
}

// Validar RUN chileno simple (sin puntos ni guión)
function validarRun(run) {
  return /^[0-9]{7,8}[0-9kK]$/.test(run);
}

// ================================
// VALIDACIÓN FORMULARIOS DE TIENDA
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // ----- Registro -----
  const formRegistro = document.querySelector("#formRegistro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = formRegistro.nombre.value.trim();
      const correo = formRegistro.correo.value.trim();
      const password = formRegistro.password.value.trim();

      if (!nombre) return alert("El nombre es obligatorio");
      if (!validarCorreo(correo)) return alert("Correo inválido");
      if (password.length < 4 || password.length > 10) {
        return alert("Contraseña entre 4 y 10 caracteres");
      }

      alert("Registro exitoso ✅");
      formRegistro.reset();
    });
  }

  // ----- Login -----
  const formLogin = document.querySelector("#formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", e => {
      e.preventDefault();
      const correo = formLogin.correo.value.trim();
      const password = formLogin.password.value.trim();

      if (!validarCorreo(correo)) return alert("Correo inválido");
      if (password.length < 4 || password.length > 10) {
        return alert("Contraseña inválida");
      }

      alert("Inicio de sesión exitoso 🔑");
    });
  }

  // ----- Contacto -----
  const formContacto = document.querySelector("#formContacto");
  if (formContacto) {
    formContacto.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = formContacto.nombre.value.trim();
      const correo = formContacto.correo.value.trim();
      const comentario = formContacto.comentario.value.trim();

      if (!nombre) return alert("El nombre es obligatorio");
      if (!validarCorreo(correo)) return alert("Correo inválido");
      if (!comentario || comentario.length > 500) {
        return alert("Comentario requerido (máx. 500)");
      }

      alert("Mensaje enviado ✅");
      formContacto.reset();
    });
  }
});

 
// CRUD ADMIN PRODUCTOS


// Obtener y guardar productos en localStorage
function obtenerProductosAdmin() {
  return JSON.parse(localStorage.getItem("productosAdmin")) || [];
}
function guardarProductosAdmin(lista) {
  localStorage.setItem("productosAdmin", JSON.stringify(lista));
}

// Mostrar productos en tabla
function mostrarProductosAdmin() {
  const tabla = document.querySelector("#tablaProductos tbody");
  if (!tabla) return;

  let lista = obtenerProductosAdmin();
  tabla.innerHTML = "";

  lista.forEach(p => {
    tabla.innerHTML += `
      <tr>
        <td>${p.codigo}</td>
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td>${p.stock}</td>
        <td>${p.categoria}</td>
        <td>
          <button onclick="editarProductoAdmin('${p.codigo}')">✏️</button>
          <button onclick="eliminarProductoAdmin('${p.codigo}')">❌</button>
        </td>
      </tr>
    `;
  });
}

// Eliminar producto
function eliminarProductoAdmin(codigo) {
  let lista = obtenerProductosAdmin().filter(p => p.codigo !== codigo);
  guardarProductosAdmin(lista);
  mostrarProductosAdmin();
}

// Editar producto (carga en formulario)
function editarProductoAdmin(codigo) {
  let lista = obtenerProductosAdmin();
  let prod = lista.find(p => p.codigo === codigo);

  if (prod) {
    formProducto.codigo.value = prod.codigo;
    formProducto.nombre.value = prod.nombre;
    formProducto.precio.value = prod.precio;
    formProducto.stock.value = prod.stock;
    formProducto.categoria.value = prod.categoria;
  }
}

// ================================
// CRUD ADMIN USUARIOS
// ================================

function obtenerUsuariosAdmin() {
  return JSON.parse(localStorage.getItem("usuariosAdmin")) || [];
}
function guardarUsuariosAdmin(lista) {
  localStorage.setItem("usuariosAdmin", JSON.stringify(lista));
}

function mostrarUsuariosAdmin() {
  const tabla = document.querySelector("#tablaUsuarios tbody");
  if (!tabla) return;

  let lista = obtenerUsuariosAdmin();
  tabla.innerHTML = "";

  lista.forEach(u => {
    tabla.innerHTML += `
      <tr>
        <td>${u.run}</td>
        <td>${u.nombre} ${u.apellidos}</td>
        <td>${u.correo}</td>
        <td>${u.tipo}</td>
        <td>
          <button onclick="editarUsuarioAdmin('${u.run}')">✏️</button>
          <button onclick="eliminarUsuarioAdmin('${u.run}')">❌</button>
        </td>
      </tr>
    `;
  });
}

function eliminarUsuarioAdmin(run) {
  let lista = obtenerUsuariosAdmin().filter(u => u.run !== run);
  guardarUsuariosAdmin(lista);
  mostrarUsuariosAdmin();
}

function editarUsuarioAdmin(run) {
  let lista = obtenerUsuariosAdmin();
  let usuario = lista.find(u => u.run === run);

  if (usuario) {
    formUsuario.run.value = usuario.run;
    formUsuario.nombre.value = usuario.nombre;
    formUsuario.apellidos.value = usuario.apellidos;
    formUsuario.correo.value = usuario.correo;
    formUsuario.tipo.value = usuario.tipo;
  }
}

// ================================
// INICIALIZAR FORMULARIOS ADMIN
// ================================
document.addEventListener("DOMContentLoaded", () => {
  // ----- Form Producto -----
  const formProducto = document.querySelector("#formProducto");
  if (formProducto) {
    formProducto.addEventListener("submit", e => {
      e.preventDefault();
      const codigo = formProducto.codigo.value.trim();
      const nombre = formProducto.nombre.value.trim();
      const precio = parseFloat(formProducto.precio.value);
      const stock = parseInt(formProducto.stock.value);
      const categoria = formProducto.categoria.value;

      if (codigo.length < 3) return alert("El código debe tener al menos 3 caracteres");
      if (!nombre) return alert("El nombre es obligatorio");
      if (isNaN(precio) || precio < 0) return alert("El precio debe ser válido");
      if (isNaN(stock) || stock < 0) return alert("El stock debe ser válido");
      if (!categoria) return alert("Debe seleccionar una categoría");

      let lista = obtenerProductosAdmin();
      const index = lista.findIndex(p => p.codigo === codigo);

      if (index >= 0) {
        lista[index] = { codigo, nombre, precio, stock, categoria };
        alert("Producto actualizado ✏️✅");
      } else {
        lista.push({ codigo, nombre, precio, stock, categoria });
        alert("Producto guardado ✅");
      }

      guardarProductosAdmin(lista);
      formProducto.reset();
      mostrarProductosAdmin();
    });

    mostrarProductosAdmin();
  }

  // ----- Form Usuario -----
  const formUsuario = document.querySelector("#formUsuario");
  if (formUsuario) {
    formUsuario.addEventListener("submit", e => {
      e.preventDefault();
      const run = formUsuario.run.value.trim();
      const nombre = formUsuario.nombre.value.trim();
      const apellidos = formUsuario.apellidos.value.trim();
      const correo = formUsuario.correo.value.trim();
      const tipo = formUsuario.tipo.value;

      if (!validarRun(run)) return alert("RUN inválido (Ej: 19011022K)");
      if (!nombre) return alert("El nombre es obligatorio");
      if (!apellidos) return alert("Los apellidos son obligatorios");
      if (!validarCorreo(correo)) return alert("Correo inválido");
      if (!tipo) return alert("Debe seleccionar un tipo de usuario");

      let lista = obtenerUsuariosAdmin();
      const index = lista.findIndex(u => u.run === run);

      if (index >= 0) {
        lista[index] = { run, nombre, apellidos, correo, tipo };
        alert("Usuario actualizado ✏️✅");
      } else {
        lista.push({ run, nombre, apellidos, correo, tipo });
        alert("Usuario guardado ✅");
      }

      guardarUsuariosAdmin(lista);
      formUsuario.reset();
      mostrarUsuariosAdmin();
    });

    mostrarUsuariosAdmin();
  }
});
