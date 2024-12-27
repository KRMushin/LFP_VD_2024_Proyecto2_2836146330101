const { json } = require("express");

class ReconstructorEntrada{
    reconstruirEntrada(tokens) {

        const tokensBloque = ["EOF", "CONFIG_LEX", "CONFIG_PARSE", "FUNCION"];
        const indiceOperaciones = this.buscarIndiceOperaciones(tokens);
        
        if (indiceOperaciones === -1) {
            return null;
        }
        
        let entrada = '';

        for (let i = indiceOperaciones; i < tokens.length; i++) {
            const t = tokens[i];

            if (tokensBloque.includes(t.tipo)) {
                break;
            }

            if (t.tipo === "OPERACIONES" || t.tipo === "OPERADOR_ASIGNACION") {
                continue;
            }

            entrada += t.lexema;
        }
        // try {
        //     const json = entrada.JSON.stringify();
        //     return json;
        // } catch (error) {
        //     console.log('Error en la reconstruccion de la entrada', error);
        //     return null;
        // }
        return entrada;
    }

    buscarIndiceOperaciones(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].tipo === "OPERACIONES") {
                return i;
            }
        }
        return -1;
    }
}

module.exports = ReconstructorEntrada;