<?php
include 'General.php';
class Empleado extends General {

    function loguear($params) {
        extract($params);
        $consulta = "SELECT * FROM empleado where correo = '" . $parametros['usuario'] . "' and  contrasena = '" . md5($parametros['contrasena']) . "'";
        $cadena = $this->consultar($conexion, $consulta);
        $this->crearSesion($cadena);
        echo json_encode(count($cadena));
    }

    function crearSesion($usu) {
        session_start();
        $_SESSION['cedula'] = $usu[0];
        $_SESSION['nombre'] = $usu[2];
        $_SESSION['apellido'] = $usu[3];
        $_SESSION['direccion'] = $usu[4];
        $_SESSION['telefono'] = $usu[5];
        $_SESSION['correo'] = $usu[6];
        $_SESSION['genero'] = $usu[7];
        
        $consulta = "SELECT codigo_rol FROM roles_empleados where cedula_empleado = '" . $parametros['cedula'] . "'";
        $cadena = $this->consultar($conexion, $consulta);
        error_log($cadena[0][0]."<-rol");
        $_SESSION['rol'] = $cadena[0][0];
    }

    
    public function cerrarSesion(){
        session_start();
        unset($_SESSION);
    }
}
