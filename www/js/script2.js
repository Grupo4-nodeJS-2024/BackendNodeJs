// Función para obtener la categoría según la página actual
function obtenerCategoriaDesdePagina() {
    const path = window.location.pathname;
    if (path.includes('women.html')) {
        return 'mujer';
    } else if (path.includes('men.html')) {
        return 'hombre';
    } else if (path.includes('boy.html')) {
        return 'jovenes';
    } else if (path.includes('index.html')) {
        return ''; // Para index.html, no agregamos ningún parámetro de grupo
    } else {
        console.error('No se pudo determinar la categoría desde la página actual.');
        return null;
    }
}

// Función para cargar y mostrar productos según la categoría
function fetchAndDisplayProducts() {
    const categoria = obtenerCategoriaDesdePagina();
    if (categoria !== null) {
        const apiUrl = categoria ? `https://ospostog4js.alwaysdata.net/rutas?grupo=${categoria}&orden=d` : 'https://ospostog4js.alwaysdata.net/rutas';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayProducts(data);
            })
            .catch(error => console.error('Error al cargar productos:', error));
    } else {
        console.error('No se pudo obtener la categoría para cargar productos.');
    }
}

// Función para mostrar productos en la página
function displayProducts(products) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = ''; // Limpiar contenedor de productos

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        productCard.innerHTML = `
            <img src="./assets/images/${product.imagen}" alt="${product.nombreProducto}">
            <p>${product.descripcion}</p>
            <p>$${product.precio}</p>
            <button>Add to Cart</button>
        `;

        productsContainer.appendChild(productCard);
    });
}

// Llamar a la función fetchAndDisplayProducts cuando se carga la página
window.addEventListener('load', fetchAndDisplayProducts);

// Banner, menú móvil y otras funciones adicionales
document.addEventListener("DOMContentLoaded", () => {
    // Código adicional aquí, como manejo de banners, menú móvil, etc.
});

// Menú móvil
const buttonMenu = document.querySelector('#nav-mobile');
const navMenu = document.querySelector('.nav-menu');

buttonMenu.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('nav-open');
    navMenu.classList.toggle('open-menu');
});

$(function() {
    var btn_movil = $('#nav-mobile'),
        menu = $('#menu').find('ul');

    btn_movil.on('click', function (e) {
        e.preventDefault();
        var el = $(this);
        el.toggleClass('nav-active');
        menu.toggleClass('open-menu');
    });
});
