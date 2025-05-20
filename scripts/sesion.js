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
});