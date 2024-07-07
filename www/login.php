<?php
// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "ospostog4js_orlando";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibir datos del formulario de login
$username = $_POST['uname'];
$password = $_POST['psw'];

// Consulta SQL para verificar si el usuario existe
$sql = "SELECT * FROM usuarios WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Usuario válido, redirigir a página de inicio de sesión exitosa o realizar acciones necesarias
    echo json_encode(array('success' => true, 'message' => 'Login exitoso'));
} else {
    // Usuario inválido
    echo json_encode(array('success' => false, 'message' => 'Usuario o contraseña incorrectos'));
}

// Cerrar conexión
$conn->close();
?>
