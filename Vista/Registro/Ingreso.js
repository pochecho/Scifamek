

function ingresar() {
    usuario = $("#usuario").val();
    contrasena = $("#contrasena").val();
    params = {usuario: usuario, contrasena: contrasena};

    $.post("Controlador/Controlador.php",
            {clase: "Cliente", metodo: "loguear", parametros: params},
            function (r) {
                r = JSON.parse(r);
                if (r == 0) {
                    $.post("Controlador/Controlador.php",
                            {clase: "Empleado", metodo: "loguear", parametros: params},
                            function (r) {
                                r = JSON.parse(r);
                                if (r == 0) {
                                    console.log("No hpta");
                                } else {
                                    redimensionar();
                                    $("#contenido").load('Vista/Inicio/Inicio.html');
                                }

                            });
                } else {


                    redimensionar();
                    $("#contenido").load('Vista/Inicio/Inicio.html');
                }

            });
}


function registrar() {
    $("#contenido").load('Vista/Registro/Registro.html');
}

