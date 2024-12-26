const ErrorSintactico = require("./ErrorSintactico");
const TablaOperaciones = require("./TablaOperaciones");
const Operacion = require ("../Modelos/Operacion");

class Parser {

    constructor(tokens) {
        this.Tokens = tokens;
        this.indice = 0;
        this.erroresSintacticos = [];
        this.constructorOperacion = "";
        this.tablaOperaciones = new TablaOperaciones();
    }

    tokenActual() {
        return this.Tokens[this.indice];
    }

    siguienteToken() {
        this.indice++;
    }

    esTipo(tipo) {
        return this.tokenActual()?.tipo === tipo;
    }

    esLexema(lexema) {
        return this.tokenActual()?.lexema === lexema;
    }

    esperar(tipo, lexema) {
        const token = this.tokenActual();
    
        if (token?.tipo !== tipo) { 
            this.registrarError(`Se esperaba un token de tipo '${tipo}', pero se encontró '${token?.tipo}'`);
            return;
        }
    
        if (lexema !== undefined && token?.lexema !== lexema) {
            this.registrarError(`Se esperaba un lexema '${lexema}', pero se encontró '${token?.lexema}'`);
            return;
        }

        if (!token) {
            this.registrarError(`Se esperaba un token de tipo '${tipo}', pero se encontró fin de archivo`);
            return;
        }
        
        this.constructorOperacion += token.lexema; 
        this.siguienteToken();
    }

    registrarError(mensaje) {
        const token = this.tokenActual();
        const error = `Error en línea ${token?.fila ?? "desconocida"}, columna ${token?.columna ?? "desconocida"}: ${mensaje}`;
        this.erroresSintacticos.push(new ErrorSintactico(error));
        this.siguienteToken();
    }

    sincronizar(conjuntoRecuperacion) {
        while (
            this.tokenActual() &&
            !conjuntoRecuperacion.includes(this.tokenActual().lexema) &&
            !conjuntoRecuperacion.includes(this.tokenActual().tipo)
        ) {
            this.siguienteToken();
        }
    }

    parse() {

            console.log('volvio entrar')
            switch (this.tokenActual().tipo) {
                case "OPERACIONES":
                    this.analizarOperaciones();
                    break;
                case "CONFIGURACIONESPARSE":
                    this.analizarConfiguracionesParse();
                    break;
                case "CONFIGURACIONESLEX":
                    this.analizarConfiguracionesLex();
                    break;
                case "FUNCIONES":
                    break;
                case "":
                    this.analizarFunciones();
                    break;
                default:
                    break;
            }
    }

    analizarOperaciones() {

        try {
            this.siguienteToken();
            this.esperar("OPERADOR_ASIGNACION"); 
            this.esperar("SIMBOLO_DELIMITADOR" , "[");
            this.analizarArregloOperaciones(); 
        } catch (error) {
            this.registrarError(error.message);
        }
    }
    
    analizarArregloOperaciones() {
        // si una operacion resulta en error aca se mete en el catch
        
        this.analizarOperacion();
        console.log('depurar' , this.tokenActual().lexema)
        if (this.tokenActual().lexema === ',' && this.Tokens[this.indice + 1] && this.Tokens[this.indice + 1].lexema === ']' ) {
            this.parse();
        }
        else if(this.tokenActual().lexema === ','){
            this.siguienteToken();
            this.analizarArregloOperaciones();
        }else if (this.tokenActual().lexema === ']') {
            this.parse();
        }else{
            this.registrarError('Vaina que no existe');
        }
    }

