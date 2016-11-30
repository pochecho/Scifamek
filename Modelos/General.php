<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of General
 *
 * @author leand
 */
class General {

    public function consultar($conexion, $consulta) {
        $result = $conexion->getPDO()->query($consulta);
        $cadena = [];
        foreach ($result as $row) {
            $r = [];
            for ($i = 0; $i < count($row)-1; $i++) {
                $r[] = $row[$i];
            }
            $cadena[] = $r;
        }

        
         foreach ($cadena as $fila) {
           
             foreach ($fila as $dato) {
                 error_log($dato);     
             }
             error_log("___");
        }
        
        return $cadena;
    }

    public function unir($a, $b){
        foreach ($b as $i) {
            $a[] = $i;
        }
        return $a;
    }
}
