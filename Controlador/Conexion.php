<?php

/**
 * Description of Conexion:
 * Ise encarga de proporcionar la conexión a la base de datos.
 * @author Carlos Cuesta Iglesias
 */
class Conexion {

    private $pdo;

    public function __construct() {
        // estas constantes se utilizan tanto en vista como en modelo, por lo tanto se definen una vez y se utilizan N veces (nada de duplicar código)

        try {
            $this->pdo = new PDO("pgsql:host=localhost;port=5432;dbname = sciv2; user = postgres; password =sergioesgay");
            } catch (PDOException $e) {
            error_log(utf8_encode($e));
            throw new Exception('No se pudo establecer la conexión con la base de datos', $e->getCode());
        }
    }

    public function getPDO() {
        return $this->pdo;
    }    
}
