<?php
class Database {
    private $host = "localhost"; // Ajusta según tu configuración
    private $db_name = "ospostog4js_orlando";
    private $username = "root";
    private $password = "1234";
    public $conn;
 
    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
            if ($this->conn->connect_errno) {
                echo "Error al conectar a MySQL: (" . $this->conn->connect_errno . ") " . $this->conn->connect_error;
            }
        } catch (Exception $e) {
            echo "Error de conexión: " . $e->getMessage();
        }
        return $this->conn;
    }
}
?>
