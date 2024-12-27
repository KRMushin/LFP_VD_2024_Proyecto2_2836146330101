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
        this.erroresSintacticosFunc = [];

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
    }
    registrarErrorConfig(mensaje) {
        const token = this.tokenActual();
        const error = `Error en línea ${token?.fila ?? "desconocida"}, columna ${token?.columna ?? "desconocida"}: ${mensaje}`;
        this.erroresSintacticosConfigs.push(new ErrorSintactico(error));
    }

    registrarErrorFunc(mensaje) {
        const token = this.tokenActual();
        const error = `Error en línea ${token?.fila ?? "desconocida"}, columna ${token?.columna ?? "desconocida"}: ${mensaje}`;
        this.erroresSintacticosFunc.push(new ErrorSintactico(error));
    }

    parse() {
        
        while (this.tokenActual()?.tipo !== 'EOF') {
            switch (this.tokenActual()?.tipo) {
                case "OPERACIONES":
                    this.analizarOperaciones();
                    break;
                case "CONFIG_PARSER":
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
                    break;
            }
        }
    }
    
    analizarOperaciones() {
        this.siguienteToken();
        this.esperar("OPERADOR_ASIGNACION"); 
        this.esperar("SIMBOLO_DELIMITADOR" , "[");
        this.analizarArregloOperaciones(); 
    }
    analizarArregloOperaciones() {
        this.analizarOperacion();
        if (this.tokenActual().lexema === ',' && this.Tokens[this.indice + 1] && this.Tokens[this.indice + 1].lexema === ']' ) {
            return;
        }
        else if(this.tokenActual().lexema === ','){
            this.siguienteToken();
            this.analizarArregloOperaciones();
        }else if (this.tokenActual().lexema === ']') {
            this.siguienteToken();
            return;
        }else{
            this.registrarError('Vaina que no existe');
        }
    }

    analizarOperacion() {
        this.constructorOperacion = "";
        let numeroErrores = 0;
        const elementos = {}; 
        
        this.esperar("SIMBOLO_DELIMITADOR", "{");

        while (this.tokenActual()?.lexema !== "}") {

            const clave = this.tokenActual()?.tipo;
            this.constructorOperacion += this.tokenActual()?.lexema;
            this.siguienteToken();
            this.esperar("SIMBOLO_DELIMITADOR", ":");
                
            if (clave === "OPERACION" && ["OPERACION_ARITMETICA", "OPERACION_TRIGONOMETRICA"].includes(this.tokenActual()?.tipo)) {
                elementos.operacion = this.tokenActual().lexema;
                this.constructorOperacion += this.tokenActual().lexema;
            } else if (clave === "ID_OPERACION" && this.esTipo("CADENA")) {
                elementos.nombre = this.tokenActual().lexema;
                this.constructorOperacion += this.tokenActual().lexema;
            } else if (clave === "ID_VALOR_1" && (this.esTipo("VALOR_NUMERICO") || this.tokenActual().lexema === "[")) {
                elementos.valor1 = this.tokenActual().lexema;
                this.constructorOperacion += this.tokenActual().lexema;
                
                if (this.tokenActual().lexema === "[") {
                    this.siguienteToken();
                    if (!this.analizarOperacionAnidada()) {
                        numeroErrores++;
                    }
                }
                
            } else if (clave === "ID_VALOR_2" && (this.esTipo("VALOR_NUMERICO") || this.tokenActual().lexema === "[")) {
                elementos.valor2 = this.tokenActual().lexema;
                this.constructorOperacion += this.tokenActual().lexema;
                if (this.tokenActual().lexema === "[") {
                    this.siguienteToken();
                    //aca si devuelve false es porque no obtuvo ninguna buena respuesta aumentar los errores
                    if (!this.analizarOperacionAnidada()) {
                        numeroErrores++;
                    }
                }
            } else {
                numeroErrores++;
                this.registrarError(`Error en una de las palabras reservadas: ${clave}`);
            }
            
            this.siguienteToken(); 

            if (this.tokenActual()?.lexema === ",") {
                this.constructorOperacion += this.tokenActual().lexema;
                this.siguienteToken(); 
            }else if (this.tokenActual()?.lexema === "}") {
                break;
            }else if (this.tokenActual()?.lexema === "{") {
                numeroErrores++;
                this.registrarError(" posiblemente no se cerro correctamente la operacion :D");
                break;
            }
            else{
                numeroErrores++;
                this.registrarError("Se esperaba una coma o un cierre de llave");
                this.siguienteToken();
            }

        }
        this.esperar("SIMBOLO_DELIMITADOR", "}");
    
        if (!elementos.operacion || !elementos.nombre || !elementos.valor1) {
            numeroErrores++;
            this.registrarError("Faltan elementos obligatorios para que la operacion sea correcta :D");
        }

        if (numeroErrores <= 0) {
                console.log('operacion valida' , elementos)
                this.tablaOperaciones.agregarOperacion(this.constructorOperacion);
        }
    }

    analizarOperacionAnidada() {

            const elementosAnidados = {};
            let numeroErrores = 0;

            this.esperar("SIMBOLO_DELIMITADOR", "{");
            while (this.tokenActual()?.lexema !== "}") {
                
                const reservada = this.tokenActual().tipo;
                this.constructorOperacion += this.tokenActual().lexema;
                this.siguienteToken();

                this.esperar("SIMBOLO_DELIMITADOR", ":");

                if (reservada === "OPERACION" && ["OPERACION_ARITMETICA", "OPERACION_TRIGONOMETRICA"].includes(this.tokenActual()?.tipo)) {
                    elementosAnidados.operacion = this.tokenActual().lexema;
                    this.constructorOperacion += this.tokenActual().lexema;
                }else if (reservada === "ID_VALOR_1" && (this.esTipo("VALOR_NUMERICO") || this.tokenActual().lexema === "[")) {
                    elementosAnidados.valor1 = this.tokenActual().lexema;
                    this.constructorOperacion += this.tokenActual().lexema;
                    if (this.tokenActual().lexema === "[") {
                        this.siguienteToken();
                        if (!this.analizarOperacionAnidada()) {
                            numeroErrores++;
                        }
                    }
                }else if (reservada === "ID_VALOR_2" && (this.esTipo("VALOR_NUMERICO") || this.tokenActual().lexema === "[")) {
                    elementosAnidados.valor2 = this.tokenActual().lexema;
                    this.constructorOperacion += this.tokenActual().lexema;
                    if (this.tokenActual().lexema === "[") {
                        this.siguienteToken();
                        if (!this.analizarOperacionAnidada()) {
                            numeroErrores++;
                        }
                    }
                }else{
                    this.numeroErrores++;
                    this.registrarError("Error en una de las palabras reservadas");
                }    


                this.siguienteToken(); 

                    if (this.tokenActual()?.lexema === ",") {
                        this.constructorOperacion += this.tokenActual().lexema;
                        this.siguienteToken(); 
                    }else if (this.tokenActual()?.lexema === "}") {
                        break;
                    }else if (this.tokenActual()?.lexema === "{") {
                        numeroErrores++;
                        this.registrarError(" posiblemente no se cerro correctamente la operacion :D");
                        break;
                    }
                    else{
                        numeroErrores++;
                        this.registrarError("Se esperaba una coma o un cierre de llave");
                        break;
                    }
            }

            this.esperar("SIMBOLO_DELIMITADOR", "}");
            // se maneja aca para no desincronizar con la operacion padre :D
            if (numeroErrores <= 0) {
                return true;

            }else if(numeroErrores > 0){
                return false;
            }

            if (this.tokenActual()?.lexema !== "]") {
                numeroErrores++;
                this.registrarError("Se esperaba un cierre de corchete");
            }else{
                this.constructorOperacion += this.tokenActual().lexema;
            }
    
            if (!elementosAnidados.operacion || !elementosAnidados.valor1) {
                numeroErrores++;
                this.registrarError("Faltan elementos obligatorios para que la operacion sea correcta :D");
                return false;
            }
            
            if (numeroErrores <= 0) {
                return true;

            }else if(numeroErrores > 0){
                return false;
            }

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
    /*
        AREA DE ANALIZR FUNCIONES JUNTO CON SUS PARAMETROS
    */
        analizarFunciones() {
            const nombreFuncion = this.tokenActual()?.lexema;
            const fila = this.tokenActual()?.fila;
            const columna = this.tokenActual()?.columna;
        
            this.esperarFunc("FUNCION");
            this.esperarFunc("SIMBOLO_DELIMITADOR", "(");
        
            const parametros = this.analizarParametros([], nombreFuncion);
        
            this.esperarFunc("SIMBOLO_DELIMITADOR", ")");
        
            if (parametros === null) {
                return;
            }
        
            if (FuncionesReconocidas[nombreFuncion]) {
                FuncionesReconocidas[nombreFuncion](...parametros);
        
                this.FuncionesGuardadas.push({
                    nombre: nombreFuncion,
                    parametros,
                    ubicacion: { fila, columna },
                });
            } else {
                this.registrarErrorFunc(`Función desconocida: ${nombreFuncion}`);
            }
        }
        
        analizarParametros(lista = [], nombreFuncion = "") {
            switch (nombreFuncion) {
                case "max":
                case "min":
                case "promedio":
                    if (this.tokenActual()?.tipo === "SIMBOLO_DELIMITADOR" && this.tokenActual()?.lexema === ")") {
                        return lista.length > 0 ? lista : null;
                    }
        
                    if (["OPERACION_ARITMETICA", "FUNCION_TRIGONOMETRICA"].includes(this.tokenActual()?.tipo)) {
                        lista.push(this.tokenActual()?.lexema);
                        this.siguienteToken();
                    } else if (this.tokenActual()?.lexema === ",") {
                        this.siguienteToken();
                    } else {
                        this.registrarErrorFunc(`Parámetro no válido para la función ${nombreFuncion}. Se esperaba OPERACION_ARITMETICA o FUNCION_TRIGONOMETRICA.`);
                        return null;
                    }
                    break;
        
                case "conteo":
                    if (this.tokenActual()?.tipo === "SIMBOLO_DELIMITADOR" && this.tokenActual()?.lexema === ")") {
                        return [];
                    } else {
                        this.registrarErrorFunc(`La función ${nombreFuncion} no debe tener parámetros.`);
                        return null;
                    }
        
                case "generarreporte":
                    if (this.tokenActual()?.tipo === "SIMBOLO_DELIMITADOR" && this.tokenActual()?.lexema === ")") {
                        return lista.length > 0 && lista.length <= 2 ? lista : null; 
                    }
                    if (this.tokenActual()?.tipo === "CADENA") {
                        lista.push(this.tokenActual()?.lexema);
                        this.siguienteToken();
                    } else if (this.tokenActual()?.lexema === ",") {
                        this.siguienteToken();
                    } else {
                        this.registrarErrorFunc(`Parámetro no válido para la función ${nombreFuncion}. Se esperaba CADENA.`);
                        return null;
                    }
                    break;
        
                case "imprimir":
                    if (this.tokenActual()?.tipo === "SIMBOLO_DELIMITADOR" && this.tokenActual()?.lexema === ")") {
                        return lista.length === 1 ? lista : null; 
                    }
        
                    if (this.tokenActual()?.tipo === "CADENA") {
                        lista.push(this.tokenActual()?.lexema);
                        this.siguienteToken();
                    } else {
                        this.registrarErrorFunc(`La función ${nombreFuncion} solo acepta un parámetro de tipo CADENA.`);
                        return null;
                    }
                    break;
        
                default:
                    this.registrarErrorFunc(`Función desconocida o parámetros no válidos: ${nombreFuncion}`);
                    return null;
            }
        
            return this.analizarParametros(lista, nombreFuncion);
        }

        esperarFunc(tipo, lexema) {
            const token = this.tokenActual();
    
            if (token?.tipo !== tipo) { 
                this.registrarErrorFunc(`Se esperaba un token de tipo '${tipo}', pero se encontró '${token?.tipo}'`);
                return;
            }
            
            if (lexema !== undefined && token?.lexema !== lexema) {
                this.registrarErrorFunc(`Se esperaba un lexema '${lexema}', pero se encontró '${token?.lexema}'`);
                return;
            }
            
            if (!token) {
                this.registrarErrorFunc(`Se esperaba un token de tipo '${tipo}', pero se encontró fin de archivo`);
                return;
            }
            
            this.siguienteToken();
        }
    }        

module.exports = Parser;