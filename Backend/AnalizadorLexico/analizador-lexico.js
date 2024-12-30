const GeneradorTokens = require('./generador-tokens');
const TablaTransiciones = require('./tabla-transiciones');

class AnalizadorLexico {

    constructor() {

        this.generadorTokens = new GeneradorTokens();
        this.comentarios = [];

        this.estadosAceptacion = [
            'qPRESERVADA',
            'qCONFIGURACION',
            'qOARITMETICA',
            'qOTRIGONOMETRICA',
            'qNDECIMAL',
            'qNENTERO',
            'qOPERACION',
            'qSIMBOLO',
            'qIDVALOR1',
            'qIDVALOR2',
            'qTEXTO',
            'qFORMA',
            'qFUENTE',
            'qFONDO',
            'qCOLOR',
            'qFORMAVAL',
            'qVALORNUMERICO',
            'qASIGNACION',
            'qNOMBRE',
            'qCOSIMPLE',
            'qTIPOFUENTE',
            'qFUNCION',
            'qCOCOMPLEJO'
        ];

        this.delimitadores = ['(', ')', '[', ']', ';', ':', '{', '}', ',', '\n', ' '];
        this.delimitadoresNumericos = ['(', ')', '[', ']', ';', ':', '{', '}', ',', '\n', ' ', '\t'];
    }

