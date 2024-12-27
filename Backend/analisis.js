class Analisis {
    constructor() {
        this.tokens = [];
        this.listaErrores = [];
        this.erroresSintacticos = [];
        this.erroresSintacticosConfigs = [];
        this.tablaOperaciones = {};
        this.entradaJsonLex = "";
        this.entradaJsonSintactico = "";
        this.configuracionesLex = {};
        this.configuracionesParse = {};
        this.analisis = [];
    }

    agregarAnalisis(analisis) {
        this.analisis.push(analisis);
    }

    mostrarAnalisis() {
        console.log(this.analisis);
    }

    agregarToken(token) {
        this.tokens.push(token);
    }

    agregarError(error) {
        this.listaErrores.push(error);
    }

    agregarErrorSintactico(error) {
        this.erroresSintacticos.push(error);
    }

    agregarErrorSintacticoConfig(error) {
        this.erroresSintacticosConfigs.push(error);
    }

    agregarOperacion(clave, operacion) {
        this.tablaOperaciones[clave] = operacion;
    }

    agregarConfiguracionLex(clave, configuracion) {
        this.configuracionesLex[clave] = configuracion;
    }

    agregarConfiguracionParse(clave, configuracion) {
        this.configuracionesParse[clave] = configuracion;
    }

    mostrarTokens() {
        console.log(this.tokens);
    }

    mostrarErrores() {
        console.log(this.listaErrores);
    }

    mostrarErroresSintacticos() {
        console.log(this.erroresSintacticos);
    }

    mostrarErroresSintacticosConfigs() {
        console.log(this.erroresSintacticosConfigs);
    }

    mostrarTablaOperaciones() {
        console.log(this.tablaOperaciones);
    }

    mostrarConfiguracionesLex() {
        console.log(this.configuracionesLex);
    }

    mostrarConfiguracionesParse() {
        console.log(this.configuracionesParse);
    }
}