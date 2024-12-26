const ErrorSintactico = require("./ErrorSintactico");
const TablaOperaciones = require("./TablaOperaciones");
const Operacion = require ("../Modelos/Operacion");
const ConfiguracionesLex = require("./ConfiguracionesLex");
const ConfiguracionesParse = require("./ConfiguracionesParse");

const FuncionesReconocidas = {
    imprimir: (param) => console.log(param),
    conteo: () => console.log("Conteo realizado"),
    promedio: (param) => console.log(`Promedio de ${param}`),
    max: (param) => console.log(`Máximo de ${param}`),
    min: (param) => console.log(`Mínimo de ${param}`),
    generarreporte: (...params) => console.log(`Generando reporte con ${params.join(", ")}`),
};


class Parser {

    constructor(tokens) {
        this.Tokens = tokens;
        this.indice = 0;
        this.erroresSintacticos = [];
        this.erroresSintacticosConfigs = [];
        this.constructorOperacion = "";
        this.tablaOperaciones = new TablaOperaciones();
        this.FuncionesGuardadas = [];

        this.configuracionesLex = new ConfiguracionesLex();
        this.configuracionesParse = new ConfiguracionesParse();
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
    registrarErrorConfig(mensaje) {
        const token = this.tokenActual();
        const error = `Error en línea ${token?.fila ?? "desconocida"}, columna ${token?.columna ?? "desconocida"}: ${mensaje}`;
        this.erroresSintacticosConfigs.push(new ErrorSintactico(error));
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

        while (this.tokenActual().tipo !== 'EOF') {
            switch (this.tokenActual().tipo) {
                case "OPERACIONES":
                    this.analizarOperaciones();
                    break;
                case "CONFIG_PARSE":
                    this.analizarConfiguracionesParse();
                    break;
                case "CONFIG_LEX":
                    this.analizarConfiguracionesLex();
                    break;
                case "FUNCION":
                    this.analizarFunciones();
                    break;
                default:
                    this.siguienteToken();
                    this.parse();
                    break;
            }
        }
            // if(this.tokenActual().tipo === 'EOF'){
            //     return;
            // }

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
        if (this.tokenActual().lexema === ',' && this.Tokens[this.indice + 1] && this.Tokens[this.indice + 1].lexema === ']' ) {
            this.siguienteToken();
            this.siguienteToken();
            this.parse();
        }
        else if(this.tokenActual().lexema === ','){
            this.siguienteToken();
            this.analizarArregloOperaciones();
        }else if (this.tokenActual().lexema === ']') {
            this.siguienteToken();
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
    
    /*
        AREA DE CONFIGURACIONES PARA LAS FORMAS DEL GRAPHVIZ :3
    */
    analizarConfiguracionesLex() {
        this.analizarArregloConfiguraciones("LEX");
    }
        
    analizarConfiguracionesParse() {
        this.analizarArregloConfiguraciones("PARSE");
    }
        

    analizarArregloConfiguraciones(modoConfigs) {
        this.siguienteToken(); 
        this.esperarConfig("OPERADOR_ASIGNACION")
        this.esperarConfig("SIMBOLO_DELIMITADOR", "[");
        this.a(modoConfigs);
        this.esperarConfig("SIMBOLO_DELIMITADOR", "]"); 
    }
    a(modoConfigs){
        this.analizarConfiguraciones(modoConfigs);
        console.log(this.tokenActual(), 'depura');
        if (this.tokenActual()?.lexema === ",") {
            this.siguienteToken();
            this.a(modoConfigs);
        }
    }

    analizarConfiguraciones(modoConfigs) {
        const nombreConfiguracion = this.tokenActual()?.lexema;

        this.esperarConfig("CONFIGURACION");

        if (this.esperarConfig("SIMBOLO_DELIMITADOR", ":")) {
            const valor = this.tokenActual()?.lexema;
            console.log(valor);
            switch (nombreConfiguracion) {
                case "forma":
                        if (this.esperarConfig("FORMA_NODO")) {
                            this.actualizarConfiguraciones(modoConfigs, "forma", valor);
                        }
                        break;
                    case "fondo":
                        if (this.esperarConfig("COLOR_HEX")) {
                            this.actualizarConfiguraciones(modoConfigs, "fondo", valor);
                        }
                        break;
                case "tipofuente":
                        if (this.esperarConfig("CADENA")) {
                            this.actualizarConfiguraciones(modoConfigs, "tipofuente", valor);
                        }
                        break;
                case "fuente":
                        if (this.esperarConfig("COLOR_HEX")) {
                            this.actualizarConfiguraciones(modoConfigs, "fuente", valor);
                        }
                    break;
                default:
                    this.erroresSintacticosConfigs.push(new ErrorSintactico(`Configuración desconocida: ${nombreConfiguracion}`));
                    break;
            }
        };
    }

    actualizarConfiguraciones(tabla, token, lexema) {
        switch (token) {
            case "fondo":
                if (tabla === "LEX") {
                    this.configuracionesLex.cambiarFondo(lexema);
                } else {
                    this.configuracionesParse.cambiarFondo(lexema);
                }
                break;
            case "fuente":
                if (tabla === "LEX") {
                    this.configuracionesLex.cambiarFuente(lexema);
                } else {
                    this.configuracionesParse.cambiarFuente(lexema);
                }
                break;
            case "forma":
                if (tabla === "LEX") {
                    this.configuracionesLex.cambiarForma(lexema);   
                }else {
                    this.configuracionesParse.cambiarForma(lexema);
                }
                break;
            case "tipofuente":
                if (tabla === "LEX") {
                    this.configuracionesLex.cambiarTipoFuente(lexema);
                } else {
                    this.configuracionesParse.cambiarTipoFuente(lexema);
                }
                break;
            default:
                this.registrarErrorConfig(`Configuración léxica desconocida: ${nombre}`);
        }
    }
    esperarConfig(tipo, lexema) {
        const token = this.tokenActual();
    
        if (token?.tipo !== tipo) { 
            this.registrarErrorConfig(`Se esperaba un token de tipo '${tipo}', pero se encontró '${token?.tipo}'`);
            return false;
        }
        if (lexema !== undefined && token?.lexema !== lexema) {
            this.registrarErrorConfig(`Se esperaba un lexema '${lexema}', pero se encontró '${token?.lexema}'`);
            return false;
        }
        if (!token) {
            this.registrarErrorConfig(`Se esperaba un token de tipo '${tipo}', pero se encontró fin de archivo`);
            return false;
        }
        this.siguienteToken();
        return true;
    }

    analizarFunciones() {
        const nombreFuncion = this.tokenActual()?.lexema;
        const fila = this.tokenActual()?.fila;
        const columna = this.tokenActual()?.columna;
    
        this.esperar("FUNCION");
        this.esperar("SIMBOLO_DELIMITADOR", "(");
    
        const parametros = this.analizarParametros();
        this.esperar("SIMBOLO_DELIMITADOR", ")");
    
        if (FuncionesReconocidas[nombreFuncion]) {
            FuncionesReconocidas[nombreFuncion](...parametros);
    
            this.FuncionesGuardadas.push({
                nombre: nombreFuncion,
                parametros,
                ubicacion: { fila, columna }
            });
        } else {
            this.registrarError(`Función desconocida: ${nombreFuncion}`);
        }
    }
    
    
    analizarParametros(lista = []) {
        if (this.tokenActual()?.tipo === "SIMBOLO_DELIMITADOR" && this.tokenActual()?.lexema === ")") {
            return lista;
        }
    
        if (["CADENA", "OPERACION_ARITMETICA", "ID"].includes(this.tokenActual()?.tipo)) {
            lista.push(this.tokenActual()?.lexema);
            this.siguienteToken();
        } else if (this.tokenActual()?.lexema === ",") {
            this.siguienteToken();
        } else {
            this.registrarError("Parámetro no válido en la función");
            return lista;
        }
    
        return this.analizarParametros(lista);
    }
    
    
    

}

module.exports = Parser;

