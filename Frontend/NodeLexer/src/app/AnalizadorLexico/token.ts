class Token {
    tipo: string;
    lexema: string;
    fila: number;
    columna: number;

    constructor(tipo: string, lexema: string, fila: number, columna: number) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
    }
}

export default Token;