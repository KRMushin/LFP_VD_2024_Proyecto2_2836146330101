import ErrorLexico from "./error-lexico";
import Token from "./token";

/*

    Palabras reservadas             --> token de aceptacion = qPR
    Configuraciones                 --> token de aceptacion = qC
    Operaciones aritmeticas         --> token de aceptacion = qOA
    Operaciones trigonometricas     --> token de aceptacion = qOT
    Numero decimal                  --> token de aceptacion = qND
    Numero entero                   --> token de aceptacion = qNE
    Operaciones                     --> token de aceptacion = qOP

*/

class GeneradorTokens {

    constructor(){}
    
    public creadorToken(estadoAceptacion: string, lexema: string, fila: number, columna: number): Token {
        const tipoToken = this.obtenerToken(estadoAceptacion);
        return new Token(tipoToken, lexema, fila, columna);
    }

    public creadorTokenError(lexema: string, fila: number, columna: number, estadoError: string, caracterError: string): ErrorLexico {
        return new ErrorLexico("ERROR_LEXICO", lexema, fila, columna, estadoError, caracterError);
    }

    private obtenerToken(estadoAceptacion: string): string {
        switch (estadoAceptacion) {
            case "qPRESERVADA":
                return "PALABRA RESERVADA";
            case "qCONFIGURACION RESERVADA":
                return "CONFIGURACION";
            case "qOARITMETICA":
                return "OPERACION ARITMETICA";
            case "qOTRIGONOMETRICA":
                return "OPERACION TRIGONOMETRICA";
            case "qNDECIMAL":
                return "NUMERO_DECIMAL";
            case "qNENTERO":
                return "NUMERO_ENTERO";
            case "qOPERACION":
                return "OPERACION";
            case "qSIMBOLO":
                return "SIMBOLO DELIMITADOR";
            case "qIDVALOR1":
                return "IDENTIFICADOR VALOR 1";
            case "qIDVALOR2":
                return "IDENTIFICADOR VALOR 2";
            case "qTEXTO":
                return "PALABRA RESERVADA";
            case "qFORMA":
                return "CONFIGURACION";
            case "qFUENTE":
                return "CONFIGURACION";
            case "qFONDO":
                return "CONFIGURACION";
            case "qCOLOR":
                return "COLOR NODO";
            case "qFORMAVAL":
                return "FORMA NODO";
            case "qCOLORF":
                return "COLOR TEXTO";
            case "qVALORNUMERICO":
                return "VALOR NUMERICO"; 
            case "qASIGNACION":
                return " OPERADOR ASIGNACION";
            case "qCOSIMPLE":
                return "COMENTARIO SIMPLE";
            case "qTIPOFUENTE":
                return "TIPO FUENTE";
            case "qCADENA":
                return "CADENA JEJEJ";
            default:
                return "NO_SE_DEFINIO_XD";
        }
    }
}

export { GeneradorTokens, Token, ErrorLexico };
