// Este script gestiona el estado de sesión del usuario y la visibilidad del menú de usuario y login.

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar menú de usuario según sesión
    const usuario = localStorage.getItem('usuario');
    const usuarioMenu = document.getElementById('usuario-menu');
    const loginMenu = document.getElementById('login-menu');
    if (usuario) {
        usuarioMenu.style.display = 'block';
        loginMenu.style.display = 'none';
    } else {
        usuarioMenu.style.display = 'none';
        loginMenu.style.display = 'block';
    }

    // Botón cerrar sesión
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', function() {
            localStorage.removeItem('usuario');
            location.reload();
        });
    }

    // Historial de compras (ejemplo)
    const btnHistorial = document.getElementById('btn-historial');
    if (btnHistorial) {
        btnHistorial.addEventListener('click', function() {
            const historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
            if (historial.length === 0) {
                Swal.fire('Historial de compras', 'No tienes compras realizadas.', 'info');
                return;
            }
            // Genera el HTML del historial
            const html = historial.map(compra => `
                <div style="margin-bottom:12px;">
                    <b>Fecha:</b> ${compra.fecha}<br>
                    <b>Usuario:</b> ${compra.usuario}<br>
                    <b>Productos:</b>
                    <ul style="margin-bottom:0;">
                        ${compra.productos.map(prod => `<li>${prod.nombre} - Talle ${prod.talle || '-'} - $${prod.precio.toLocaleString('es-AR')}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
            Swal.fire({
                title: 'Historial de compras',
                html: `<div style="max-height:300px;overflow:auto;text-align:left;">${html}</div>`,
                width: 500,
                showCloseButton: true,
                confirmButtonText: 'Cerrar'
            });
        });
    }

    // Favoritos (ejemplo)
    const btnFavoritos = document.getElementById('btn-favoritos');
    if (btnFavoritos) {
        btnFavoritos.addEventListener('click', function() {
            let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
            if (favoritos.length === 0) {
                Swal.fire('Favoritos', 'No tienes productos en favoritos.', 'info');
                return;
            }
            // Genera el HTML con botón de eliminar
            const html = favoritos.map((fav, idx) => `
                <div style="display:flex;align-items:center;margin-bottom:8px;">
                    <img src="${fav.imagen}" alt="${fav.nombre}" style="width:40px;height:40px;object-fit:cover;margin-right:10px;border-radius:5px;">
                    <span style="flex:1;">${fav.nombre} <br><small>$${fav.precio.toLocaleString('es-AR')}</small></span>
                    <button class="btn-eliminar-fav" data-index="${idx}" style="background:none;border:none;color:#e74c3c;font-size:1.2em;cursor:pointer;">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            `).join('');
            Swal.fire({
                title: 'Favoritos',
                html: html,
                width: 400,
                showCloseButton: true,
                confirmButtonText: 'Cerrar',
                didOpen: () => {
                    document.querySelectorAll('.btn-eliminar-fav').forEach(btn => {
                        btn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const idx = parseInt(this.getAttribute('data-index'));
                            favoritos.splice(idx, 1);
                            localStorage.setItem('favoritos', JSON.stringify(favoritos));
                            Swal.close();
                            // Vuelve a abrir la alerta para actualizar la lista
                            btnFavoritos.click();
                        });
                    });
                }
            });
        });
    }
});

// Si tienes botones "Agregar al carrito" y quieres que solo funcionen logueado:
function actualizarBotonesAgregar() {
    const logueado = !!localStorage.getItem('usuario');
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.disabled = !logueado;
        btn.title = logueado ? "" : "Debes iniciar sesión para agregar productos al carrito";
    });
}