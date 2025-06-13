// =====================
// Script de catálogo de productos y filtrado
// =====================

// Variable global para almacenar todos los productos cargados
let productosGlobal = [];

// Renderiza el catálogo de productos en pantalla
function renderCatalogo(productos) {
    const catalogo = document.querySelector('.catalogo');
    let html = '';
    productos.forEach((producto, idx) => {
        // Usar el array de imágenes si existe, si no la imagen principal
        const imagenes = producto.imagenes || [producto.imagen];
        html += `
            <div class="producto" data-idx="${idx}">
                <img src="${imagenes[0]}" alt="${producto.nombre}" class="img-producto fade-img" data-idx="${idx}">
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
    catalogo.innerHTML = html;

    // Asignar eventos a los botones de cada producto
    productos.forEach((prod, index) => {
        document.querySelectorAll('.btn-agregar')[index].addEventListener('click', function() {
            agregarAlCarrito(prod.nombre, prod.precio, prod.imagen, prod.categoria);
        });
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

    // Efecto de transición de imágenes al hacer hover
    document.querySelectorAll('.producto').forEach((productoDiv, idx) => {
        const prod = productos[idx];
        const imagenes = prod.imagenes || [prod.imagen];
        if (imagenes.length > 1) {
            let imgElem = productoDiv.querySelector('img.img-producto');
            let current = 0;
            let interval = null;
            productoDiv.addEventListener('mouseenter', () => {
                interval = setInterval(() => {
                    current = (current + 1) % imagenes.length;
                    imgElem.classList.add('fade-out');
                    setTimeout(() => {
                        imgElem.src = imagenes[current];
                        imgElem.classList.remove('fade-out');
                    }, 200);
                }, 700);
            });
            productoDiv.addEventListener('mouseleave', () => {
                clearInterval(interval);
                current = 0;
                imgElem.classList.add('fade-out');
                setTimeout(() => {
                    imgElem.src = imagenes[0];
                    imgElem.classList.remove('fade-out');
                }, 200);
            });
        }
    });
}

// Al cargar la página, obtener productos y preparar filtros
// (filtrado por categoría y mostrar todos)
document.addEventListener('DOMContentLoaded', function() {
    fetch('JSONs/productos.json')
        .then(response => response.json())
        .then(productos => {
            productosGlobal = productos;
            renderCatalogo(productosGlobal);

            // Botones de filtro por categoría
            document.getElementById('btn-todos').addEventListener('click', function() {
                renderCatalogo(productosGlobal);
            });
            document.getElementById('btn-calzado').addEventListener('click', function() {
                renderCatalogo(productosGlobal.filter(p => p.categoria === 'calzado'));
            });
            document.getElementById('btn-carteras').addEventListener('click', function() {
                renderCatalogo(productosGlobal.filter(p => p.categoria === 'carteras'));
            });
        });
});

// Mensaje de consola para verificar la función de agregar al carrito
// (opcional, para debug)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof agregarAlCarrito !== "function") {
        console.error("agregarAlCarrito NO está definida");
    } else {
        console.log("agregarAlCarrito SÍ está definida");
    }
});

// Función auxiliar para obtener la clave de localStorage basada en el usuario
function getStorageKey(baseKey) {
    const usuario = JSON.parse(localStorage.getItem('usuario')) || { email: 'invitado' };
    return `${baseKey}_${usuario.email.replace(/[^a-zA-Z0-9]/g, '')}`;
}

// Función para agregar productos a favoritos y mostrar notificación
function agregarAFavoritos(producto) {
    try {
        let favoritos = JSON.parse(localStorage.getItem(getStorageKey('favoritos'))) || [];
        // Evita duplicados por nombre
        if (!favoritos.some(fav => fav.nombre === producto.nombre)) {
            favoritos.push(producto);
            localStorage.setItem(getStorageKey('favoritos'), JSON.stringify(favoritos));
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