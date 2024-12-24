class ErrorLexico {
    tipo: string;
    lexema: string;
    fila: number;
    columna: number;
    estadoError: string;
    caracterError: string;

    constructor(tipo: string, lexema: string, fila: number, columna: number, estadoError: string, caracterError: string) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.fila = fila;
        this.columna = columna;
        this.estadoError = estadoError;
        this.caracterError = caracterError;
    }
}

export default ErrorLexico;