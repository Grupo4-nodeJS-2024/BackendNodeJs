<?php
// Incluir el archivo de conexión a la base de datos
include('conexion.php');

// Consulta SQL para seleccionar los productos
$sql = "SELECT * FROM productos";

// Ejecutar la consulta
$resultado = mysqli_query($conn, $sql);

// Verificar si se obtuvieron resultados
if (mysqli_num_rows($resultado) > 0) {
    // Array para almacenar los productos
    $productos = array();

    // Iterar sobre los resultados y agregar cada producto al array
    while ($row = mysqli_fetch_assoc($resultado)) {
        $productos[] = $row;
    }

    // Devolver los productos como respuesta en formato JSON
    echo json_encode($productos);
} else {
    // No se encontraron productos
    echo json_encode(array());
}

// Cerrar la conexión a la base de datos
mysqli_close($conn);
?>
