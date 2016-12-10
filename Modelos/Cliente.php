<?php
include 'General.php';
class Cliente extends General {

    function loguear($params) {
        extract($params);
        $consulta = "SELECT * FROM clientes where correo = '" . $parametros['usuario'] . "' and  contrasena = '" . md5($parametros['contrasena']) . "'";
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
        $_SESSION['rol'] = 8;
    }

    function obtenerSesion($params){
        session_start();
        echo json_encode($_SESSION);
    }
    
    
    public function cerrarSesion(){
        session_start();
        unset($_SESSION);
    }
    
    public function actualizarDatos(){
        extract($params);
        //update-------------
        $consulta = "SELECT * FROM clientes where correo = '" . $parametros['usuario'] . "' and  contrasena = '" . md5($parametros['contrasena']) . "'";
        $cadena = $this->consultar($conexion, $consulta);
        $this->crearSesion($cadena);
        echo json_encode(count($cadena));
    }
}
