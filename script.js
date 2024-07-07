const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    console.log(`Se ha hecho clic en el botón ${button.textContent}`);
    const page = button.textContent.toLowerCase(); // Convierte el texto del botón a minúsculas
    switch (page) {
        case 'usuarios':
            window.location.href='';
            break;
        case 'productos':
            window.location.href='views/productos.ejs';
            break;
        case 'fronEnd':
           window.location.href='https://ospostog4js.alwaysdata.net/';
            break;
        case 'informes':
            window.location.href='';
            break;

        default:
        console.error(`No se encontró una URL para la página: ${page}`);
    }
  });
});
