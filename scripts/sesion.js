// Este script gestiona el estado de sesión del usuario y la visibilidad del menú de usuario y login.

document.addEventListener('DOMContentLoaded', function() {
    // Obtener usuario solo una vez
    const usuario = localStorage.getItem('usuario');

    // Mostrar/ocultar menú de usuario según sesión
    const usuarioMenu = document.getElementById('usuario-menu');
    const loginMenu = document.getElementById('login-menu');
    if (usuario) {
        if (usuarioMenu) usuarioMenu.style.display = 'block';
        if (loginMenu) loginMenu.style.display = 'none';
    } else {
        if (usuarioMenu) usuarioMenu.style.display = 'none';
        if (loginMenu) loginMenu.style.display = 'block';
    }

    // Mostrar/ocultar botón Carrito según sesión
    const btnCarrito = document.getElementById('btn-carrito');
    if (btnCarrito) {
        btnCarrito.style.display = usuario ? '' : 'none';
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
                Swal.fire('Mis compras', 'No tienes compras registradas.', 'info');
                return;
            }

            let html = '';
            historial.reverse().forEach((compra, idx) => {
                const total = compra.productos.reduce((acc, prod) => acc + prod.precio * (prod.cantidad || 1), 0);
                // Puedes cambiar el estado según tu lógica, aquí lo dejo fijo como ejemplo
                const estado = compra.estado || 'En preparación';
                html += `
                    <div style="border:1px solid #ccc; border-radius:8px; margin:18px 0; padding:16px; background:#fafafa;">
                        <b>Compra #${historial.length - idx}</b><br>
                        <b>Fecha:</b> ${compra.fecha}<br>
                        <b>Usuario:</b> ${compra.usuario}<br>
                        <b>Estado del envío:</b> ${estado}<br>
                        <b>Productos:</b>
                        <ul style="margin-bottom:8px;">
                            ${compra.productos.map(item => `<li>${item.nombre} x${item.cantidad || 1} - $${item.precio.toLocaleString('es-AR')}</li>`).join('')}
                        </ul>
                        <b>Importe total:</b> $${total.toLocaleString('es-AR')}
                    </div>
                `;
            });

            Swal.fire({
                title: 'Mis compras',
                html: html,
                width: 600,
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
                    <img src="${getRutaImagenFavorito(fav.imagen)}" alt="${fav.nombre}" style="width:40px;height:40px;object-fit:cover;border-radius:5px;">
                    <span style="flex:1; margin-left:10px;">${fav.nombre}</span>
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

function getRutaImagenFavorito(ruta) {
    if (ruta.startsWith('/') || ruta.startsWith('http')) return ruta;
    if (window.location.pathname.includes('/Paginas/')) {
        return '../' + ruta;
    }
    return ruta;
}