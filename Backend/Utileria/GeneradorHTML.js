function generarTokensHTML(tokensEncontrados) {

    let htmlReporte = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Reporte de análisis léxico</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        text-align: center;
                        background-color: #f0f8ff;
                    }
                    h1 {
                        color: #333;
                    }
                    h2 {
                        color: #666;
                    }
                    table {
                        width: 80%;
                        margin: 0 auto;
                        border-collapse: collapse;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    th, td {
                        padding: 10px;
                        border: 1px solid #ddd;
                    }
                    th {
                        background-color: #31cbd2;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Reporte de análisis léxico</h1>
                <h2>Lexemas encontrados:</h2>
                <table>
                    <tr>
                        <th>Numero Token</th>
                        <th>Tipo Token</th>
                        <th>Lexema </th>
                        <th>Fila</th>
                        <th>Columna </th>
                    </tr>
    `;
    
    tokensEncontrados.forEach((token, index) => {
        htmlReporte += `
            <tr>
                <td>${index + 1}</td>
                <td>${token.tipo}</td>
                <td>${token.lexema}</td>
                <td>${token.fila}</td>
                <td>${token.columna}</td>
            </tr>
        `;
    });
    
    htmlReporte += `
                </table>
            </body>
        </html>
    `;
    return htmlReporte;
}

function generarErroresHTML(erroresReporte) {
    const { listaErrores, erroresSintacticos, erroresOperaciones, erroresSintacticosConfigs } = erroresReporte;

    let htmlReporte = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Reporte de errores</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        background-color: #f0f8ff;
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                    }
                    h2 {
                        color: #666;
                        margin-top: 20px;
                    }
                    table {
                        width: 80%;
                        margin: 20px auto;
                        border-collapse: collapse;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    th, td {
                        padding: 10px;
                        border: 1px solid #ddd;
                        text-align: center;
                    }
                    th {
                        background-color: #31cbd2;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Reporte de Errores</h1>
    `;

    htmlReporte += generarTablaErrores("Errores Léxicos", listaErrores, [
        "Tipo Error", "Caracter Error", "Fila", "Columna", "AFD Informe", "Lexema"
    ]);

    htmlReporte += generarTablaErrores("Errores Sintácticos en Operaciones",     erroresSintacticos, [
        "Mensaje de Error"
    ]);

    htmlReporte += generarTablaErrores("Errores Sintácticos en Funciones", erroresOperaciones, [
        "Mensaje de Error"
    ]);

    htmlReporte += generarTablaErrores("Errores Sintácticos en Configuraciones", erroresSintacticosConfigs, [
        "Mensaje de Error"
    ]);

    htmlReporte += `
            </body>
        </html>
    `;

    return htmlReporte;
}


function generarTablaErrores(titulo, errores, columnas) {
    if (!errores || errores.length === 0) {
        return `
            <h2>${titulo}</h2>
            <p>No se encontraron errores en esta categoría.</p>
        `;
    }

    let tabla = `
        <h2>${titulo}</h2>
        <table>
            <tr>
    `;

    columnas.forEach(columna => {
        tabla += `<th>${columna}</th>`;
    });

    tabla += `</tr>`;

    errores.forEach((error, index) => {
        tabla += `<tr>`;
        if (error.tipo) {
            tabla += `
                <td>${index + 1}</td>
                <td>${error.tipo}</td>
                <td>${error.caracterError}</td>
                <td>${error.fila}</td>
                <td>${error.columna}</td>
                <td>El autómata se detuvo en el estado: ${error.estadoError}</td>
                <td>${error.lexema}</td>
            `;
        } else {
            tabla += `<td>${index + 1}</td><td>${error.mensaje}</td>`;
        }
        tabla += `</tr>`;
    });

    tabla += `
        </table>
    `;

    return tabla;
}



module.exports = { generarTokensHTML, generarErroresHTML }; 