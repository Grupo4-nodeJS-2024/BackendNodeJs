<?php
include('conexion.php');

// Obtener los datos del formulario
// Supongamos que los datos se envían mediante POST y tienen nombres como 'nombre', 'precio', etc.
$nombre = $_POST['nombre'];
$precio = $_POST['precio'];
// Agregar más campos según tu estructura de productos

// Preparar la consulta SQL para insertar el producto en la base de datos
$sql = "INSERT INTO productos (nombre, precio) VALUES ('$nombre', '$precio')";

// Ejecutar la consulta
if (mysqli_query($conn, $sql)) {
    echo "Producto guardado correctamente";
} else {
    echo "Error al guardar el producto: " . mysqli_error($conn);
}

// Cerrar la conexión
mysqli_close($conn);
?>
