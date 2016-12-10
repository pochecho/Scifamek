<?php

class General {

    public function consultar($conexion, $consulta) {
        $result = $conexion->getPDO()->query($consulta);

        unset($cadena);
        $cadena = [];
        foreach ($result as $row) {
            $r = [];
            for ($i = 0; $i < count($row) - 1; $i++) {
                $r[] = $row[$i];
            }
            $cadena[] = $r;
        }
        return $cadena;
    }

    public function consultar2($conexion, $consulta) {
        $result = $conexion->getPDO()->query($consulta);

        return $result;
    }

    public function unir($a, $b) {
        foreach ($b as $i) {
            $a[] = $i;
        }
        return $a;
    }

}
