document.addEventListener('DOMContentLoaded', function() {
    fetch('JSONs/productos.json')
        .then(response => response.json())
        .then(productos => {
            const catalogo = document.querySelector('.catalogo');
            catalogo.innerHTML = '';
            let html = ''; // Variable para almacenar el HTML de los productos
            productos.forEach(producto => {
                html += `
                    <div class="producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: $${producto.precio.toLocaleString('es-AR')}</p>
                        <div class="acciones-producto" style="display:flex; gap:8px;">
                            <button class="btn-agregar" title="Agregar al carrito">
                                <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                            <button class="btn-favorito" title="Agregar a Favoritos" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">
                                <i class="fa-solid fa-heart"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
            catalogo.innerHTML = html; // Insertar todo el HTML de una vez

            // Agregar eventos después de que se haya actualizado el HTML
            productos.forEach((prod, index) => {
                // Evento para agregar al carrito
                document.querySelectorAll('.btn-agregar')[index].addEventListener('click', function() {
                    agregarAlCarrito(prod.nombre, prod.precio, prod.imagen);
                });

                // Evento para agregar a favoritos
                document.querySelectorAll('.btn-favorito')[index].addEventListener('click', function() {
                    const nombre = this.getAttribute('data-nombre');
                    const precio = parseFloat(this.getAttribute('data-precio'));
                    const imagen = this.getAttribute('data-imagen');
                    agregarAFavoritos({ nombre, precio, imagen });
                });
            });

            if (typeof actualizarBotonesAgregar === "function") {
                actualizarBotonesAgregar();
            }
        });
});

document.addEventListener('DOMContentLoaded', function() {
    if (typeof agregarAlCarrito !== "function") {
        console.error("agregarAlCarrito NO está definida");
    } else {
        console.log("agregarAlCarrito SÍ está definida");
    }
});

// Función para agregar a favoritos
function agregarAFavoritos(producto) {
    try {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        // Evita duplicados por nombre
        if (!favoritos.some(fav => fav.nombre === producto.nombre)) {
            favoritos.push(producto);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            Swal.fire({
                icon: 'success',
                title: '¡Agregado a Favoritos!',
                text: producto.nombre,
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Ya está en Favoritos',
                text: producto.nombre,
                timer: 1500,
                showConfirmButton: false
            });
        }
    } catch (error) {
        console.error('Error al agregar a favoritos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar a favoritos. Por favor, intenta nuevamente.'
        });
    }
}