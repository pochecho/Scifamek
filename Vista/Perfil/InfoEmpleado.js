/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

cliente = null;

function cargarPerfilEmpleado() {
    redirigir("InfoUsuario.html", "Vista/Perfil/InfoUsuario.html");
    params = {codigo: 1};
    $.post("Controlador/Controlador.php",
            {clase: "Empleado", metodo: "obtenerSesion", parametros: params},
            function (r) {
                r = JSON.parse(r);
                console.log(r);
                console.log("www");
                if (r.length === 0) {
                    console.log("No hpta 23");
                }
                cliente = r;
                cargarInformacionEmpleado();
            });
}

function cargarInformacionEmpleado() {

    $("#cedula").val(cliente["cedula"]);
    $("#nombre").val(cliente["nombre"]);
    $("#contrasena").val("");
    $("#apellido").val(cliente["apellido"]);
    $("#direccion").val(cliente["direccion"]);
    $("#telefono").val(cliente["telefono"]);
    $("#email").val(cliente["correo"]);

}






function guardarCambios() {
    nombre = $("#nombre").val();
    apellido = $("#apellido").val();
    cedula = $("#cedula").val();
    contrasena = $("#contrasena").val();
    direccion = $("#direccion").val();
    telefono = $("#telefono").val();
    correo = $("#correo").val();
    sexo = "";

    if ($("#radioF").is(':checked')) {
        sexo = 0;
    }
    if ($("#radioM").is(':checked')) {
        sexo = 1;
    }

    params = {nombre: nombre, contrasena: contrasena, apellido: apellido, cedula: cedula, direccion: direccion, telefono: telefono, correo: correo, sexo: sexo};

    $.post("Controlador/Controlador.php",
            {clase: "Cliente", metodo: "actualizarDatos", parametros: params},
            function (r) {
                r = JSON.parse(r);
                alert(r);
                if (r.length === 0) {
                    console.log("No hpta");
                }

            });

}
