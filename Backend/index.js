const express = require('express');
const cors = require('cors');
const AnalizadorLexico = require('./AnalizadorLexico/analizador-lexico');
const Parser = require('./AnalizadorSintactico/Parser');
const AnalizadorOperaciones = require('./AnalizadorOperaciones/AnalizadorOperaciones');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 
app.use(express.text({ type: '*/*' }));

app.post('/analisis-lexico', (req, res) => {
    try {
         this.analizadorLexico = new AnalizadorLexico();
         this.opereacionesAnalizador = new AnalizadorOperaciones();
         const cadena = req.body;
         const { tokens, listaErrores } = this.analizadorLexico.analizarEntrada(cadena);
         this.parser = new Parser(tokens);
         this.parser.parse();
         const erroresOperaciones = this.parser.erroresSintacticos;
         if (erroresOperaciones.length === 0) {
            console.log(this.parser.tablaOperaciones.obtenerTextoOperaciones());
            this.opereacionesAnalizador.analizarOperaciones(this.parser.tablaOperaciones.obtenerTextoOperaciones());
         } 
         console.log(this.parser.erroresSintacticos);
         console.log('numero de errores sintacticos: ', this.parser.erroresSintacticos.length);
         console.log('numero de errores sintacticos: ', this.parser.erroresSintacticosConfigs.length);
         console.log('operacion encontradas' , this.parser.tablaOperaciones.operacionesPadre);

         console.log('configuraciones' , this.parser.configuracionesLex);
         console.log('configuraciones' , this.parser.erroresSintacticosConfigs);
         console.log('configuraciones parse' , this.parser.configuracionesParse);
         console.log('funciones' , this.parser.FuncionesGuardadas);
         return res.json({ tokens, listaErrores });
    } catch (error) {
        console.error("Error en /analisis-lexico:", error); // Registro detallado en la consola
        return res.status(500).json({ error: error.message, stack: error.stack });
    } 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
