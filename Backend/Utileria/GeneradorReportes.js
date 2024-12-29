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
            return `Error al generar el reporte HTML en el generador de reportes`;
        }
    }

   
    async generarReporteErroresHTML(erroresReporte, nombreReporte) {
        const htmlReporte = generadorHTML.generarErroresHTML(erroresReporte);
        try {
            const ms = await this.guardarReporteHTML(htmlReporte, nombreReporte, this.carpetaReportesErrores);
            return ms;
        } catch (error) {
            return `Error al guardar el archivo de errores HTML`;
        }
    }

    async guardarReporteHTML(htmlReporte, nombre, carpetaDestino) {
        const nombreFinal = this.sanitizarNombreArchivo(nombre);
        let fileName = nombreFinal.endsWith('.html') ? nombreFinal : nombreFinal + '.html';
        let filePath = path.resolve(carpetaDestino, fileName);
        
        try {
            await fs.mkdir(carpetaDestino, { recursive: true });
        } catch (error) {
            throw new Error(`No se pudo crear el directorio destino: ${error.message}`);
        }
        
        try {
            await fs.writeFile(filePath, htmlReporte);
            console.log(`Reporte HTML generado correctamente: file://${filePath}`);
            return `Reporte HTML generado correctamente: file://${filePath}`;
        } catch (error) {
            console.log( `Error al guardar el archivo HTML: ${error.message}`);
            return `Error al guardar el archivo HTML en el generador de reportes`;
        }
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

module.exports = GeneradorReportes;
