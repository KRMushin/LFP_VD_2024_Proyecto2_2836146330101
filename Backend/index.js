const express = require('express');
const cors = require('cors');
const AnalizadorLexico = require('./AnalizadorLexico/analizador-lexico');
const ReconstructorEntrada = require('../Backend/Utileria/ReconstructorEntrada')
const Parser = require('./AnalizadorSintactico/Parser');
const AnalizadorOperaciones = require('./AnalizadorOperaciones/AnalizadorOperaciones');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 
app.use(express.text({ type: '*/*' }));
app.use(express.text()); 


app.post('/analisis-lexico', (req, res) => {
    try {
        // entrada
        const cadena = req.body;

        this.analizadorLexico = new AnalizadorLexico();
        this.reconstructor = new ReconstructorEntrada();
        this.analizadorOperaciones = new AnalizadorOperaciones();

        const { tokens, listaErrores } = this.analizadorLexico.analizarEntrada(cadena);
        const operacionesBloque = this.reconstructor.reconstruirEntrada(tokens);

        // console.log(tokens);
        this.parser = new Parser(tokens);
        this.parser.parse();
        

        console.log('errores sintacticos', this.parser.erroresSintacticos);
        console.log('operaciones', this.parser.tablaOperaciones);

        const erroresOperaciones = this.parser.erroresSintacticos;
        const erroresSintacticosConfigs = this.parser.erroresSintacticosConfigs;
        const funciones = this.parser.FuncionesGuardadas;

        console.log('Errores de Operaciones:', erroresOperaciones);
        console.log('Errores Sintácticos de Configuraciones:', erroresSintacticosConfigs);
        console.log('Funciones Guardadas:', funciones);

        // console.log('funciones' , funciones);

        // if (operacionesBloque) {
        //      try {
        //         this.analizadorOperaciones.analizarOperaciones(operacionesBloque);
        //      } catch (error) {
        //         console.log('Error en analisis de operaciones tiene errores sintacticos'); 
        //      }
        //  }


        //  if (erroresOperaciones.length === 0) {
        //     console.log(this.parser.tablaOperaciones.obtenerTextoOperaciones());
        //     this.opereacionesAnalizador.analizarOperaciones(this.parser.tablaOperaciones.obtenerTextoOperaciones());
        //  } 

        //  console.log(this.parser.erroresSintacticos);
        //  console.log('numero de errores sintacticos: ', this.parser.erroresSintacticos.length);
        //  console.log('numero de errores sintacticos: ', this.parser.erroresSintacticosConfigs.length);
        //  console.log('operacion encontradas' , this.parser.tablaOperaciones.operacionesPadre);

         console.log('configuraciones' , this.parser.configuracionesLex);
         console.log('configuraciones' , this.parser.erroresSintacticosConfigs);
         console.log('configuraciones parse' , this.parser.configuracionesParse);
        //  console.log('funciones' , this.parser.FuncionesGuardadas);


        return res.json({ tokens, listaErrores });
    } catch (error) {
        console.error("Error en /analisis-lexico:", error); // Registro detallado en la consola
        return res.status(500).json({ error: error.message, stack: error.stack });
    } 
});

app.get('/analisis-sintactico', (req, res) => {



});
    

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
