/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

cliente = null;

function cargarPerfil() {
    redirigir("InfoCliente.html", "Vista/Perfil/InfoCliente.html");
params ={codigo:1};
    $.post("Controlador/Controlador.php",
            {clase: "Cliente", metodo: "obtenerSesion",parametros:params},
            function (r) {
                r = JSON.parse(r);
                console.log(r["cedula"]);
                if (r.length === 0) {
                    console.log("No hpta");
                }
                cliente = r["cedula"];
                cargarInformacion();
            });


}

function cargarInformacion() {
    
    $("#cedula").val(cliente[0]);
    $("#nombre").val(cliente[2]);
    $("#contrasena").val("");
    $("#apellido").val(cliente[3]);
    $("#direccion").val(cliente[4]);
    $("#telefono").val(cliente[5]);
    $("#email").val(cliente[6]);

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
