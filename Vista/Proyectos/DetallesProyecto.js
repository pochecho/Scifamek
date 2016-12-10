function cargarDetallesProyecto(num) {
   
    redirigir("DetallesProyecto.html", "Vista/Proyectos/DetallesProyecto.html");
    llenarContenido(num);
}

function llenarContenido(num) {
    obtenerObjetivos(num);
    obtenerActividades(num);
    obtenerServicios(num);
    obtenerInfoProyecto(num);
    obtenerRepresentantes(num);
}

function obtenerObjetivos(num) {
    params = {codigo: num};
    $.post("Controlador/Controlador.php",
            {clase: "Proyectos", metodo: "consultarObjetivosPorCodigo", parametros: params},
            function (r) {
                r = JSON.parse(r);
                if (r.length != 0) {
                    for (i = 0; i < r.length; i++) {
                        div = $(" <tr></tr>");
                        descripcion = $("<td>" + r[i][2] + " </td>");
                        tipo = $("<td>" + r[i][3] + " </td>");
                        div.append(descripcion, tipo);
                        $("#objetivos").after(div);
                    }
                }
            });


}
function obtenerServicios(num) {
params = {codigo: num};
    $.post("Controlador/Controlador.php",
            {clase: "Proyectos", metodo: "consultarServiciosPorCodigo", parametros: params},
            function (r) {
                r = JSON.parse(r);
                if (r.length != 0) {
                    for (i = 0; i < r.length; i++) {
                        div = $(" <tr></tr>");
                        nombre = $("<td>" + r[i][0] + " </td>");
                        descripcion = $("<td>" + r[i][1] + " </td>");
                        costo = $("<td>" + r[i][2] + " </td>");
                        div.append(nombre, descripcion, costo);
                        $("#servicios").after(div);
                    }
                }
            });

}
function obtenerActividades(num) {
    params = {codigo: num};
    $.post("Controlador/Controlador.php",
            {clase: "Proyectos", metodo: "consultarActividadesPorCodigo", parametros: params},
            function (r) {
                r = JSON.parse(r);
                if (r.length != 0) {
                    for (i = 0; i < r.length; i++) {
                        div = $(" <tr class='success'></tr>");
                        actividad = $("<td>" + r[i][0] + " </td>");
                        descripcion = $("<td>" + r[i][1] + " </td>");
                        fecha_inicio = $("<td>" + r[i][2] + " </td>");
                        fecha_fin = $("<td>" + r[i][3] + " </td>");
                        estado = $("<td>" + r[i][4] + " </td>");
                        div.append(actividad, descripcion, fecha_inicio, fecha_fin, estado);
                        $("#actividades").after(div);
                    }
                }
            });
}
function obtenerInfoProyecto(num) {
    params = {codigo: num};
    $.post("Controlador/Controlador.php",
            {clase: "Proyectos", metodo: "consultarProyecto", parametros: params},
            function (r) {
                r = JSON.parse(r);
                if (r.length != 0) {
                    for (i = 0; i < r.length; i++) {
                        $("#nombre_proyecto").append($(" <p><b>" + r[i][1] + "</b></p>"));
                        $("#parametros").append($(" <p>" + r[i][3] + " - " + r[i][4] + " - " + r[i][5] + "</p>"));
                        $("#descripcion_proyecto").append($(" <p>" + r[i][2] + "</p>"));
                    }
                }
            });

}
function obtenerRepresentantes(num) {


    params = {codigo: num};
    $.post("Controlador/Controlador.php",
            {clase: "Proyectos", metodo: "consultarRepresentantes", parametros: params},
            function (r) {
                r = JSON.parse(r);
                if (r.length != 0) {
                    var config = {
                        type: 'pie',
                        data: {
                            datasets: [{
                                    data: generarVectorValores(r),
                                    backgroundColor: generarVectorColores(r.length),
                                    label: 'Dataset 1'
                                }],
                            labels: generarVectorNombres(r)
                        },
                        options: {
                            responsive: true
                        }
                    };



                    var ctx = document.getElementById("chart-area").getContext("2d");
                    window.myPie = new Chart(ctx, config);


                }
            });

}
function generarNumero() {
    return Math.round(Math.random() * 255);
}
function generarVectorColores(longitud) {
    colores = [];
    var i;
    for (i = 0; i < longitud; i++) {
        colores[i] = "rgb(" + generarNumero() + "," + generarNumero() + "," + generarNumero() + ")";
    }
    return colores;
}

