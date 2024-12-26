const { exec } = require("child_process");
const fs = require("fs");

class GeneradorArboles {
    generarDot(tablaConfiguraciones, tablaOperaciones) {
        let dot = 'digraph G {\n';
        dot += `    rankdir=TB;\n`;
        dot += `    node [shape=${tablaConfiguraciones.forma}, fontname="${tablaConfiguraciones.fuente}", style=filled, fillcolor="${tablaConfiguraciones.fondo}"];\n`;
        dot += `    edge [color=black];\n`;

        // aca se envia las tablas para poder generar el archivo dot jeje
        dot += this.generarDotOperaciones(tablaConfiguraciones, tablaOperaciones);

        dot += '}\n';

        const rutaDOT = "arboles_combinados.dot";

        fs.writeFileSync(rutaDOT, dot, "utf8");
        console.log(`El archivo se genero bien en la ruta: ${rutaDOT}`);

        const rutaImagen = "arboles_combinados.png";
        
        exec(`dot -Tpng ${rutaDOT} -o ${rutaImagen}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al generar: ${error.message}`);
                return;
            }
            console.log(`Imagen generada correctamente: ${rutaImagen}`);
        });

        return rutaImagen;
    }

    generarDotOperaciones(tablaConfiguraciones, tablaOperaciones) {
        let contenidoDOT = '';

        tablaOperaciones.operaciones.forEach((operacion, index) => {
            const dotIndividual = operacion.generarDot(tablaConfiguraciones); 
            contenidoDOT += `    subgraph cluster_${index} {\n`;
            contenidoDOT += `        label="Operacion ${index + 1}";\n`;
            contenidoDOT += dotIndividual;
            contenidoDOT += `    }\n`;
        });

        return contenidoDOT;
    }
}

module.exports = GeneradorArboles;