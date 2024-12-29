class TablaOperaciones{

    constructor(){
        this.operacionesPadre = [];
        this.operacionesClasificacion = {};
    }

    agregarOperacion(operacion){
        this.operacionesPadre.push(operacion);
    }

    obtenerTextoOperaciones() {
        return JSON.stringify(this.operacionesPadre, null, 2);
    }

    agregarDiccionarioOperaciones(operaciones){
        this.operacionesClasificacion = operaciones;
    }

}

module.exports = TablaOperaciones;