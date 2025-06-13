// =====================
// Script de gestión de sesión de usuario, historial y favoritos
// =====================

// Al cargar la página, gestiona visibilidad de menús según sesión
// y asigna eventos a botones de usuario

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

    // Función auxiliar para obtener la clave de localStorage basada en el usuario
    function getStorageKey(baseKey) {
        const usuario = JSON.parse(localStorage.getItem('usuario')) || { email: 'invitado' };
        return `${baseKey}_${usuario.email.replace(/[^a-zA-Z0-9]/g, '')}`;
    }

    // =====================
    // HISTORIAL DE COMPRAS
    // =====================
    const btnHistorial = document.getElementById('btn-historial');
    if (btnHistorial) {
        btnHistorial.addEventListener('click', function() {
            const historial = JSON.parse(localStorage.getItem(getStorageKey('historialCompras'))) || [];
            if (historial.length === 0) {
                Swal.fire('Mis compras', 'No tienes compras registradas.', 'info');
                return;
            }

            let html = '<div style="max-width:400px;margin:auto;">';
            historial.reverse().forEach((compra, idx) => {
                const total = compra.productos.reduce((acc, prod) => acc + prod.precio * (prod.cantidad || 1), 0);
                const estado = compra.estado || 'En preparación';
                // Calcular recargo si corresponde
                let precioUnitarioMultiplicador = 1;
                if (compra.metodo === 'Credito' && compra.recargo) {
                    precioUnitarioMultiplicador = 1 + (compra.recargo || 0);
                }
                const resumenProductos = compra.productos.map(item => {
                    let precioActualizado = Math.round(item.precio * precioUnitarioMultiplicador);
                    return `${item.nombre} x${item.cantidad || 1} - $${precioActualizado.toLocaleString('es-AR')}`;
                }).join('<br>');
                html += `
                    <div style="background:#fff; border:1px solid #e0e0e0; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.06); margin-bottom:16px; padding:0;">
                        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e0e0e0; padding:8px 16px 4px 16px;">
                            <span style="color:#444; font-weight:500;">Compra #${historial.length - idx}</span>
                            <span style="color:#888; font-size:0.95em;">${compra.fecha}</span>
                        </div>
                        <div style="padding:12px 16px 0 16px; text-align:center;">
                            <div><b>Usuario:</b> ${compra.usuario}</div>
                            <div><b>Estado del envío:</b> ${estado}</div>
                            ${compra.numeroPedido ? `<div><b>Número de pedido:</b> #${compra.numeroPedido}</div>` : ''}
                            <div style=\"background:#f7f7fa; border-radius:7px; margin:12px 0 8px 0; padding:8px;\">
                                <b>Productos:</b><br>
                                ${resumenProductos}
                            </div>
                            ${compra.costoEnvio ? `<div style=\"text-align:center; margin:0 0 8px 0;\"><b>Costo de envío:</b> $${compra.costoEnvio.toLocaleString('es-AR')}</div>` : ''}
                        </div>
                        <div style="border-top:1px solid #e0e0e0; padding:8px 16px 8px 0; text-align:right;">
                            <b>Importe total: $${(total * precioUnitarioMultiplicador + (compra.costoEnvio || 0)).toLocaleString('es-AR')}</b>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            Swal.fire({
                title: '<span style="color:#444; font-weight:600;">Mis compras</span>',
                html: html,
                width: 450,
                background: '#fafbfc',
                confirmButtonText: '<span style="padding: 0 32px;">Cerrar</span>',
                customClass: { popup: 'swal2-miscompras-popup' }
            });
        });
    }

    // =====================
    // FAVORITOS
    // =====================
    const btnFavoritos = document.getElementById('btn-favoritos');
    if (btnFavoritos) {
        btnFavoritos.addEventListener('click', function() {
            const favoritos = JSON.parse(localStorage.getItem(getStorageKey('favoritos'))) || [];
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
                            localStorage.setItem(getStorageKey('favoritos'), JSON.stringify(favoritos));
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

// Deshabilita los botones de agregar al carrito y favoritos si no hay usuario logueado
function actualizarBotonesAgregar() {
    const logueado = !!localStorage.getItem('usuario');
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.disabled = !logueado;
        btn.title = logueado ? "" : "Debes iniciar sesión para agregar productos al carrito";
    });
    document.querySelectorAll('.btn-favorito').forEach(btn => {
        btn.disabled = !logueado;
        btn.title = logueado ? "" : "Debes iniciar sesión para agregar productos a favoritos";
        if (!logueado) {
            btn.onclick = function() {
                Swal.fire({
                    icon: 'warning',
                    title: 'Debes iniciar sesión',
                    text: 'Inicia sesión para agregar productos a favoritos.',
                    confirmButtonText: 'Aceptar',
                    timer: 1500,
                    showConfirmButton: true
                });
            };
        } else {
            btn.onclick = null;
        }
    });
}

// Devuelve la ruta correcta para mostrar imágenes en favoritos
function getRutaImagenFavorito(ruta) {
    if (ruta.startsWith('/') || ruta.startsWith('http')) return ruta;
    if (window.location.pathname.includes('/Paginas/')) {
        return '../' + ruta;
    }
    return ruta;
}