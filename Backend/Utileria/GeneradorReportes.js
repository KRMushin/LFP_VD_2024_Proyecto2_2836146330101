const fs = require('fs').promises;
const path = require('path');
const generadorHTML = require('./GeneradorHTML');

class GeneradorReportes {
    constructor() {
        this.carpetaReportesTokens = '../Reportes/TokensHTML';
        this.carpetaReportesErrores = '../Reportes/ReportesErrores';
        this.carpetaReportesJSON = './Reportes/JSONErrores';
    }

    async generarReporteTokensHTML(tokensEncontrados, nombreFinal) {
        const ReporteHTML = generadorHTML.generarTokensHTML(tokensEncontrados);
        try {
            const ms = await this.guardarReporteHTML(ReporteHTML, nombreFinal, this.carpetaReportesTokens);
            return ms;
        } catch (error) {
            return `Error al generar el reporte HTML: ${error.message}`;
        }
    }

    async generarReporteErroresHTML(erroresLexicos, sintacticosOperaciones, sintacticosFunciones, sintacticosConfiguraciones, nombreFinal) {
        const htmlReporte = generadorHTML.generarErroresHTML(erroresLexicos, sintacticosOperaciones, sintacticosFunciones, sintacticosConfiguraciones);
        console.log(htmlReporte); 
        console.log(nombreFinal);

        try {
            const ms = await this.guardarReporteHTML(htmlReporte, nombreFinal, this.carpetaReportesErrores);
            return ms;
        } catch (error) {
            return `Error al guardar el archivo HTML: ${error.message}`;
        }
    }
    

    async guardarReporteHTML(htmlReporte, nombreFinal, carpetaDestino) {
        let fileName = nombreFinal.endsWith('.html') ? nombreFinal : nombreFinal + '.html';
        let filePath = path.resolve(carpetaDestino, fileName);
        
        try {
            await fs.mkdir(carpetaDestino, { recursive: true });
        } catch (error) {
            throw new Error(`No se pudo crear el directorio destino: ${error.message}`);
        }
        
        try {
            await fs.writeFile(filePath, htmlReporte);
            return `Reporte HTML generado correctamente: file://${filePath}`;
        } catch (error) {
            return `Error al guardar el archivo HTML: ${error.message}`;
        }
    }

    async generarJSONErrores(listaErrores) {
        try {
            const listaErroresConFormato = listaErrores.map((error, indice) => ({
                No: indice + 1,
                descripcion: {
                    lexema: error.lexema,
                    tipo: error.tipo,
                    columna: error.columna,
                    fila: error.fila,
                    caracterError: error.caracter
                }
            }));

            const contenidoJSON = JSON.stringify({ errores: listaErroresConFormato }, null, 4);
            const nombreArchivo = path.join(this.carpetaReportesJSON, "ERRORES_2836146330101.json");
            await fs.writeFile(nombreArchivo, contenidoJSON, "utf8");

            console.log(`Archivo JSON generado correctamente: ${nombreArchivo}`);
        } catch (error) {
            console.error("Error al generar el archivo JSON:", error.message);
        }
    }
}

module.exports = GeneradorReportes;
