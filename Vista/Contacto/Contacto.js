/*$(document).ready(function () {
//$(document).on("ready", function () {
    $("#enviarMensaje").on("click", function () {


    });

});
*/

function enviarMensaje() {
    nombre = $("#nombre").val();
    correo = $("#correo").val();
    mensaje = $("#mensaje").val();

    params = {nombre: nombre, correo: correo, mensaje: mensaje};

    $.post("Controlador/Controlador.php",
            {clase: "Contacto", metodo: "ingresarMensaje", parametros: params},
            function (r) {
                r = JSON.parse(r);
                if (r.length === 0) {
                    console.log("No hpta");
                }

            });
}


