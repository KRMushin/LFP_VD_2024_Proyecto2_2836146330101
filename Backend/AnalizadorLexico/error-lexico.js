class ErrorLexico {

    constructor(tipo, lexema, fila, columna, estadoError, caracterError) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
        this.estadoError = estadoError;
        this.caracterError = caracterError;
    }
}

module.exports = ErrorLexico;