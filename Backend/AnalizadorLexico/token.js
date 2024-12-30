class Token {

    constructor(tipo, lexema, fila, columna) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
    }
}

module.exports = Token;
