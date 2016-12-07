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


                            });
                    break;
                default:
                    alert('La opción <' + opcion + '> no está disponible');
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
alert("Este es el "+r);
                    if (r.length === 0) {
                        console.log("No hpta");
                    } else {
                        if (r["rol"] == 8) {
                            redimensionar("Vista/Anexos/MenuCliente.html");
                        }
                        console.log(r);
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
                        alert("No tiene permiso para ingresar a esta pagina");
                    }
                });
    });


});



//onbeforeunload

function redirigir(destino, url) {
    params = {
        destino: destino
    };
    archivoActual = window.location.pathname;
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
                    alert("No tiene permiso para ingresar a esta pagina");
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
