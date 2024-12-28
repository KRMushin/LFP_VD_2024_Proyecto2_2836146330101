const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const AnalizadorOperaciones = require("../AnalizadorOperaciones/AnalizadorOperaciones");
const GeneradorReportes = require("../Utileria/GeneradorReportes");

class ProcesadorReportes {

    constructor() {
        this.rutaReporteArbolParse = "../Reportes/Arboles/ArbolParser/";
        this.rutaReporteArbolLex = "../Reportes/Arboles/ArbolOperaciones/";
        this.analizadorOperaciones = new AnalizadorOperaciones();
        this.generadorReportes = new GeneradorReportes();
    }
    procesarReportes(dotParse, tokens, tablaOperaciones, funciones, configuracionesLex, configuracionesParse,
                    erroresLexicos, sintacticosOperaciones, sintacticosFunciones, sintacticosConfiguraciones
    ) {
        const funcionesGenerarReporte = funciones.filter(funcion => funcion.nombre.toLowerCase() === "generarreporte");
    

        if (funcionesGenerarReporte.length > 0) {
            funcionesGenerarReporte.forEach(funcion => {
                const tipo = funcion.parametros[0] || "default"; // Primer parámetro
                const extra = funcion.parametros[1] || "";       // Segundo parámetro, puede ser vacío

                const tipoReporte = tipo.trim() !== "" ? tipo : "default";
                const nombreReporte = extra.trim() !== "" ? extra : `Reporte_202231207`;

                if (tipoReporte === "\"arbol\"") {
                    console.log('Generando reporte tipo:', tipoReporte, "con nombre:", nombreReporte);
                    this.generarReporteArboles(nombreReporte, dotParse, tokens, tablaOperaciones, configuracionesLex, configuracionesParse);
                } else if (tipoReporte === "\"tokens\"") {
                    console.log('Generando reporte tipo:', tipoReporte, "con nombre:", nombreReporte);
                    this.generarReporteTokens(tokens, nombreReporte);
                } else if (tipoReporte === "\"errores\"") {
                    console.log('Generando reporte tipo:', tipoReporte, "con nombre:", nombreReporte);
                    this.generadorReportes.generarReporteErroresHTML(erroresLexicos, sintacticosOperaciones, 
                                            sintacticosFunciones, sintacticosConfiguraciones, nombreReporte);
                } else {
                    console.log('Generando reporte tipo desconocido:', tipoReporte, "con nombre:", nombreReporte);
                }
            });
        } else {
            console.log("No se encontraron funciones 'generarReporte'. Generando reporte por defecto.");
        }
    }
    generarReporteArboles(nombreReporte, dotParse, tokens, tablaOperaciones, configuracionesLex, configuracionesParse){
        try {
            this.generarArbolSintactico(dotParse, nombreReporte, configuracionesParse);
        } catch (error) {
            console.error("Error al generar el reporte:", error.message);
        }
    }
    generarArbolSintactico(dotParse, nombreReporte, configuracionesParse) {
        if (!fs.existsSync(this.rutaReporteArbolParse)) {
            fs.mkdirSync(this.rutaReporteArbolParse, { recursive: true });
        }
        const grafo = this.aplicarConfiguracionesGlobales(dotParse, configuracionesParse);
        const rutaDot = path.join(this.rutaReporteArbolParse, `${nombreReporte}.dot`);
        const rutaPng = path.join(this.rutaReporteArbolParse, `${nombreReporte}.png`);

        fs.writeFileSync(rutaDot, grafo, "utf8");
        console.log(`Archivo DOT generado en: ${rutaDot}`);

        const comando = `dot -Tpng '${rutaDot}' -o '${rutaPng}'`;
        exec(comando, (error, stdout, stderr) => {
            if (error) {
                console.error("Error al generar el PNG:", error.message);
                return;
            }
            if (stderr) {
                console.warn("Advertencia:", stderr);
            }
            console.log(`Grafo PNG generado en: ${rutaPng}`);
        });
    }
    aplicarConfiguracionesGlobales(dotParse, config) {
        const encabezado = `
            digraph G {
                node [shape=${config.forma}, style=filled, fillcolor=${config.fondo}, fontcolor=${config.fuente}, fontname=${config.tipoFuente}];
                edge [color=black];
        `;
        return `${encabezado}\n${dotParse.join("\n")}\n}`;
    }
    generarTablaOperaciones(tablaOperaciones, configuracionesLex) {
        try {
            const entrada = tablaOperaciones.obtenerTextoOperaciones();
            return this.analizadorOperaciones.analizarOperaciones(entrada, configuracionesLex);
        } catch (error) {
            console.error("Error al generar el reporte:", error.message);
        }
    }
    generarReporteTokens(tokens, nombre) {
        this.generadorReportes.generarReporteTokensHTML(tokens, nombre);
    }

    generarReporteErroresHTML(erroresEncontrados, nombreFinal) {
        this.generadorReportes.generarReporteErroresHTML(erroresLexicos, sintacticosOperaciones, 
            sintacticosFunciones, sintacticosConfiguraciones, nombreReporte);
    }
}

module.exports = ProcesadorReportes; 