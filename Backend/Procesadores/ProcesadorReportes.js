const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const AnalizadorOperaciones = require("../AnalizadorOperaciones/AnalizadorOperaciones");
const GeneradorReportes = require("../Utileria/GeneradorReportes");
const { Console } = require("console");

class ProcesadorReportes {
    
    constructor() {
        this.rutaReporteArbolParse = "../Reportes/Arboles/ArbolParser/";
        this.rutaReporteArbolLex = "../Reportes/Arboles/ArbolOperaciones/";
        this.analizadorOperaciones = new AnalizadorOperaciones();
        this.generadorReportes = new GeneradorReportes();
    }
    procesarReportes(analisis, erroresReporte) {

        const funcionesGenerarReporte = analisis.funciones.filter(funcion => funcion.nombre.toLowerCase() === "generarreporte");
        const mensajes = [];

        if (funcionesGenerarReporte.length > 0) {

            frenar:
            for (let i = 0; i < funcionesGenerarReporte.length; i++) {
                const funcion = funcionesGenerarReporte[i];
                const tipo = funcion.parametros[0] || "default";
                const extra = funcion.parametros[1] || "";
        
                const tipoReporte = tipo !== undefined ? tipo : "default";
                const nombreReporte = extra.trim() !== "" ? extra : `vacio`;


                switch (tipoReporte) {
                        case "default":
                        case "\"default\"":
                        case "":
                        case "\"\"":
                        case " ":
                        case "\" \"":
                            console.log('Generando todos y detener ciclo for');
                            this.generarTodosLosReportes(analisis, erroresReporte);
                            break frenar;
                        case "\"arbol\"":
                            if (nombreReporte === "vacio") {
                                this.generarReporteArboles("202231207_arbol", analisis);
                                break;
                            }
                            this.generarReporteArboles(nombreReporte, analisis);
                            break;
                        case "\"tokens\"":
                            if (nombreReporte === "vacio") {
                                this.generarReporteTokens(analisis, "202231207_tokens");
                                break;
                            }
                            this.generarReporteTokens(analisis, nombreReporte);
                            break;
                        case "\"errores\"":
                            if (nombreReporte === "vacio") {
                                this.generadorReportes.generarReporteErroresHTML(erroresReporte, "202231207_errores");
                                break;
                            }
                            this.generadorReportes.generarReporteErroresHTML(erroresReporte, nombreReporte);
                            break;
                        default:
                            break;
                        }
                    }                    
        }else{
            this.generarTodosLosReportes(analisis, erroresReporte);
        }

    }
    generarReporteArboles(nombreReporte, analisis){
        try {
            const { arbolDot, configuracionesParse } = analisis;
            const ruta = this.generarArbolSintactico(arbolDot, nombreReporte, configuracionesParse);
            return ruta;
        } catch (error) {
            console.error("Error al generar el reporte:", error.message);
        }
    }
    generarArbolSintactico(dotParse, nombre, configuracionesParse) {
        const nombreReporte = this.sanitizarNombreArchivo(nombre);

        if (!fs.existsSync(this.rutaReporteArbolParse)) {
            fs.mkdirSync(this.rutaReporteArbolParse, { recursive: true });
        }
        const grafo = this.aplicarConfiguracionesGlobales(dotParse, configuracionesParse);
        const rutaDot = path.join(this.rutaReporteArbolParse, `${nombreReporte}.dot`);
        const rutaPng = path.join(this.rutaReporteArbolParse, `${nombreReporte}.png`);

        fs.writeFileSync(rutaDot, grafo, "utf8");
        console.log("");
        console.log("       CREACION DE DOT DE ARBOL SINTACTICO")
        console.log(`Archivo DOT generado en: ${rutaDot}`);
        console.log("");


        const comando = `dot -Tpng '${rutaDot}' -o '${rutaPng}'`;
        exec(comando, (error, stdout, stderr) => {
            if (error) {

                console.log("");      
                console.error("Error al generar el PNG:", error.message);
                return;
            }
            if (stderr) {
                console.log("");
                console.warn("Advertencia:", stderr);
            }
            console.log("");
            console.log("                   SE CREO LA IMAGEN DEL GRAFO SINTACTICO")
            console.log(`Grafo PNG generado en: ${rutaPng}`);
            console.log("");
            return `Grafo PNG generado en: ${rutaPng}`;
        });
    }
    generarTablaOperaciones(tablaOperaciones, configuracionesLex) {
        try {
            const entrada = tablaOperaciones.obtenerTextoOperaciones();
            return this.analizadorOperaciones.analizarOperaciones(entrada, configuracionesLex);
        } catch (error) {
            console.error("Error al generar el reporte:", error.message);
        }
    }
    generarReporteTokens(analisis, nombreReporte) {
        try {
            const { tokens } = analisis;
            this.generadorReportes.generarReporteTokensHTML(tokens, nombreReporte);
        } catch (error) {
            
        }
    }

    generarTodosLosReportes(analisis, erroresReporte){
        try {
            this.generarReporteArboles("202231207", analisis);
            this.generarReporteTokens(analisis, "202231207");
            this.generadorReportes.generarReporteErroresHTML(erroresReporte, "202231207");
        } catch (error) {
            console.log("Error al generar todos los los reportes:", error.message);
        }

    }

    generarReporteErroresHTML(erroresEncontrados, nombreFinal) {
        this.generadorReportes.generarReporteErroresHTML(erroresLexicos, sintacticosOperaciones, 
            sintacticosFunciones, sintacticosConfiguraciones, nombreReporte);
    }
    aplicarConfiguracionesGlobales(dotParse, config) {
        const encabezado = `
            digraph G {
                node [shape=${config.forma}, style=filled, fillcolor=${config.fondo}, fontcolor=${config.fuente}, fontname=${config.tipoFuente}];
                edge [color=black];
        `;
        return `${encabezado}\n${dotParse.join("\n")}\n}`;
    }

    sanitizarNombreArchivo(nombreArchivo) {
        if (!nombreArchivo) return 'carnet_202231207';
    
        const caracteresPermitidos = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_. ';
        let nombreSanitizado = '';
    
        for (const caracter of nombreArchivo) {
            if (caracteresPermitidos.includes(caracter)) {
                nombreSanitizado += caracter;
            }
        }
        return nombreSanitizado.trim(); 
    }
}

module.exports = ProcesadorReportes; 
