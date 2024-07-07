<?php
$server = "localhost";
$username = "id22170183_root";
$password = "1234CaC.";//1234CaC.
$dbname = "id22170183_tienda_bd";

// Conexión a la base de datos
$conn = mysqli_connect($server, $username, $password, $dbname);

// Verificar conexión
if (!$conn) {
    die("La conexión a la base de datos falló: " . mysqli_connect_error());
}

// Consulta para crear la tabla de consultas
$sql1 = "CREATE TABLE IF NOT EXISTS consultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// Consulta para crear la tabla de productos
$sql2 = "CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

// Ejecutar consultas
if (mysqli_query($conn, $sql1) && mysqli_query($conn, $sql2)) {
    echo "Las tablas se crearon correctamente";
} else {
    echo "Error al crear las tablas: " . mysqli_error($conn);
}

// Cerrar conexión
mysqli_close($conn);
?>

