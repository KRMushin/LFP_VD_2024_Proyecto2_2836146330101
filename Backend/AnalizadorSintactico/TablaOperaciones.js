class TablaOperaciones{

    constructor(){
        this.operacionesPadre = [];
    }

    agregarOperacion(operacion){
        this.operacionesPadre.push(operacion);
    }

}

module.exports = TablaOperaciones;