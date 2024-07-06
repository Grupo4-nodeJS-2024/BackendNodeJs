const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    console.log(`Se ha hecho clic en el botón ${button.textContent}`);
    const page = button.textContent.toLowerCase(); // Convierte el texto del botón a minúsculas
    switch (page) {
        case 'usuarios':
            window.location.href='user';
            break;
        case 'productos':
            window.location.href='productos';
            break;
        case 'fronEnd':
           window.location.href='https://grupo4-nodejs-2024.github.io/Grupo4-NodeJs/index.html';
            break;
        case 'informes':
            window.location.href='info';
            break;

        default:
        console.error(`No se encontró una URL para la página: ${page}`);
    }
  });
});
