function toggleMenu() {
    var navbar = document.querySelector('.navbar');
    menu.classList.toggle('open');
}

function fetchAndDisplayProducts() {
    //fetch("https://ospostog4js.alwaysdata.net/rutas?grupo=mujer&orden=d")
    //fetch("https://ospostog4js.alwaysdata.net/rutas?grupo=hombre&orden=d")
    fetch("https://ospostog4js.alwaysdata.net/rutas?grupo=jovenes&orden=d")
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => console.log(error));
}
/*
//SECCIÓN DE PRODUCTOS EN LA PÁGINA
const products = [
    { name: 'Product1_w', description:'Outfit Otoño-Invierno', precio: 39.99, image: '#' },
    { name: 'Product2_w', description:'Saco y Suéter cuello alto', precio: 29.99, image: '#' },
    { name: 'Product3_w', description:'Supera el frío con excelente campera', precio: 39.99, image: '#' }
];
*/

// Función para mostrar productos en la página.
function displayProducts(products) {
    const productsContainer = document.querySelector('.products');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        console.log(product.imagen);

        productCard.innerHTML = `
            <img src="./assets/images/${product.imagen}" alt="${product.nombreProducto}">
            <p>${product.descripcion}</p>
            <p>$${product.precio}</p>
            <button>Add to Cart</button>
        `;

        productsContainer.appendChild(productCard);
    });
}

// Llame a la función displayProducts cuando se carga la página
window.addEventListener('load', fetchAndDisplayProducts);

  //CARGA DE PRODUCTOS
  
  document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const links = document.querySelectorAll('.nav-link');

    async function fetchProducts() {
        try {
            const response = await fetch('productos.json');
            if (!response.ok) throw new Error('Network response was not ok.');
            const products = await response.json();
            return products;
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    function renderProducts(products) {
        const productHtml = products.map(product => `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <button onclick="loadProductDetails(${product.id})">Ver Detalles</button>
            </div>
        `).join('');
        contentDiv.innerHTML = `<div class="product-list">${productHtml}</div>`;
    }

    window.loadProductDetails = async function(productId) {
        const products = await fetchProducts();
        const product = products.find(p => p.id === productId);
        contentDiv.innerHTML = `
            <div class="product-content">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <button onclick="loadProducts()">Volver a Productos</button>
            </div>
        `;
    }

    async function loadProducts() {
        const products = await fetchProducts();
        renderProducts(products);
    }

    async function navigate(event) {
        event.preventDefault();
        const page = event.target.dataset.page;
        if (page === 'productos') {
            await loadProducts();
        }
        updateActiveLink(event.target);
        history.pushState({page}, '', `#${page}`);
    }

    function updateActiveLink(activeLink) {
        links.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    links.forEach(link => {
        link.addEventListener('click', navigate);
    });

    window.addEventListener('popstate', async (event) => {
        const page = event.state ? event.state.page : 'productos';
        if (page === 'productos') {
            await loadProducts();
        }
        const activeLink = Array.from(links).find(link => link.dataset.page === page);
        updateActiveLink(activeLink);
    });

    const initialPage = location.hash.substring(1) || 'productos';
    if (initialPage === 'productos') {
        loadProducts();
    }
    const initialLink = Array.from(links).find(link => link.dataset.page === initialPage);
    updateActiveLink(initialLink);
});

  
//BANNER//

document.addEventListener("DOMContentLoaded", () => {
    const bannerimgs = document.querySelectorAll('.bannerimg');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function updateBanner(index) {
        bannerimgs.forEach((bannerimg, i) => {
            bannerimg.classList.toggle('active', i === index);
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + bannerimgs.length) % bannerimgs.length;
        updateBanner(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % bannerimgs.length;
        updateBanner(currentIndex);
    });

    // Initialize banner
    updateBanner(currentIndex);
});

//MENU MOBILE
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
