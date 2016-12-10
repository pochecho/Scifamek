<?php

class Sesion {

 
    public function validarSesion() {
        echo json_encode(($_SESSION));
    }

    public function salir() {
        unset($_SESSION['cedula']);
        unset($_SESSION['nombre']);
        unset($_SESSION['apellido']);
        unset($_SESSION['direccion']);
        unset($_SESSION['telefono']);
        unset($_SESSION['correo']);
        unset($_SESSION['genero']);
        unset($_SESSION['rol']);

    }

}
