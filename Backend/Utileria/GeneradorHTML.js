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

function generarErroresHTML(erroresEncontrados) {
    let htmlReporte = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Reporte de errores</title>
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
                <h1>Reporte de errores</h1>
                <h2>Errores Lexico encontrados:</h2>
                <table>
                    <tr>
                        <th>Numero Error</th>
                        <th>Tipo Error</th>
                        <th>Caracter Error</th>
                        <th>Fila</th>
                        <th>Columna </th>
                        <th>AFD Informe </th>
                        <th>Lexema </th>

                    </tr>
    `;
    
    erroresEncontrados.forEach((error, index) => {
        htmlReporte += `
            <tr>
                <td>${index + 1}</td>
                <td>${error.tipo}</td>
                <td>${error.caracterError}</td>
                <td>${error.fila}</td>
                <td>${error.columna}</td>
                <td> El automata se detuvo en el estado: ${error.estadoError}</td>
                <td>${error.lexema}</td>
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

module.exports = { generarTokensHTML, generarErroresHTML }; 