<?php
// Iniciar la sesión y habilitar la visualización de errores
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Incluir el archivo de conexión a la base de datos
    include_once './Database.php';

    // Obtener los datos del formulario
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $imagen = $_POST['imagen'] ?? ''; // Asume que hay un campo de imagen si es necesario
    $categoria = obtenerCategoriaDesdePagina(); // Obtener categoría desde la página

    try {
        // Establecer la conexión a la base de datos
        $database = new Database();
        $conn = $database->getConnection();

        // Preparar la consulta SQL para verificar si ya existe un producto con el mismo nombre y categoría
        $sql = "SELECT * FROM productos WHERE nombre = ? AND categoria = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $nombre, $categoria);
        $stmt->execute();
        $result = $stmt->get_result();

        // Verificar si ya existe un producto con el mismo nombre y categoría
        if ($result->num_rows > 0) {
            echo "Error: Ya existe un producto con el mismo nombre y categoría.";
        } else {
            // Preparar la consulta SQL para insertar el nuevo producto
            $sql = "INSERT INTO productos (nombre, descripcion, precio, categoria, imagen) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);

            // Verificar si la preparación fue exitosa
            if ($stmt) {
                // Vincular los parámetros con la consulta
                $stmt->bind_param("ssdss", $nombre, $descripcion, $precio, $categoria, $imagen);

                // Ejecutar la consulta y verificar si se insertó el producto correctamente
                if ($stmt->execute()) {
                    // Redirigir a la página principal con un mensaje de éxito
                    $_SESSION['success_message'] = "El producto se ha creado correctamente.";
                    header("Location: index.html");
                    exit();
                } else {
                    echo "Error al crear el producto: " . $stmt->error;
                }

                // Cerrar la conexión
                $stmt->close();
            } else {
                echo "Error en la preparación de la consulta: " . $conn->error;
            }
        }

        $conn->close();
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Método de solicitud no válido.";
}

// Función para obtener la categoría según la página actual
function obtenerCategoriaDesdePagina() {
    $path = $_SERVER['HTTP_REFERER'];
    if (strpos($path, 'women.html') !== false) {
        return 'mujer';
    } else if (strpos($path, 'men.html') !== false) {
        return 'hombre';
    } else if (strpos($path, 'boy.html') !== false) {
        return 'jovenes';
    } else if (strpos($path, 'index.html') !== false) {
        return ''; // Para index.html, no agregamos ningún parámetro de grupo
    } else {
        error_log('No se pudo determinar la categoría desde la página actual.');
        return null;
    }
}
?>
