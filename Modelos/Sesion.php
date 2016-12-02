<?php

class Sesion {

    public function obtenerPaginasPorRoles($params) {
         extract($params);
        $consulta = "SELECT * FROM clientes where correo = '" . $parametros['usuario'] . "' and  contrasena = '" . md5($parametros['contrasena']) . "'";
        $cadena = $this->consultar($conexion, $consulta);
        $this->crearSesion($cadena);
        echo json_encode(count($cadena));
    }

}
