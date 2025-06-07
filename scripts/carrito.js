//// Este script permite agregar productos al carrito, guardarlos en localStorage y mostrarlos en pantalla.
// También muestra el total y permite vaciar todo el carrito con un botón.

console.log('carrito.js correcto y actualizado');
window.agregarAlCarrito = agregarAlCarrito;

function agregarAlCarrito(nombre, precio, imagen) {
    Swal.fire({
        title: 'Selecciona el talle',
        input: 'select',
        inputOptions: {
            36: '36', 37: '37', 38: '38', 39: '39', 40: '40', 41: '41', 42: '42'
        },
        inputPlaceholder: 'Elige un talle',
        showCancelButton: true,
        confirmButtonText: 'Agregar al carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push({ nombre, precio, imagen, talle: result.value });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarNotificacion('Producto agregado al carrito');
            mostrarCarrito();
        }
    });
}

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

    let html = ''; // Nueva variable para construir el HTML
    carrito.forEach((prod, idx) => {
        html += `
            <div class="carrito-item" style="display:flex;align-items:center;margin-bottom:10px;">
                <img src="${getRutaImagenFavorito(prod.imagen)}" alt="${prod.nombre}" style="width:50px;height:50px;object-fit:cover;margin-right:10px;border-radius:5px;">
                <div style="display:flex;flex-direction:column;">
                    <div style="display:flex;align-items:center;">
                        <span style="font-weight:bold;">${prod.nombre}</span>
                        <button class="btn-eliminar-carrito" data-index="${idx}" style="background:none;border:none;color:#e74c3c;font-size:1.2em;cursor:pointer;margin-left:8px;">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <span style="font-size:0.95em;color:#555;">Talle: ${prod.talle || '-'}</span>
                    <span style="font-size:0.95em;color:#555;">Precio: $${prod.precio.toLocaleString('es-AR')}</span>
                </div>
            </div>
        `;
        suma += prod.precio;
    });

    items.innerHTML = html; // Asigna el HTML construido
    total.textContent = `Total: $${suma.toLocaleString('es-AR')}`;

    // Asigna el evento a los botones "Eliminar"
    document.querySelectorAll('.btn-eliminar-carrito').forEach(btn => {
        btn.addEventListener('click', function() {
            quitarDelCarrito(this.getAttribute('data-index'));
        });
    });
}

