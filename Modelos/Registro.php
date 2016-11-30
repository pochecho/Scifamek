<?php

/**
 * Description of Registro
 * @author leand
 */


class Registro {
    
    function registrarCliente($params) {
        extract($params);
        //cedula, nombre, apellido, direccion, telefono, correo, sexo
        $consulta = "INSERT INTO clientes (cedula, nombre, apellido, direccion, telefono, correo, sexo) VALUES ( " . $parametros['cedula'] . ",'".$parametros['nombre']."','".$parametros['apellido'].
                "','".$parametros['direccion'] . "','".$parametros['telefono'] . "','".$parametros['correo'] . "','".$parametros['sexo']."')";
        
        error_log($consulta);
        $result = $conexion->getPDO()->query($consulta);
        echo json_encode($result);
    }
}