    analizarOperacion() {

            this.constructorOperacion = "";
            this.esperar("SIMBOLO_DELIMITADOR", "{");
            this.esperar("OPERACION");
            this.esperar("SIMBOLO_DELIMITADOR", ":");
    
            if (!["OPERACION_ARITMETICA", "OPERACION_TRIGONOMETRICA"].includes(this.tokenActual()?.tipo)) {
                this.registrarError("Operación inválida: tipo de operación no reconocido");
            }
            this.constructorOperacion += this.tokenActual().lexema;
            this.siguienteToken();
    
            this.esperar("SIMBOLO_DELIMITADOR", ",");
            this.esperar("ID_OPERACION");
            this.esperar("SIMBOLO_DELIMITADOR",":");
            this.esperar("CADENA");
            this.esperar("SIMBOLO_DELIMITADOR",",");
            this.esperar("ID_VALOR_1");
            this.esperar("SIMBOLO_DELIMITADOR",":");

            if (this.esTipo("VALOR_NUMERICO")) {
                this.constructorOperacion += this.tokenActual().lexema;
                this.siguienteToken();
                
            }else if (this.tokenActual().lexema === "[") {
                this.constructorOperacion += this.tokenActual().lexema;
                this.siguienteToken();
                this.analizarOperacionAnidada();
            }else{
                this.registrarError("Valor1 inválido");
            }


            if(this.tokenActual().lexema === "," ){
                this.constructorOperacion += this.tokenActual().lexema;
                this.siguienteToken(); 
                this.esperar("ID_VALOR_2");
                this.esperar("SIMBOLO_DELIMITADOR", ":");
        
                if (this.esTipo("VALOR_NUMERICO")) {
                    this.constructorOperacion += this.tokenActual().lexema;
                    this.siguienteToken();
    
                }else if (this.tokenActual().lexema === "[") {
                    this.constructorOperacion += this.tokenActual().lexema;
                    this.siguienteToken();
                    this.analizarOperacionAnidada();
                }else{
                    this.registrarError("Valor1 inválido");
                }
            }
            this.esperar("SIMBOLO_DELIMITADOR", "}");
            this.tablaOperaciones.agregarOperacion(this.constructorOperacion);
    }

    analizarOperacionAnidada() {

            this.esperar("SIMBOLO_DELIMITADOR", "{");
            this.esperar("OPERACION");
            this.esperar("SIMBOLO_DELIMITADOR", ":");

            if (!["OPERACION_ARITMETICA", "OPERACION_TRIGONOMETRICA"].includes(this.tokenActual()?.tipo)) {
                this.registrarError("Operación inválida: tipo de operación no reconocido");
            }
            this.siguienteToken();
            this.esperar("SIMBOLO_DELIMITADOR", ",");

            if (this.tokenActual().tipo === "ID_OPERACION") {
                this.registrarError("Las operaciones anidadas no deben contener un nombre");
            }

            this.esperar("ID_VALOR_1");
            this.esperar("SIMBOLO_DELIMITADOR", ":");

            if (this.esTipo("VALOR_NUMERICO")) {
                this.constructorOperacion += this.tokenActual().lexema;
                this.siguienteToken();
            }else if (this.tokenActual().lexema === "[") {
                this.constructorOperacion += this.tokenActual().lexema;
                this.siguienteToken();
                this.analizarOperacionAnidada();
            }else{
                this.registrarError("Valor1 inválido");
            }

            if(this.tokenActual().lexema === "," ){
                this.constructorOperacion += this.tokenActual().lexema;
                this.siguienteToken(); 
                this.esperar("ID_VALOR_2");
                this.esperar("SIMBOLO_DELIMITADOR", ":");
        
                if (this.esTipo("VALOR_NUMERICO")) {
                    this.constructorOperacion += this.tokenActual().lexema;
                    this.siguienteToken();
    
                }else if (this.tokenActual().lexema === "[") {
                    this.constructorOperacion += this.tokenActual().lexema;
                    this.siguienteToken();
                    this.analizarOperacionAnidada();
                }else{
                    this.registrarError("Valor1 inválido");
                }
            }

            this.esperar("SIMBOLO_DELIMITADOR", "}");
            this.esperar("SIMBOLO_DELIMITADOR", "]");
    }

    analizarConfiguracionesLex() {
    
    }

    analizarFunciones() {

    }

    analizarConfiguracionesParse() {

    }
}

module.exports = Parser;

