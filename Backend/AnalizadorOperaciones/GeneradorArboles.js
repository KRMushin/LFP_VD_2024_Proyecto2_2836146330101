const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

class GeneradorArboles {
    constructor() {
        this.ruta = "../Reportes/Arboles/ArbolOperaciones/";
    }
    generarDot(config, tablaOperaciones) {
        let dot = 'digraph G {\n';
        dot += `    rankdir=TB;\n`;
        dot += `    node [shape=${config.forma}, style=filled, fillcolor=${config.fondo}, fontcolor=${config.fuente}, fontname=${config.tipoFuente}];\n`;
        dot += `    edge [color=black];\n`;

        // aca se envia las tablas para poder generar el archivo dot jeje
        dot += this.generarDotOperaciones(config, tablaOperaciones);

        dot += '}\n';

        if (!fs.existsSync(this.ruta)) {
            fs.mkdirSync(this.ruta, { recursive: true });
        }
        
        const rutaDOT = path.join(this.ruta, "arboles_combinados.dot");
        const rutaImagen = path.join(this.ruta, "arboles_combinados.png");

        fs.writeFileSync(rutaDOT, dot, "utf8");
        console.log(`El archivo se genero bien en la ruta: ${rutaDOT}`);
        
        exec(`dot -Tpng ${rutaDOT} -o ${rutaImagen}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al generar: ${error.message}`);
                return;
            }
            console.log("");
            console.log("           Generacion correcta de la iamgen de operaciones")
            console.log("");
            console.log(`Imagen generada correctamente: ${rutaImagen}`);
            console.log("");
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