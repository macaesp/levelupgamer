# LevelUpGamer

Sitio web para la venta de videojuegos, consolas, periféricos y accesorios gamer.  
Incluye autenticación básica (registro/login), carrito de compras y administración sencilla.

---

## Funcionalidades principales

### Autenticación (auth.js)
- **Registro de usuarios** con `registrarUsuario(username, password)`
- **Inicio de sesión** con `loginUsuario(username, password)`
- **Cerrar sesión** con `logoutUsuario()`
- Manejo de usuarios con **LocalStorage**  
  ```js
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActivo", JSON.stringify(user));
Carrito
Agregar productos desde productos.html

Visualizar y eliminar productos en carrito.html

Carrito persistente con LocalStorage

Panel Admin
admin-ingreso-productos.html permite agregar productos de forma sencilla (simulado con LocalStorage).

Cómo usar
Clona o descarga el proyecto.
Abre html/home.html en tu navegador.

Para probar:
Regístrate en registro.html.
Inicia sesión en login.html.
Navega por productos y añade al carrito.
Administra productos desde admin-ingreso-productos.html.

Mejoras futuras
Reemplazar LocalStorage por base de datos real.
Integrar backend (Node.js, Spring, etc.).
Sistema de usuarios con roles (cliente/admin).
Pasarela de pagos.

Notas
El proyecto es 100% front-end (HTML, CSS y JS).
La autenticación y el carrito son simulados usando LocalStorage.
No requiere servidor ni base de datos para pruebas locales.
