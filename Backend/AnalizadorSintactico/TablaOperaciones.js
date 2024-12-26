class TablaOperaciones{

    constructor(){
        this.operacionesPadre = [];
    }

    agregarOperacion(operacion){
        this.operacionesPadre.push(operacion);
    }

    obtenerTextoOperaciones() {
        return JSON.stringify(this.operacionesPadre, null, 2);
    }

      

}

module.exports = TablaOperaciones;