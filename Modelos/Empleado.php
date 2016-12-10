<?php

include 'General.php';

class Empleado extends General {

    function loguear($params) {
        extract($params);
        $consulta = "SELECT * FROM empleados where correo = '" . $parametros['usuario'] . "' and  contrasena = '" . md5($parametros['contrasena']) . "'";
        $cadena = $this->consultar($conexion, $consulta);
        $this->crearSesion($cadena,$conexion);
        echo json_encode(($cadena));
    }

    function crearSesion($usu,$conexion) {
        session_start();
        $_SESSION['cedula'] = $usu[0][0];
        $_SESSION['nombre'] = $usu[0][1];
        $_SESSION['apellido'] = $usu[0][2];
        $_SESSION['direccion'] = $usu[0][3];
        $_SESSION['telefono'] = $usu[0][4];
        $_SESSION['correo'] = $usu[0][5];
        $_SESSION['genero'] = $usu[0][11];
        $consulta = "SELECT codigo_rol FROM roles_empleados where cedula_empleado = '" . $usu[0][0] . "'";
        error_log($consulta);
        $caden = $this->consultar($conexion, $consulta);
        $_SESSION['rol'] = $caden[0][0];
    }

    public function cerrarSesion() {
        session_start();
        unset($_SESSION);
    }
    public function obtenerSesion($params) {
        session_start();
        echo json_encode($_SESSION);
    }

}
