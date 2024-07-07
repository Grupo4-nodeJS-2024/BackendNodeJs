<?php
//include('conexion.php');
$server = "localhost";
$username = "root";
$password = "";//1234
$dbname = "tienda_bd";

// Conexión a la base de datos
$conn = mysqli_connect($server, $username, $password, $dbname);
// Obtener los datos del formulario de contacto
$nombre = $_POST['name'];
$email = $_POST['email'];
$mensaje = $_POST['message'];

// Preparar la consulta SQL para insertar la consulta en la base de datos
$sql = "INSERT INTO consultas (nombre, email, mensaje) VALUES ('$nombre', '$email', '$mensaje')";

// Ejecutar la consulta
if (mysqli_query($conn, $sql)) {
    echo "Consulta guardada correctamente";
} else {
    echo "Error al guardar la consulta: " . mysqli_error($conn);
}

// No cierres la conexión aquí para evitar el error
// mysqli_close($conn);
?>
