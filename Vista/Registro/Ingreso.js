

function ingresar() {
    usuario = $("#usuario").val();
    contrasena = $("#contrasena").val();
    params = {usuario: usuario, contrasena: contrasena};

    $.post("Controlador/Controlador.php",
            {clase: "Cliente", metodo: "loguear", parametros: params},
            function (r) {

                r = JSON.parse(r);
                if (r == 0) {
                    console.log("No hpta");
                } else {


                    redimensionar();
                    $("#contenido").load('Vista/Inicio/Inicio.html');
                }

            });
}


function registrar() {
    $("#contenido").load('Vista/Registro/Registro.html');
}

function redimensionar() {

    $("#menuClientes").addClass("col-xs-3");
    $("#contenido").removeClass("col-xs-12").addClass("col-xs-9");
    UL = $("<br><br><ul class='list-group'></ul>");
    param = "'Proyectos.html','Vista/Proyectos/Proyectos.html'";
    li1 = $("<li class='list-group-item'>Proyectos</li>");
    li1.attr("onclick", "redirigir(param)");
    UL.append(li1);
    
    param2 = "'Solicitudes.html','Vista/Solicitudes/Solicitudes.html'";
    li2 = $("<li class='list-group-item'>Solicitudes</li>");
    li2.attr("onclick", "redirigir(param)");
    UL.append(li2);


    $("#menuClientes").append(UL);

}