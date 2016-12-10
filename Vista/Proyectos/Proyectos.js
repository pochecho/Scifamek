function crearmenu() {

    $.post("Controlador/Controlador.php",
            {clase: "Cliente", metodo: "obtenerSesion"},
            function (datosesion) {
                datosesion = JSON.parse(datosesion);
                if (datosesion.length == 0) {
                    console.log("No hpta");
                    alert(cliente);
                }
                cliente = r["correo"];
                alert(cliente);
            });
}

function obtenerTodosProyectos() {
    $.post("Controlador/Controlador.php",
            {clase: "Cliente", metodo: "obtenerSesion"},
            function (datosesion) {
                datosesion = JSON.parse(datosesion);
                if (datosesion.length != 0) {
                    if (datosesion["rol"] == 8) {
                        params = {
                            codigo: 8
                        };
                        redirigir("Proyectos.html", "Vista/Proyectos/Proyectos.html");
                        $.post("Controlador/Controlador.php",
                                {clase: "Proyectos", metodo: "consultarProyectosCliente", parametros: params},
                                function (datosesion) {
                                    datosesion = JSON.parse(datosesion);
                                    if (datosesion.length != 0) {
                                        for (var i = 0; i < datosesion.length; i++) {

                                            $("#proyectos_totales").append("<div onclick=\"cargarDetallesProyecto(" + datosesion[i][0] + ") \" class=\" col-xs-3 panel-body vinculo\" >" + datosesion[i][1] + " </div>");
                                        }

                                    }
                                }

                        );







                    }
                }
            });

}