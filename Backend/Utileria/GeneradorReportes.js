const fs = require('fs').promises;
const path = require('path');


const generadorHTML = require('./GeneradorHTML');

const carpetaReportesTokens = './Reportes/ReportesTokens';
const carpetaReportesErrores = './Reportes/ReportesErrores';
const carpetaReportesJSON = './Reportes/JSONErrores';

async function generarReporteTokensHTML(tokensEncontrados, nombreFinal) {
    const ReporteHTML = generadorHTML.generarTokensHTML(tokensEncontrados);
    
    try {
        const ms = await guardarReporteHTML(ReporteHTML, nombreFinal, carpetaReportesTokens);
        return ms;
    } catch (error) {
        return `Error al generar el reporte HTML: ${error.message}`;
    }
}

async function generarReporteErroresHTML(erroresEncontrados, nombreFinal) {
    const htmlReporte = generadorHTML.generarErroresHTML(erroresEncontrados);
    try {
        const ms = await guardarReporteHTML(htmlReporte, nombreFinal, carpetaReportesErrores);
        return ms;
    } catch (error) {
        return `Error al guardar el archivo HTML: ${error.message}`;
    }
}

async function guardarReporteHTML(htmlReporte, nombreFinal, carpetaDestino) {
    let fileName = nombreFinal.endsWith('.html') ? nombreFinal : nombreFinal + '.html';
    let filePath = path.resolve(carpetaDestino, fileName);
    try {
        await fs.writeFile(filePath, htmlReporte);
        return `Reporte HTML generado correctamente: file://${filePath}`;
    } catch (error) {
        return `Error al guardar el archivo HTML: ${error.message}`;
    }
}


async function generarJSONErrores(listaErrores) {
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

        const nombreArchivo = path.join(carpetaReportesJSON, "ERRORES_2836146330101.json");
        await fs.writeFile(nombreArchivo, contenidoJSON, "utf8");

        console.log(`Archivo JSON generado correctamente: ${nombreArchivo}`);
    } catch (error) {
        console.error("Error al generar el archivo JSON:", error.message);
    }
}



module.exports = { generarReporteTokensHTML, generarReporteErroresHTML, generarJSONErrores };
