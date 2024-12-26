// esta clase tabla contiene varias instancias de operaciones
class TablaOperaciones{

    constructor(nombreTabla){
        this.nombreTabla = nombreTabla;
        this.operaciones = [];
    }

    // aca se agregan los objetos de tipo operacion
    agregarOperacion(operacion){
        this.operaciones.push(operacion);
    }

    agregarNombreTabla(nombreTabla){
        this.nombreTabla = nombreTabla;
    }

}

module.exports =  TablaOperaciones;