// Nueva función para quitar un producto del carrito
function quitarDelCarrito(indice) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(indice, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
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
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'Agrega productos al carrito antes de comprar.'
        });
        return;
    }

    let suma = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    const datosGuardados = JSON.parse(localStorage.getItem('datosEnvio') || '{}');
    const ciudades = datosGuardados.ciudad ? [datosGuardados.ciudad] : [];
    const direcciones = datosGuardados.direccion ? [datosGuardados.direccion] : [];
    const alturas = datosGuardados.altura ? [datosGuardados.altura] : [];

    Swal.fire({
        title: 'Datos de envío',
        html: `
            <select id="swal-provincia" class="swal2-input">
                <option value="" disabled selected>Selecciona provincia</option>
                <option value="Buenos Aires">Buenos Aires</option>
                <option value="CABA">CABA</option>
                <option value="Chaco">Chaco</option>
                <option value="Chubut">Chubut</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Corrientes">Corrientes</option>
                <option value="Entre Ríos">Entre Ríos</option>
                <option value="Formosa">Formosa</option>
                <option value="Jujuy">Jujuy</option>
                <option value="La Pampa">La Pampa</option>
                <option value="La Rioja">La Rioja</option>
                <option value="Mendoza">Mendoza</option>
                <option value="Misiones">Misiones</option>
                <option value="Neuquén">Neuquén</option>
                <option value="Río Negro">Río Negro</option>
                <option value="Salta">Salta</option>
                <option value="San Juan">San Juan</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Santiago del Estero">Santiago del Estero</option>
                <option value="Tierra del Fuego">Tierra del Fuego</option>
                <option value="Tucumán">Tucumán</option>
            </select>
            <input id="swal-ciudad" class="swal2-input" placeholder="Ciudad" list="ciudades-list">
            <datalist id="ciudades-list">
                ${ciudades.map(c => `<option value="${c}">`).join('')}
            </datalist>
            <input id="swal-direccion" class="swal2-input" placeholder="Dirección" list="direcciones-list">
            <datalist id="direcciones-list">
                ${direcciones.map(d => `<option value="${d}">`).join('')}
            </datalist>
            <input id="swal-altura" class="swal2-input" placeholder="Altura" list="alturas-list">
            <datalist id="alturas-list">
                ${alturas.map(a => `<option value="${a}">`).join('')}
            </datalist>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const provincia = document.getElementById('swal-provincia').value;
            const ciudad = document.getElementById('swal-ciudad').value;
            const direccion = document.getElementById('swal-direccion').value;
            const altura = document.getElementById('swal-altura').value;
            if (!provincia || !ciudad || !direccion || !altura) {
                Swal.showValidationMessage('Completa todos los campos');
                return false;
            }
            localStorage.setItem('datosEnvio', JSON.stringify({ provincia, ciudad, direccion, altura }));
            return { provincia, ciudad, direccion, altura };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const provincia = result.value.provincia;
            const ciudad = result.value.ciudad;

            const costosEnvio = {
                "Buenos Aires": { costo: 2500, dias: 2 },
                "CABA": { costo: 2000, dias: 1 },
                "Córdoba": { costo: 3000, dias: 3 },
                "Santa Fe": { costo: 3200, dias: 3 },
                "default": { costo: 4000, dias: 5 }
            };

            const envio = costosEnvio[provincia] || costosEnvio["default"];

            Swal.fire({
                title: 'Costo y tiempo de envío',
                html: `
                    <p><b>Provincia:</b> ${provincia}</p>
                    <p><b>Ciudad:</b> ${ciudad}</p>
                    <p><b>Costo de envío:</b> $${envio.costo.toLocaleString('es-AR')}</p>
                    <p><b>Tiempo estimado de entrega:</b> ${envio.dias} días hábiles</p>
                `,
                confirmButtonText: 'Continuar con el pago'
            }).then(() => {
                Swal.fire({
                    title: 'Método de pago',
                    html: `
                        <select id="swal-metodo" class="swal2-input">
                            <option value="" disabled selected>Selecciona método</option>
                            <option value="Debito">Débito</option>
                            <option value="Credito">Crédito</option>
                        </select>
                        <label for="swal-nombre" style="display:block;text-align:left;margin:8px 0 2px 2px;">Nombre y Apellido</label>
                        <input id="swal-nombre" class="swal2-input" type="text" placeholder="Tal como figura en la Tarjeta">
                        <label for="swal-tarjeta" style="display:block;text-align:left;margin:8px 0 2px 2px;">Número de tarjeta</label>
                        <input id="swal-tarjeta" class="swal2-input" type="text" maxlength="19" placeholder="0000 0000 0000 0000">
                        <label for="swal-vto" style="display:block;text-align:left;margin:8px 0 2px 2px;">Fecha de Vencimiento <span style="font-size:0.9em;"></span></label>
                        <input id="swal-vto" class="swal2-input" type="text" maxlength="5" placeholder="MM/AA">
                        <label for="swal-cvv" style="display:block;text-align:left;margin:8px 0 2px 2px;">Código de seguridad</label>
                        <input id="swal-cvv" class="swal2-input" type="text" maxlength="3" placeholder="***">
                        <div id="cuotas-container"></div>
                    `,
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'Finalizar compra',
                    cancelButtonText: 'Cancelar',
                    didOpen: () => {
                        // Formateo automático para número de tarjeta
                        const tarjeta = document.getElementById('swal-tarjeta');
                        tarjeta.addEventListener('input', function(e) {
                            let value = tarjeta.value.replace(/\D/g, '').substring(0,16);
                            value = value.replace(/(.{4})/g, '$1 ').trim();
                            tarjeta.value = value;
                        });
                        // Formateo automático para fecha de vto
                        const vto = document.getElementById('swal-vto');
                        vto.addEventListener('input', function(e) {
                            let value = vto.value.replace(/\D/g, '').substring(0,4);
                            // Formato MM/AA
                            if (value.length > 2) value = value.substring(0,2) + '/' + value.substring(2,4);
                            vto.value = value;
                        });
                        vto.addEventListener('blur', function() {
                            // Validación de mes y año al salir del campo
                            const parts = vto.value.split('/');
                            if (parts.length === 2) {
                                let mes = parseInt(parts[0], 10);
                                let anio = parseInt(parts[1], 10);
                                if (isNaN(mes) || mes < 1 || mes > 12) {
                                    vto.value = '';
                                    Swal.showValidationMessage('El mes debe estar entre 01 y 12');
                                }
                                if (isNaN(anio) || anio < 25) {
                                    vto.value = '';
                                    Swal.showValidationMessage('El año debe ser igual o mayor a 25');
                                }
                            }
                        });
                        // Solo números para CVV
                        const cvv = document.getElementById('swal-cvv');
                        cvv.addEventListener('input', function(e) {
                            cvv.value = cvv.value.replace(/\D/g, '').substring(0,3);
                        });

                        // Nombre y Apellido en mayúsculas siempre
                        const nombre = document.getElementById('swal-nombre');
                        nombre.addEventListener('input', function(e) {
                            nombre.value = nombre.value.toUpperCase();
                        });

                        // Mostrar cuotas solo si se selecciona Crédito
                        const metodo = document.getElementById('swal-metodo');
                        const cuotasContainer = document.getElementById('cuotas-container');
                        metodo.addEventListener('change', function() {
                            if (metodo.value === 'Credito') {
                                // Calcula cuotas
                                const total = suma;
                                const cuotas1 = total;
                                const cuotas3 = Math.round((total * 1.05) / 3);
                                const total3 = Math.round(total * 1.05);
                                const cuotas6 = Math.round((total * 1.10) / 6);
                                const total6 = Math.round(total * 1.10);
                                const cuotas12 = Math.round((total * 1.15) / 12);
                                const total12 = Math.round(total * 1.15);
                                cuotasContainer.innerHTML = `
                                    <label for="swal-cuotas" style="display:block;text-align:left;margin:8px 0 2px 2px;">CUOTAS</label>
                                    <select id="swal-cuotas" class="swal2-input">
                                        <option value="1">1 cuota de $${cuotas1.toLocaleString('es-AR')} (total $${cuotas1.toLocaleString('es-AR')})</option>
                                        <option value="3">3 cuotas de $${cuotas3.toLocaleString('es-AR')} (total $${total3.toLocaleString('es-AR')})</option>
                                        <option value="6">6 cuotas de $${cuotas6.toLocaleString('es-AR')} (total $${total6.toLocaleString('es-AR')})</option>
                                        <option value="12">12 cuotas de $${cuotas12.toLocaleString('es-AR')} (total $${total12.toLocaleString('es-AR')})</option>
                                    </select>
                                `;
                            } else {
                                cuotasContainer.innerHTML = '';
                            }
                        });
                    },
                    preConfirm: () => {
                        const metodo = document.getElementById('swal-metodo').value;
                        const nombre = document.getElementById('swal-nombre').value.trim();
                        const tarjeta = document.getElementById('swal-tarjeta').value.replace(/\s/g, '');
                        const vto = document.getElementById('swal-vto').value;
                        const cvv = document.getElementById('swal-cvv').value;
                        let cuotas = null;
                        if (!metodo || !nombre || !tarjeta || !vto || !cvv) {
                            Swal.showValidationMessage('Completa todos los campos');
                            return false;
                        }
                        if (tarjeta.length !== 16) {
                            Swal.showValidationMessage('El número de tarjeta debe tener 16 dígitos');
                            return false;
                        }
                        if (!/^\d{2}\/\d{2}$/.test(vto)) {
                            Swal.showValidationMessage('La fecha de vto debe tener el formato mm/aa');
                            return false;
                        }
                        const [mes, anio] = vto.split('/').map(Number);
                        if (mes < 1 || mes > 12) {
                            Swal.showValidationMessage('El mes debe estar entre 01 y 12');
                            return false;
                        }
                        if (anio < 25) {
                            Swal.showValidationMessage('El año debe ser igual o mayor a 25');
                            return false;
                        }
                        if (metodo === 'Credito') {
                            cuotas = document.getElementById('swal-cuotas')?.value;
                            if (!cuotas) {
                                Swal.showValidationMessage('Selecciona la cantidad de cuotas');
                                return false;
                            }
                        }
                        return { metodo, nombre, tarjeta, vto, cvv, cuotas };
                    }
                }).then((resultPago) => {
                    if (resultPago.isConfirmed) {
                        // Guardar historial
                        let historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
                        const usuario = JSON.parse(localStorage.getItem('usuario')) || { email: 'Invitado' };
                        const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
                        historial.push({
                            usuario: usuario.email,
                            fecha: new Date().toLocaleString(),
                            productos: carritoActual
                        });
                        localStorage.setItem('historialCompras', JSON.stringify(historial));

                        localStorage.removeItem('carrito');
                        mostrarCarrito();
                        Swal.fire({
                            title: '¡Compra realizada!',
                            html: `
                                <b>Número de pedido:</b> #${Math.floor(Math.random()*900000+100000)}<br>
                                <b>Fecha:</b> ${new Date().toLocaleDateString()}<br>
                                <b>Estado:</b> En preparación<br>
                                <hr>
                                <b>Resumen:</b>
                                <ul style="text-align:left">
                                    ${carritoActual.map(item => `<li>${item.nombre} x${item.cantidad || 1} - $${item.precio.toLocaleString('es-AR')}</li>`).join('')}
                                </ul>
                                <b>Total:</b> $${carritoActual.reduce((acc, prod) => acc + prod.precio * (prod.cantidad || 1), 0).toLocaleString('es-AR')}<br>
                                <hr>
                                <b>Seguimiento:</b>
                                <ol style="text-align:left">
                                    <li>Pedido recibido</li>
                                    <li><b>En preparación</b></li>
                                    <li>Enviado</li>
                                    <li>Entregado</li>
                                </ol>
                            `,
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                });
            });
        }
    });
});
