// =====================
// Script de login y registro de usuarios (simulado)
// =====================

// Al cargar la página, asigna eventos a los formularios de login y registro
document.addEventListener('DOMContentLoaded', function() {
    // Login
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            // Aquí podrías validar la contraseña, pero para simular solo guardamos el usuario
            localStorage.setItem('usuario', JSON.stringify({ email: email }));
            window.location.href = "../index.html";
        });
    }

    // Registro
    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email-reg').value.trim();
            // Aquí podrías guardar el usuario en una base de datos o localStorage
            localStorage.setItem('usuario', JSON.stringify({ nombre: nombre, email: email }));
            window.location.href = "../index.html";
        });
    }
});

// Funciones para mostrar/ocultar formularios de login y registro
function mostrarRegistro() {
    document.getElementById('form-login').classList.add('d-none');
    document.getElementById('form-registro').classList.remove('d-none');
}
function mostrarLogin() {
    document.getElementById('form-registro').classList.add('d-none');
    document.getElementById('form-login').classList.remove('d-none');
}