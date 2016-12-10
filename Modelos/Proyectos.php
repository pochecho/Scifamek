<?php

include 'General.php';

class Proyectos extends General {

    function consultarProyecto($params) {
        extract($params);
        $consulta = "SELECT * FROM proyecto where codigo = " . $parametros['codigo'];
        $cadena = $this->consultar($conexion, $consulta);
        echo json_encode($cadena);
    }

    function consultarObjetivosPorCodigo($params) {
        extract($params);
        $consulta = "SELECT * FROM objetivos_de_proyecto where codigo_proyecto = " . $parametros['codigo'];
        
        $cadena = $this->consultar($conexion, $consulta);
        echo json_encode($cadena);
    }

    function consultarServiciosPorCodigo($params) {
        extract($params);
        $consulta = "SELECT s.nombre, s.descripcion, s.costo FROM servicios s, proyecto_servicios ps WHERE s.codigo = ps.codigo_servicio AND ps.codigo_proyecto = " . $parametros['codigo'];
        error_log($consulta);
        $cadena = $this->consultar($conexion, $consulta);
        echo json_encode($cadena);
    }

    function consultarActividadesPorCodigo($params) {
        extract($params);
        $consulta = "SELECT a.nombre, a.descripcion, a.fecha_inicio,a.fecha_fin, a.estado FROM actividades a, actividades_objetivos ao, objetivos_de_proyecto op WHERE op.codigo = ao.codigo_objetivos_de_proyecto AND a.codigo = ao.codigo_actividades AND op.codigo_proyecto = " . $parametros['codigo'];
        $cadena = $this->consultar($conexion, $consulta);
        echo json_encode($cadena);
    }

    function consultarRepresentantes($params) {
        extract($params);
        $consulta = "SELECT  c.nombre, pc.grado_representacion FROM clientes c, proyecto_clientes pc WHERE pc.cedula_cliente = c.cedula and pc.codigo_proyecto = " . $parametros['codigo'];
        $cadena = $this->consultar($conexion, $consulta);
        echo json_encode($cadena);
    }

    function consultarProyectosCliente($params) {
        extract($params);
        $consulta = "select distinct(p.*) from clientes c,proyecto_clientes pc,proyecto p where c.cedula=pc.cedula_cliente and pc.codigo_proyecto=p.codigo and c.cedula='" . $_SESSION['cedula'][0] . "'";
        $cadena = $this->consultar($conexion, $consulta);
        echo json_encode($cadena);
    }

}
