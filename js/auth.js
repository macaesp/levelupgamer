// ==================================
// FUNCIONES DE VALIDACIÓN Y ALMACENAMIENTO
// ==================================

// Validar correo para @duoc.cl, @profesor.duoc.cl o @gmail.com
function validarCorreo(correo) {
  return /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
}

// Validar RUN chileno simple (sin puntos ni guión)
function validarRun(run) {
  return /^[0-9]{7,8}[0-9kK]$/.test(run);
}

// Leer usuarios desde localStorage
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// Guardar usuarios en localStorage
function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// ==================================
// LÓGICA DE AUTENTICACIÓN
// ==================================
document.addEventListener("DOMContentLoaded", () => {
  // ----- Registro de usuario -----
  const formRegistro = document.querySelector("#formRegistro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", e => {
      e.preventDefault();

      const run = formRegistro.run.value.trim();
      const nombre = formRegistro.nombre.value.trim();
      const correo = formRegistro.correo.value.trim();
      const password = formRegistro.password.value.trim();

      // 1. Validaciones
      if (!validarRun(run)) return alert("RUN inválido (Ej: 19011022K)");
      if (!nombre) return alert("El nombre es obligatorio");
      if (!validarCorreo(correo)) return alert("Correo inválido");
      if (password.length < 4 || password.length > 10) {
        return alert("Contraseña entre 4 y 10 caracteres");
      }

      // 2. Obtener usuarios existentes
      let usuarios = obtenerUsuarios();
      
      // 3. Verificar si el usuario ya existe
      const usuarioExistente = usuarios.find(u => u.run === run);
      if (usuarioExistente) {
        return alert("Este RUN ya está registrado.");
      }

      // 4. Crear nuevo usuario y guardarlo
      usuarios.push({ run, nombre, correo, password });
      guardarUsuarios(usuarios);

      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
      formRegistro.reset();
    });
  }

  // ----- Inicio de sesión -----
  const formLogin = document.querySelector("#formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", e => {
      e.preventDefault();

      const run = formLogin.run.value.trim();
      const password = formLogin.password.value.trim();

      // 1. Obtener usuarios
      const usuarios = obtenerUsuarios();

      // 2. Buscar usuario por RUN
      const usuario = usuarios.find(u => u.run === run);

      // 3. Validar credenciales
      if (usuario && usuario.password === password) {
        alert(`¡Bienvenido, ${usuario.nombre}! Has iniciado sesión.`);
        // Aquí podrías redirigir al usuario a su página de inicio
        // window.location.href = "home.html";
      } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
      }
    });
  }
});