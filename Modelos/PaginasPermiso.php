<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include 'General.php';

/**
 * Description of PaginasPermiso
 * @author leand
 */
class PaginasPermiso extends General {

    //put your code here
    function obtenerPaginasPermiso($params) {
        extract($params);

        $cadena = [];
        if (isset($_SESSION['rol'])) {
            $consulta = "SELECT f.nombre FROM permisos_pagina p, ficheros f where p.codigo_rol = " . $_SESSION['rol'] .
                    " and p.codigo_fichero = f.codigo";
            $cadena = $this->consultar($conexion, $consulta);
        }
        $consulta = "SELECT f.nombre FROM permisos_pagina p, ficheros f where p.codigo_rol = 6" .
                " and p.codigo_fichero = f.codigo";
        $cadena2 = $this->consultar($conexion, $consulta);
        $cadena = $this->unir($cadena, $cadena2);
        echo json_encode(($cadena));
    }

}
