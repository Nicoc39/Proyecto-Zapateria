// scripts/carrito.js

// Array para almacenar los productos del carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    alert(`Producto "${nombre}" agregado al carrito.`);
    console.log("Carrito actual:", carrito);
}

// Función para mostrar el carrito y confirmar la compra
function mostrarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Crear un resumen de los productos en el carrito
    let resumen = "Desea comprar:\n";
    let total = 0;

    carrito.forEach(producto => {
        resumen += `- ${producto.nombre}: $${producto.precio}\n`;
        total += producto.precio;
    });

    resumen += `\nSu total es: $${total}`;

    const confirmar = confirm(resumen);

    if (confirmar) {
        // Si el usuario confirma, muestra un mensaje de éxito y vacía el carrito
        alert("Compra realizada con éxito.");
        carrito = [];
        console.log("Carrito vacío:", carrito);
    } else {
        // Si el usuario cancela, muestra un mensaje de cancelación
        alert("Compra cancelada.");
    }
}
