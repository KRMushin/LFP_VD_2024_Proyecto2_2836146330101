class ReconstructorEntrada{

    reconstruirEntrada(tokens){
        let entrada = '';
        for (let i = 0; i < tokens.length; i++) {
            entrada += tokens[i].lexema;
        }
        return entrada;
    }
}

module.exports = ReconstructorEntrada;