document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const productResponseDiv = document.getElementById('productResponse');

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(productForm);

        fetch('guardar_producto.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            productResponseDiv.innerHTML = data;
            productForm.reset();
        })
        .catch(error => {
            productResponseDiv.innerHTML = 'Ocurrió un error al guardar el producto. Por favor, inténtalo de nuevo más tarde.';
            console.error('Error:', error);
        });
    });
});
