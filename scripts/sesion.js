// Este script gestiona el estado de sesión del usuario y la visibilidad del botón "Carrito".

document.addEventListener('DOMContentLoaded', function() {
    const btnUsuario = document.getElementById('btn-usuario');
    const btnCarrito = document.getElementById('btn-carrito');
    if(localStorage.getItem('usuarioLogueado') === 'true') {
        btnUsuario.textContent = 'Cerrar sesión';
        btnUsuario.href = '#';
        btnUsuario.onclick = function(e) {
            e.preventDefault();
            localStorage.removeItem('usuarioLogueado');
            window.location.reload();
        }
        if(btnCarrito) btnCarrito.classList.remove('d-none');
    } else {
        btnUsuario.textContent = 'Iniciar Sesión';
        btnUsuario.href = 'Paginas/login.html';
        btnUsuario.onclick = null;
        if(btnCarrito) btnCarrito.classList.add('d-none');
    }

    // Deshabilita los botones "Agregar" si el usuario no está logueado
    const logueado = localStorage.getItem('usuarioLogueado') === 'true';
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.disabled = !logueado;
        if (!logueado) {
            btn.title = "Debes iniciar sesión para agregar productos al carrito";
        } else {
            btn.title = "";
        }
    });
});