    analizarEntrada(cadena){
        let estadoActual = "q0";
        let tokenActual = "";
        const tokens = [];
        const listaErrores = [];
        let fila = 1;
        let columna = 1;

        for (let i = 0; i < cadena.length; i++) {
            const char = cadena[i].toLowerCase();
            // tabla de transiciones estatica
            const transiciones = TablaTransiciones.tablaDeTransiciones[estadoActual];
            if (!transiciones) {
                estadoActual = "q0";
                tokenActual = "";
                continue;
            }

            const siguienteEstado = transiciones[char];

            if (char === "\n" && siguienteEstado !== 'qVALORNUMERICO') {
                fila++;
                columna = 1;
                continue;
            }
            
            if ((char === " " || char === "\t") && siguienteEstado !== 'qVALORNUMERICO') {
                columna++;
                continue;
            }

            if (siguienteEstado === 'qCOSIMPLE') {

                while (cadena[i] !== '\n' && i < cadena.length) {
                    tokenActual += cadena[i];
                    i++;
                }
                tokens.push(
                    this.generadorTokens.creadorToken(siguienteEstado, tokenActual.trim(), fila, columna - 1)
                );
                // tokens.push();
                estadoActual = "q0";
                tokenActual = "";
                fila++;
                columna = 0;
                continue;
            }
            if (siguienteEstado === 'qCOCOMPLEJO') {
                let comentarioComplejo = "/";
                const columnaEncontrado = columna;
                const filaEncontrado = fila;
                let comentarioValido = false; 
                let inicioColumna = columna;
            
                while (i < cadena.length) {
                    const char = cadena[i];
                    comentarioComplejo += char;
                    if (char === '\n') {
                        fila++;
                        columna = 0;
                    } else {
                        columna++;
                    }
            
                    if (char === '*' && cadena[i + 1] === '/') {
                        comentarioComplejo += '/'; 
                        i++; 
                        columna++;
                        comentarioValido = true;
                        break;
                    }
            
                    i++;
                }
            
                if (comentarioValido) {
                    console.log(comentarioComplejo)
                    tokens.push(
                        this.generadorTokens.creadorToken('qCOCOMPLEJO',comentarioComplejo.trim(),filaEncontrado,columnaEncontrado)
                    );
                } else {
                    console.log(comentarioComplejo , 'error')
                    listaErrores.push(
                        this.generadorTokens.creadorTokenError(comentarioComplejo.trim(),filaEncontrado,columnaEncontrado,'qCOCOMPLEJO',"Comentario complejo sin cierre")
                    );
                }
            
                estadoActual = "q0";
                tokenActual = "";
                continue;
            }

            if (siguienteEstado === 'qCOLOR') {
                tokens.push(this.generadorTokens.creadorToken(siguienteEstado, tokenActual + char, fila, columna - tokenActual.length));
                estadoActual = "q0";
                tokenActual = ""; 
                continue;
            }

            if (siguienteEstado === 'qASIGNACION') {
                tokens.push(this.generadorTokens.creadorToken(siguienteEstado, char, fila, columna));
                estadoActual = "q0";
                tokenActual = "";
                columna++;
                continue;
            }
            
            if (siguienteEstado === 'qSIMBOLO') {
                tokens.push(this.generadorTokens.creadorToken(siguienteEstado, char, fila, columna));
                estadoActual = "q0";
                columna++;
                continue;
            }

            if (this.estadosAceptacion.includes(siguienteEstado)) {
                
                if (tokenActual.length > 0) {
                    if (!this.delimitadores.includes(char)) {
                        tokenActual += char;
                    }
                    
                    if (siguienteEstado !== 'qVALORNUMERICO') {
                        tokens.push(this.generadorTokens.creadorToken(siguienteEstado, tokenActual, fila, columna - tokenActual.length + 1));
                    } else {
                        tokens.push(this.generadorTokens.creadorToken(siguienteEstado, tokenActual, fila, columna - tokenActual.length));
                    }

                    estadoActual = "q0";
                    tokenActual = "";
                }

                if (siguienteEstado === "qVALORNUMERICO" && this.delimitadoresNumericos.includes(char)) {
                    if (char === '\n') {
                        fila++;
                        columna = 1;
                        continue;
                    }

                    if (char === ' ' || char === '\t') {
                        columna++;
                        continue;
                    }
                    tokens.push(this.generadorTokens.creadorToken('qSIMBOLO', char, fila, columna));
                }

                estadoActual = "q0";

            } else if (siguienteEstado) {
                estadoActual = siguienteEstado;
                tokenActual += char;
            } else {

                if (tokenActual.length > 0 && tokenActual.charAt(0) === '\"') {
                    let col = columna; 
                    let esCadenaValida = false; 
                
                    while (i < cadena.length) {
                        tokenActual += cadena[i];
                
                        if (cadena[i] === '\n') {
                            listaErrores.push(this.generadorTokens.creadorTokenError(
                                tokenActual, fila, col, estadoActual, "Cadena sin cierre antes del salto de línea"
                            ));
                            fila++;
                            columna = 0;
                            estadoActual = "q0";
                            tokenActual = "";
                            break;
                        }
                        if (cadena[i] === '\"') {
                            esCadenaValida = true;
                            break;
                        }
                        columna++;
                        i++;
                    }
                
                    if (esCadenaValida) {
                        tokens.push(this.generadorTokens.creadorToken('qCADENA', tokenActual, fila, col));
                
                    }
                    estadoActual = "q0";
                    tokenActual = "";
                    continue;
                }
                
                
                else{
                    const { i: nuevoIndice, indicesAvanzados, filasAvanzadas, lexemaError } = this.recuperarYAnalizarError(cadena, tokenActual, i);
                    listaErrores.push(this.generadorTokens.creadorTokenError(lexemaError, fila, columna, estadoActual, char));
    
                    columna += indicesAvanzados;
                    if (filasAvanzadas > 0) {
                        columna = 0;
                    }
    
                    fila += filasAvanzadas;
                    estadoActual = "q0";
                    tokenActual = "";
                    i = nuevoIndice;
                }
            }

            columna++;
        }

        if (!(this.estadosAceptacion.includes(estadoActual)) && tokenActual.length > 0) {
            listaErrores.push(this.generadorTokens.creadorTokenError(tokenActual, fila, columna - tokenActual.length, estadoActual, cadena[cadena.length - 1]));
        }

        tokens.push(this.generadorTokens.creadorToken('EOF', 'EOF', -1, -1));
        return { tokens, listaErrores };
    }

    recuperarYAnalizarError(cadenaEntrada, tokenActual, indice) {
        let lexemaError = tokenActual;
        let indicesAvanzados = 0;
        let filasAvanzadas = 0;

        while (indice < cadenaEntrada.length) {
            const char = cadenaEntrada[indice];
            lexemaError = lexemaError + char;

            if (char === '\n') {
                filasAvanzadas++;
            }

            if (char === '"' || char === " " || char === "\n" || this.delimitadores.includes(char)) {
                return { i: indice, indicesAvanzados, filasAvanzadas, lexemaError };
            }
            indice++;
            indicesAvanzados++;
        }
        return { i: indice, indicesAvanzados, filasAvanzadas, lexemaError };
    }
}

module.exports = AnalizadorLexico;