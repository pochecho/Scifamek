$(document).ready(function ()
{
   
    // un ejemplo de uso de selectores jQuery para controlar eventos sobre links
    $("#main-menu li a").each(function () {
        var opcion = $(this).text();
        $(this).on('click', function (event) {
            switch (opcion) {
                case "Contacto":
                    redirigir("Contacto.html", "Vista/Contacto/Contacto.html");
                    break;
                case "Nosotros":
                    redirigir("Nosotros.html", "Vista/Nosotros/Nosotros.html");

                    break;
                case "Solicitudes":
                    redirigir("Solicitud.html", "Vista/Solicitud/Solicitud.html");

                    break;
                case "Inicio":
                    redirigir("Inicio.html", "Vista/Inicio/Inicio.html");
                    break;
                case "Ingresar":
                    redirigir("Ingreso.html", "Vista/Registro/Ingreso.html");

                    break;
                case "Salir":
                    $.post("Controlador/Controlador.php",
                            {clase: "Sesion", metodo: "salir", params: ""},
                            function (r) {
                                redirigir("Inicio.html", "Vista/Inicio/Inicio.html");
                                document.location.reload();
                            });
                    break;
                default:
//                    alert('La opción <' + opcion + '> no está disponible');
            }
            event.preventDefault();
        })
    })  // fin de $("#index-menu-superior li a").each(function () {...})

    $(function () {
        destino = window.localStorage.getItem("destino");
        url = window.localStorage.getItem("url");
        redirigir(destino, url);
    });

    $(function () {
        $.post("Controlador/Controlador.php",
                {clase: "Sesion", metodo: "validarSesion", params: ""},
                function (r) {
                    r = JSON.parse(r);
                    if (r.length === 0) {
                        console.log("No hpta");
                    } else {
                        if (r["rol"] == 8) {
                            redimensionar("Vista/Anexos/MenuCliente.html");
                        } else if (r["rol"] == 10) {
                            redimensionar("Vista/Anexos/MenuEmpleado.html");
                        }
                        //redimensionar();
                    }

                });
    });


    $(function () {
        $.post("Controlador/Controlador.php",
                {clase: "PaginasPermiso", metodo: "obtenerPaginasPermiso", parametros: params},
                function (r) {
                    t = false;
                    r = JSON.parse(r);
                    for (i = 0; i < r.length; i++) {
                        if (r[i] + ".html" == destino) {
                            t = true;
                        }
                    }
                    if (t) {
                        window.localStorage.setItem("destino", destino);
                        window.localStorage.setItem("url", url);
                        $("#contenido").load(url);
                    } else {
                        enviarNoticia("No tiene permiso para ingresar a esta página", "error");
                    }
                });
    });



});


function enviarNoticia(mensaje, tipo) {
    $("#noticias").append($("<p>" + mensaje + "<p>"));
    cadena = "border-radius: 0px 0px 10px 10px; color: white; padding-top:5px;";

    if (tipo == "exito") {
        $("#noticias").attr("style", cadena + "background: #4CAF50; ");
    } else {
        if (tipo == "error") {
            $("#noticias").attr("style", cadena + "background: #ff9c55;");
        }
    }

    function show_popup() {
        $("#noticias").empty();
        $("#noticias").attr("style", "padding-top: 0px");
    }
    ;
    window.setTimeout(show_popup, 2000); // 5 seconds


}
//onbeforeunload

function redirigir(destino, url) {
    params = {
        destino: destino
    };
    $.post("Controlador/Controlador.php",
            {clase: "PaginasPermiso", metodo: "obtenerPaginasPermiso", parametros: params},
            function (r) {
                t = false;
                r = JSON.parse(r);
                for (i = 0; i < r.length; i++) {
                    if (r[i] + ".html" == destino) {
                        t = true;
                        break;
                    }
                }
                if (t) {
                    window.localStorage.setItem("destino", destino);
                    window.localStorage.setItem("url", url);
                    $("#contenido").load(url);
                } else {
                    enviarNoticia("No tiene permiso para ingresar a esta página", "error");
                }
            });

}

function redimensionar(ruta) {

    $("#menuLateral").addClass("col-xs-3");
    $("#menuLateral").load(ruta);
    $("#contenido").removeClass("col-xs-12").addClass("col-xs-9");
//    UL = $("<br><br><ul class='list-group'></ul>");
//    param = "'Proyectos.html','Vista/Proyectos/Proyectos.html'";
//    li1 = $("<li class='list-group-item'>Proyectos</li>");
//    li1.attr("onclick", "redirigir(param)");
//    UL.append(li1);
//
//    param2 = "'Solicitudes.html','Vista/Solicitudes/Solicitudes.html'";
//    li2 = $("<li class='list-group-item'>Solicitudes</li>");
//    li2.attr("onclick", "redirigir(param)");
//    UL.append(li2);
//
//
//    $("#menuClientes").append(UL);

}