function generarVectorNombres(vect){
    temp = [];
    var i;
    for (i = 0; i < vect.length; i++)
    {
        temp[i] = vect[i][0];
    }

    return temp;
}
function generarVectorValores(vect){
    temp = [];
    var i;
    for (i = 0; i < vect.length; i++)
    {
        temp[i] = vect[i][1] * 100;
    }

    return temp;
}


/* 
 * Manejo de turnos de operarios y de máquinas
 */
//
//$(function () {
//
//    var calendario;
//    var anchoEtiquetas = 100;
//    var anchoContenedor = 500;
//
//    $.datetimepicker.setLocale('es');
//
//    jQuery('#turno_produccion-start').datetimepicker({
//        step: 30, // listado de horas con cambio cada media hora
//        format: 'Y.m.d H:i'
//    });
//    jQuery('#turno_produccion-end').datetimepicker();
//
//    $("#turno_produccion-dialog").estiloFormulario({
//        //'claseFormulario': 'box',
//        'anchoFormulario': anchoContenedor + 'px',
//        'anchoEtiquetas': anchoEtiquetas + 'px',
//        'anchoEntradas': (anchoContenedor - anchoEtiquetas - 40) + 'px',
//        'alturaTextArea': '50px'
//    });
//
//    // Una lista con las máquinas para mostrar en los formularios de edición
//    var listaMaquinas = getElementos({'clase': 'Maquina', 'oper': 'getSelect', 'json': true});
//    $('#turno_produccion-maquina').html(listaMaquinas).change(function () {
//        // guiar al usuario con los colores de la máquina
//        var color = $("#turno_produccion-maquina option:selected").attr('color');
//        $("#turno_produccion-color").val(color);
//    });
//    
//    // Otra lista con las máquinas para permitir filtrar en el calendario
//    $('#turno_produccion-maquina2').html(listaMaquinas);
//    $('#turno_produccion-maquina2').append('<option value="todas" style="background-color:white">Mostrar todas</option>');
//    $('#turno_produccion-maquina2').val('todas');
//    $('#turno_produccion-maquina2').change(function () {
//        // recupera los eventos (turnos) y recarga el calendario
//        calendario.fullCalendar("refetchEvents");
//    });
//
//    // el formulario para agregar y editar 
//    $('#turno_produccion-dialog').dialog({
//        autoOpen: false,
//        width: anchoContenedor + 10,
//        height: 280,
//        modal: true
//    });
//
//    calendario = $('#turno_produccion-calendario').fullCalendar({
//        theme: true,
//        header: {
//            left: 'prev,next today',
//            center: 'title',
//            right: 'month,agendaWeek,agendaDay'
//        },
//        defaultView: 'agendaWeek',
//        defaultDate: '2016-01-12', //////////////////////////////////////////
//        timezone: 'America/Bogota',
//        selectable: true,
//        selectHelper: true,
//        editable: true,
//        eventLimit: true, // allow "more" link when too many events
//
////        dayClick: function (date, jsEvent, view) {
////            // sucede antes de select
////            console.log('dayClick (sobre una celda vacía --> Agregar)', date.format());
////            agregarTurno(date);
////        },
//        select: function (start, end) {
//            nuevoTurno(start, end);
//        },
//        eventClick: function (event, jsEvent, view) {
//            actualizarTurno(event);
//        },
//        events: {
//            url: 'controlador/fachada.php',
//            type: 'POST',
//            data: function () { // OJO, la función devolviendo el objeto es para forzar tomar el valor actual de $("#turno_produccion-maquina2").val() 
//                return {
//                    clase: 'TurnoProduccion',
//                    oper: 'getProgramacion',
//                    maquina: $("#turno_produccion-maquina2").val()  // si esto fuera un valor estático no se requeriría la función anónima
//                }
//            }, error: function () {
//                mostrarMensaje('Problemas al intentar cargar los turnos', '#turno_produccion-mensaje')
//            }
//        },
//        eventRender: function (event, element) {
//            // Desplegar información complementaria del turno
//            element.qtip({
//                content: {
//                    text: 'Máquina Xxxxxxxxxxx<br>Operario Nnnnnnn Xxxxxxxx'
//                }
//            });
//        },
//        loading: function (bool) {
//            if (bool) {
//                $.blockUI({message: getMensaje('Cargando los turnos')});
//            } else {
//                $.unblockUI();
//            }
//        },
//        eventDrop: function (event, delta, revertFunc) {
//            moverTurno(event);
//        },
//        eventResize: function (event, delta, revertFunc) {
//            redimensionarTurno(event);
//        }
//    });
//
//    /**
//     * Muestra el formulario para agregar un nuevo turno de producción
//     * @param {type} start
//     * @param {type} end
//     * @returns {undefined}
//     */
//    function nuevoTurno(start, end) {
//        console.log('agregando turnos');
//
//        // se transfiere a los campos del formulario el rango seleccionado
//        $("#turno_produccion-start").val(start.format("YYYY-MM-DD HH:mm"));
//        $("#turno_produccion-end").val(end.format("YYYY-MM-DD HH:mm"));
//        
//        // se sincroniza el select del formulario de edición con el del calendario
//        var idMaquina = $("#turno_produccion-maquina2").val();
//        if (idMaquina !== 'todas') {
//            $("#turno_produccion-maquina").val(idMaquina);
//        } else {
//            $("#turno_produccion-maquina").val('0');
//        }
//
//        var formulario = $("#turno_produccion-dialog").dialog("option", "buttons", [
//            {
//                id: "btnGuardar", text: "Guardar", click: function () {
//                    agregarTurno(formulario);
//                }
//            },
//            {id: "btnCancelar", text: "Cancelar", icons: {primary: "ui-icon-close"}, click: function () {
//                    $(this).dialog("close");
//                }
//            }
//        ]).dialog("open");
//    }
//
//    /**
//     * Registra un nuevo turno de producción
//     * @param {type} formulario
//     * @returns {undefined}
//     */
//    function agregarTurno(formulario) {
//        var idMaquina = $("#turno_produccion-maquina").val();
//        var start = $("#turno_produccion-start").val();
//        var end = $("#turno_produccion-end").val();
//
//        // si start y end de los campos tiene dato, reemplazar lo que llega como argumentos
//        // si end es vacío, entonces start + 1 hora
//        if (idMaquina !== '0' && start && end) {
//            var datosTurno = {
//                maquina: idMaquina,
//                start: start,
//                end: end,
//                // y así sucesivamente para otros campos que hagan falta
//                title: $("#turno_produccion-maquina option:selected").text(),
//                color: $("#turno_produccion-maquina option:selected").attr('color')
//            };
//            $.post("controlador/fachada.php", {
//                clase: 'TurnoProduccion',
//                oper: 'agregarTurno',
//                turno: datosTurno
//            }, function (data) {
//                if (data.ok) {
//                    // argumento 3 > stick = true => persistirá en el calendario (no quiero eso)
//                    calendario.fullCalendar('renderEvent', datosTurno, false);
//                    calendario.fullCalendar('unselect');
//                    formulario.dialog("close");
//                } else {
//                    console.log(data);
//                }
//            }, "json").always(function () {
//                // $.unblockUI();
//            });
//        } else {
//            console.log('falló la inserción. Datos incompletos o erróneos');
//        }
//    }
//
//    /**
//     * Muestra el formulario para actualizar los datos de un turno de producción
//     * @param {type} evento
//     * @returns {undefined}
//     */
//    function actualizarTurno(evento) {
//        // se transfiere a los campos del formulario el evento seleccionado
//        $("#turno_produccion-maquina").val(evento.fk_maquina);
//        $("#turno_produccion-start").val(evento.start.format("YYYY-MM-DD HH:mm"));
//        $("#turno_produccion-end").val(evento.end.format("YYYY-MM-DD HH:mm"));
//
//        var formulario = $("#turno_produccion-dialog").dialog("option", "buttons", [
//            {
//                id: "btnActualizar", text: "Actualizar", click: function () {
//                    editarTurno(formulario, evento);
//                }
//            },
//            {
//                id: "btnEliminar", text: "Eliminar", click: function () {
//                    eliminarTurno(formulario, evento);
//                }
//            },
//            {id: "btnCancelar", text: "Cancelar", icons: {primary: "ui-icon-close"}, click: function () {
//                    $(this).dialog("close");
//                }
//            }
//        ]).dialog("open");
//    }
//
//    /**
//     * Registra los cambios realizados a un turno de producción
//     * @param {type} formulario
//     * @param {type} evento
//     * @returns {undefined}
//     */
//    function editarTurno(formulario, evento) {
//        var idMaquina = $("#turno_produccion-maquina").val();
//        var start = $("#turno_produccion-start").val();
//        var end = $("#turno_produccion-end").val();
//
//        // si start y end de los campos tiene dato, reemplazar lo que llega como argumentos
//        // si end es vacío, entonces start + 1 hora
//        if (idMaquina !== '0' && start && end) {
//            evento.fk_maquina = idMaquina;
//            evento.start = start;
//            evento.end = end;
//            // y así sucesivamente para otros campos
//            evento.title = $("#turno_produccion-maquina option:selected").text();
//            evento.color = $("#turno_produccion-maquina option:selected").attr('color');
//
//            $.post("controlador/fachada.php", {
//                clase: 'TurnoProduccion',
//                oper: 'actualizarTurno',
//                caso: 'actualizar',
//                turno: {
//                    id: evento.id,
//                    maquina: idMaquina,
//                    start: start,
//                    end: end
//                }
//            }, function (data) {
//                if (data.ok) {
//                    calendario.fullCalendar('updateEvent', evento);
//                    calendario.fullCalendar('unselect');
//                    formulario.dialog("close");
//                } else {
//                    console.log(data);
//                }
//            }, "json").always(function () {
//                // $.unblockUI();
//            });
//        } else {
//            console.log('falló la actualización. Datos incompletos o erróneos');
//        }
//        console.log(evento);
//    }
//
//    /**
//     * Elimina un turno de producción
//     * @param {type} formulario
//     * @param {type} evento
//     * @returns {undefined}
//     */
//    function eliminarTurno(formulario, evento) {
//        if (confirm('Confirme por favor el daño que va a hacer')) {
//            $.post("controlador/fachada.php", {
//                clase: 'TurnoProduccion',
//                oper: 'eliminarTurno',
//                idTurno: evento.id
//            }, function (data) {
//                if (data.ok) {
//                    calendario.fullCalendar('removeEvents', evento.id)
//                } else {
//                    console.log(data);
//                }
//            }, "json").always(function () {
//                // $.unblockUI();
//            });
//            formulario.dialog("close");
//        }
//    }
//
//    /**
//     * Registra el nuevo intervalo para un turno que se ha movido de lugar
//     * @param {type} evento
//     * @returns {undefined}
//     */
//    function moverTurno(evento) {
//        $.post("controlador/fachada.php", {
//            clase: 'TurnoProduccion',
//            oper: 'actualizarTurno',
//            caso: 'mover',
//            turno: {
//                id: evento.id,
//                start: evento.start.format(),
//                end: evento.end.format()
//            }
//        }, function (data) {
//            if (!data.ok) {
//                console.log(data);
//            }
//        }, "json").always(function () {
//            // $.unblockUI();
//        });
//    }
//
//    /**
//     * Registra el nuevo intervalo para un turno redimensionado
//     * @param {type} event
//     * @returns {undefined}
//     */
//    function redimensionarTurno(evento) {
//        $.post("controlador/fachada.php", {
//            clase: 'TurnoProduccion',
//            oper: 'actualizarTurno',
//            caso: 'redimensionar',
//            turno: {
//                id: evento.id,
//                end: evento.end.format()
//            }
//        }, function (data) {
//            if (!data.ok) {
//                console.log(data);
//            }
//        }, "json").always(function () {
//            // $.unblockUI();
//        });
//    }
//
//});