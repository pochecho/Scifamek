<?php

/* 
    Cargar los mensajes que envie cualquier usuario en la base de datos.
 */

class Contacto{
    
    function ingresarMensaje($params) {
        extract($params);
        $consulta = "INSERT INTO mesajes (nombre, correo, mensaje) VALUES ( '" . $parametros['nombre'] . "','".$parametros['correo']."','".$parametros['mensaje']."')";
        $result = $conexion->getPDO()->query($consulta);
        echo json_encode($result);
    }

}
