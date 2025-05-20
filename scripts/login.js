//// Este script gestiona el login y registro de usuarios 
 

// Muestra el formulario de registro y oculta el de login
function mostrarRegistro() {
    document.getElementById('form-login').classList.add('d-none');
    document.getElementById('form-registro').classList.remove('d-none');
}

// Muestra el formulario de login y oculta el de registro
function mostrarLogin() {
    document.getElementById('form-registro').classList.add('d-none');
    document.getElementById('form-login').classList.remove('d-none');
}

// Evento para el envío del formulario de login
document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault(); 
    localStorage.setItem('usuarioLogueado', 'true'); 
    window.location.href = '../index.html'; 
});

// Evento para el envío del formulario de registro
document.getElementById('form-registro').addEventListener('submit', function(e) {
    e.preventDefault(); 

    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email-reg').value;
    const password = document.getElementById('password-reg').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica si el email ya está registrado
    const existe = usuarios.some(usuario => usuario.email === email);
    if (existe) {
        alert('Este correo ya está registrado.');
        return; 
    }


    const nuevoUsuario = { nombre, email, password };

    // Agrega el nuevo usuario al array
    usuarios.push(nuevoUsuario);

    // Guarda el array actualizado en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Marca al usuario como logueado y redirige al inicio
    localStorage.setItem('usuarioLogueado', 'true');
    window.location.href = '../index.html';
});