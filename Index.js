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
                    $("#contenido").load('Vista/Inicio/Inicio.html');
                    break;
                case "Ingresar":
                    $("#contenido").load('Vista/Registro/Ingreso.html');
                    break;
                default:
                    alert('La opción <' + opcion + '> no está disponible');
            }
            event.preventDefault();
        })
    })  // fin de $("#index-menu-superior li a").each(function () {...})

   
});   


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
                        if (r[i] == destino) {
                            t = true;
                        }
                    }
                    if (t) {
                        $("#contenido").load(url);
                    } else {
                        alert("No tiene permiso para ingresar a esta pagina");
                    }
                });

    }
