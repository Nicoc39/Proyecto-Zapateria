//// Este script permite agregar productos al carrito, guardarlos en localStorage y mostrarlos en pantalla.
// También muestra el total y permite vaciar todo el carrito con un botón.



// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarNotificacion(`"${nombre}" agregado al carrito`);
}

// Función para mostrar el carrito y el total
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const items = document.getElementById('carrito-items');
    const total = document.getElementById('carrito-total');
    items.innerHTML = '';
    let suma = 0;

    if (carrito.length === 0) {
        items.innerHTML = '<p>No hay productos en el carrito.</p>';
        total.textContent = '';
        return;
    }

    carrito.forEach(prod => {
        const div = document.createElement('div');
        div.className = "mb-2";
        div.textContent = `${prod.nombre} - $${prod.precio}`;
        items.appendChild(div);
        suma += prod.precio;
    });

    total.textContent = `Total: $${suma}`;
}

// Mostrar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);

// Vaciar el carrito al hacer clic en el botón
document.getElementById('vaciar-carrito').addEventListener('click', function() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
});

// Mensaje de notificación al agregar un producto al carrito
function mostrarNotificacion(mensaje) {
    const noti = document.getElementById('notificacion-carrito');
    noti.textContent = mensaje;
    noti.style.display = 'block';
    setTimeout(() => {
        noti.style.display = 'none';
    }, 1500); 
}

document.getElementById('finalizar-compra').addEventListener('click', function() {
    localStorage.removeItem('carrito'); // Vacía el carrito
    const items = document.getElementById('carrito-items');
    const total = document.getElementById('carrito-total');
    items.innerHTML = '<p style="color:green; font-weight:bold;">Gracias por su compra</p>';
    total.textContent = '';
});
