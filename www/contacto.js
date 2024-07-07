document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const responseDiv = document.getElementById('response');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        fetch('guardar_consulta.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            responseDiv.innerHTML = data;
            contactForm.reset();
        })
        .catch(error => {
            responseDiv.innerHTML = 'Ocurrió un error al enviar la consulta. Por favor, inténtalo de nuevo más tarde.';
            console.error('Error:', error);
        });
    });
});
