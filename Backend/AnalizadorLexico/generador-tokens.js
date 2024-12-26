const ErrorLexico = require("./error-lexico");
const Token = require("./token");

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
    
    creadorToken(estadoAceptacion, lexema, fila, columna){
        const tipoToken = this.obtenerToken(estadoAceptacion, lexema);
        return new Token(tipoToken, lexema, fila, columna);
    }

    creadorTokenError(lexema, fila, columna, estadoError, caracterError) {
        return new ErrorLexico("ERROR_LEXICO", lexema, fila, columna, estadoError, caracterError);
    }

    obtenerToken(estadoAceptacion, lexema) {
        switch (estadoAceptacion) {
            case "qPRESERVADA":
                return "PALABRA_RESERVADA";
            case "qCONFIGURACION RESERVADA":
                return "CONFIGURACION";
            case "qOARITMETICA":
                return "OPERACION_ARITMETICA";
            case "qOTRIGONOMETRICA":
                return "OPERACION_TRIGONOMETRICA";
            case "qNDECIMAL":
                return "NUMERO_DECIMAL";
            case "qNENTERO":
                return "NUMERO_ENTERO";
            case "qOPERACION":
                return "OPERACION";
            case "qSIMBOLO":
                return "SIMBOLO_DELIMITADOR";
            case "qIDVALOR1":
                return "ID_VALOR_1";
            case "qIDVALOR2":
                return "ID_VALOR_2";
            case "qTEXTO":
                return "PALABRA_RESERVADA";
            case "qFORMA":
                return "CONFIGURACION";
            case "qFUENTE":
                return "CONFIGURACION";
            case "qFONDO":
                return "CONFIGURACION";
            case "qCOLOR":
                return "COLOR_HEX";
            case "qFORMAVAL":
                return "FORMA_NODO";
            case "qCOLORF":
                return "COLOR_TEXTO";
            case "qVALORNUMERICO":
                return "VALOR_NUMERICO"; 
            case "qASIGNACION":
                return "OPERADOR_ASIGNACION";
            case "qCOSIMPLE":
                return "COMENTARIO_SIMPLE";
            case "qTIPOFUENTE":
                return "CONFIGURACION";
            case "qCADENA":
                return "CADENA";
            case "qFUNCION":
                return "FUNCION";    
            case "qNOMBRE":
                return "ID_OPERACION";
            case "qCONFIGURACION":
                switch (lexema) {
                    case "operaciones":
                        return "OPERACIONES"
                    case "configuracioneslex":
                        return "CONFIG_LEX"
                    case "configuracionesparser":
                        return "CONFIG_PARSER"
                    default:
                        return "NO_SE_DEFINIO_XD";
                }
            case "EOF":
                return "EOF";    
            default:
                return "NO_SE_DEFINIO_XD";
        }
    }
}

module.exports = GeneradorTokens;
