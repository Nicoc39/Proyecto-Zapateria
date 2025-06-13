# Dulce Locura - Tienda de Calzados y Accesorios

## Descripción
Dulce Locura es una tienda virtual de calzados y accesorios que permite a los usuarios explorar productos, agregarlos al carrito, gestionar favoritos y realizar compras de manera segura.

## Características Principales
- Catálogo de productos con imágenes y detalles
- Sistema de carrito de compras
- Gestión de favoritos
- Historial de compras
- Sistema de usuarios
- Proceso de compra con selección de talles
- Cálculo de costos de envío por provincia
- Interfaz responsiva y amigable

## Estructura del Proyecto
```
├── index.html              # Página principal
├── Styles/
│   └── styles.css         # Estilos principales
├── scripts/
│   ├── carrito.js         # Gestión del carrito
│   ├── catalogo.js        # Visualización de productos
│   ├── sesion.js          # Gestión de usuarios
│   └── login.js           # Autenticación
├── JSONs/
│   └── productos.json     # Datos de productos
├── Paginas/
│   ├── carrito.html       # Página del carrito
│   └── login.html         # Página de login
└── imagenes/              # Recursos gráficos
```

## Tecnologías Utilizadas
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.5
- SweetAlert2
- Font Awesome
- LocalStorage para persistencia de datos

## Funcionalidades Detalladas

### Catálogo de Productos
- Visualización de productos con imágenes
- Filtrado por categorías
- Detalles de productos (nombre, precio, talles)

### Carrito de Compras
- Agregar productos con selección de talle
- Eliminar productos
- Calcular total
- Vaciar carrito
- Persistencia de datos en localStorage

### Sistema de Usuarios
- Registro e inicio de sesión
- Gestión de sesión
- Historial de compras
- Lista de favoritos

### Proceso de Compra
- Validación de datos de envío
- Cálculo de costos de envío por provincia
- Selección de método de pago
- Confirmación de compra

## Instalación y Uso
1. Clonar el repositorio
2. Abrir `index.html` en un navegador moderno
3. Para desarrollo, se recomienda usar un servidor local

## Requisitos
- Navegador web moderno con soporte para:
  - JavaScript ES6+
  - LocalStorage
  - CSS Grid y Flexbox

## Contribución
Para contribuir al proyecto:
1. Fork el repositorio
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crear un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT.
