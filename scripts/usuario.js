const usuarios = []; // Ahora es accesible globalmente

document.addEventListener('DOMContentLoaded', () => {
    // Función para mostrar un formulario de ingreso
    function mostrarFormularioIngreso() {
        const email = prompt("Ingrese su correo electrónico:");
        const password = prompt("Ingrese su contraseña:");

        const usuario = usuarios.find(user => user.email === email && user.password === password);
        if (usuario) {
            alert(`Bienvenido, ${usuario.nombre}!`);
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    }

    // Función para mostrar un formulario de registro
    function mostrarFormularioRegistro() {
        const nombre = prompt("Ingrese su nombre:");
        const email = prompt("Ingrese su correo electrónico:");
        const password = prompt("Cree una contraseña:");

        const usuarioExistente = usuarios.find(user => user.email === email);
        if (usuarioExistente) {
            alert("Este correo ya está registrado.");
        } else {
            usuarios.push({ nombre, email, password });
            alert("Usuario registrado con éxito.");
            console.log("Usuarios registrados:", usuarios); // Muestra los usuarios en la consola
        }
    }

    // Eventos para los botones
    document.getElementById('btn-ingresar').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarFormularioIngreso();
    });

    document.getElementById('btn-registrarse').addEventListener('click', (e) => {
        e.preventDefault();
        mostrarFormularioRegistro();
    });
});
