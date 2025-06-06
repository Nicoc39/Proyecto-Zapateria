document.addEventListener('DOMContentLoaded', function() {
    fetch('JSONs/productos.json')
        .then(response => response.json())
        .then(productos => {
            const catalogo = document.querySelector('.catalogo');
            catalogo.innerHTML = '';
            productos.forEach(prod => {
                const div = document.createElement('div');
                div.className = "producto";
                div.innerHTML = `
                    <img src="${prod.imagen}" alt="${prod.nombre}" class="img-producto">
                    <h3>${prod.nombre}</h3>
                    <p>Precio: $${prod.precio.toLocaleString('es-AR')}</p>
                        <div class="acciones-producto" style="display:flex; gap:8px;">
                        <button class="btn-agregar" title="Agregar al carrito">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </button>
                        <button class="btn-favorito" title="Agregar a Favoritos">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                `;
                catalogo.appendChild(div);

                // Evento para agregar al carrito con selección de talle
                div.querySelector('.btn-agregar').addEventListener('click', function() {
                    agregarAlCarrito(prod.nombre, prod.precio, prod.imagen);
                });

                // Evento para agregar a favoritos
                div.querySelector('.btn-favorito').addEventListener('click', function() {
                    agregarAFavoritos(prod);
                });
            });
            if (typeof actualizarBotonesAgregar === "function") {
                actualizarBotonesAgregar();
            }
        });
});

// Función para agregar a favoritos
function agregarAFavoritos(producto) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    // Evita duplicados por nombre
    if (!favoritos.some(fav => fav.nombre === producto.nombre)) {
        favoritos.push(producto);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        Swal.fire('¡Agregado a Favoritos!', producto.nombre, 'success');
    } else {
        Swal.fire('Ya está en Favoritos', producto.nombre, 'info');
    }
}