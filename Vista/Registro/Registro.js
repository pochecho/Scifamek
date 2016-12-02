
function registrarCliente() {
    nombre = $("#nombre").val();
    apellido = $("#apellido").val();
    cedula = $("#cedula").val();
    direccion = $("#direccion").val();
    telefono = $("#telefono").val();
    correo = $("#correo").val();
    sexo = "";
    
    if($("#radioF").is(':checked')){sexo = "F";}
    if($("#radioM").is(':checked')){sexo = "M";}
    
    params = {nombre: nombre, apellido: apellido, cedula: cedula, direccion: direccion, telefono: telefono, correo: correo, sexo: sexo};
    
    $.post("Controlador/Controlador.php",
            {clase: "Registro", metodo: "registrarCliente", parametros: params},
            function (r) {
                r = JSON.parse(r);
                alert(r);
                if (r.length === 0) {
                    console.log("No hpta");
                }

            });
}
 
function iniciarSesion(){
    $("#contenido").load('Vista/Registro/Ingreso.html');
} 