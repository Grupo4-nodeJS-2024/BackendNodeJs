// Evento al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.modal-content form');

    // Escuchar el evento de submit del formulario de login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío por defecto del formulario

        // Obtener valores de usuario y contraseña
        const username = this.uname.value.trim();
        const password = this.psw.value.trim();

        // Validar que se ingresen datos
        if (username === '' || password === '') {
            alert('Por favor ingrese usuario y contraseña.');
            return;
        }

        // Enviar datos al servidor para validar
        fetch('/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `uname=${encodeURIComponent(username)}&psw=${encodeURIComponent(password)}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message); // Login exitoso
                // Aquí puedes redirigir a la página de inicio o realizar acciones necesarias
                window.location.href = '/index.html'; // Ejemplo de redirección
            } else {
                alert(data.message); // Mostrar mensaje de error
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert('Error al intentar iniciar sesión. Intente nuevamente más tarde.');
        });
    });
});
