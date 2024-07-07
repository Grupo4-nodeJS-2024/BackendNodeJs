//SECCIÓN DE PRODUCTOS EN LA PÁGINA
const products = [
    { name: 'Product 1', description:'Campera Cuero Masculina', precio: 19.99, image: '#' },
    { name: 'Product 2', description:'Saco y Suéter cuello alto', precio: 29.99, image: '#' },
    { name: 'Product 3', description:'Buzos para ell@s', precio: 39.99, image: '#' }
];

// Función para mostrar productos en la página.
function displayProducts() {
    const productsContainer = document.querySelector('.products');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        productCard.innerHTML = `
            <img src="imgs/${product.name}.jpg" alt="${product.name}">
            <p>${product.description}</p>
            <p>$${product.precio}</p>
            <button>Add to Cart</button>
        `;

        productsContainer.appendChild(productCard);
    });
}

// Llame a la función displayProducts cuando se carga la página
window.addEventListener('load', displayProducts);


  // --------FORMULARIO--------
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let valid = true;

    // Validación del nombre
    const name = document.getElementById('name').value;
    if (name.trim() === '') {
        valid = false;
        document.getElementById('nameError').innerText = 'El nombre es obligatorio.';
    } else {
        document.getElementById('nameError').innerText = '';
    }

    // Validación del correo electrónico
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        valid = false;
        document.getElementById('emailError').innerText = 'Ingrese un correo electrónico válido.';
    } else {
        document.getElementById('emailError').innerText = '';
    }

    // Validación del asunto
    const subject = document.getElementById('subject').value;
    if (subject === '') {
        valid = false;
        document.getElementById('subjectError').innerText = 'Seleccione un asunto.';
    } else {
        document.getElementById('subjectError').innerText = '';
    }

    // Validación del mensaje
    const message = document.getElementById('message').value;
    if (message.trim() === '') {
        valid = false;
        document.getElementById('messageError').innerText = 'El mensaje es obligatorio.';
    } else {
        document.getElementById('messageError').innerText = '';
    }

    if (valid) {
        alert('Formulario enviado correctamente.');
        // Aquí puedes agregar la lógica para enviar el formulario
        document.getElementById('contactForm').reset();
    }
});


  
  
//-------BANNER--------//

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
