const express = require('express');
const cors = require('cors');
const AnalizadorLexico = require('./AnalizadorLexico/analizador-lexico');
const ReconstructorEntrada = require('../Backend/Utileria/ReconstructorEntrada')
const Parser = require('./AnalizadorSintactico/Parser');
const AnalizadorOperaciones = require('./AnalizadorOperaciones/AnalizadorOperaciones');
const ProcesadorReportes = require('./Procesadores/ProcesadorReportes');

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
        this.procesador = new ProcesadorReportes();

        this.informes = [];
        
        const { tokens, listaErrores } = this.analizadorLexico.analizarEntrada(cadena);
    
        if (!tokens) {
            return res.json({ tokens, listaErrores });
        }

        this.parser = new Parser(tokens);
        this.parser.parse();
        //funciones para comenzar el flujo de analisis
        const funciones = this.parser.FuncionesGuardadas;
        // erroes de los tres tipos
        const erroresSintacticos = this.parser.erroresSintacticos;
        const erroresSintacticosConfigs = this.parser.erroresSintacticosConfigs;
        const erroresOperaciones = this.parser.erroresSintacticosFunc;
        //operaciones validas halladas , intentar armar el arbol
        const operacionesValidas = this.parser.tablaOperaciones;
        // config del parse arbol
        const configuracionesParse = this.parser.configuracionesParse;
        // configuraciones lex del arbol
        const configuracionesLex = this.parser.configuracionesLex;
        // arbol dot
        const arbolDot = this.parser.dotBuffer;
        // console.log('arbol dot', arbolDot);
        // comienzo del flujo
        const l = this.procesador.procesarReportes(arbolDot, tokens, operacionesValidas, funciones, configuracionesLex, configuracionesParse,
            listaErrores, erroresOperaciones, erroresSintacticos, erroresSintacticosConfigs 
        );
        const tablaOperacions  = this.procesador.generarTablaOperaciones(operacionesValidas, configuracionesLex);
        
        console.log('l', l);

        
        //flujo 
        //realizar el parse
        //extrar las funciones
            //extraer los imprimibles de funciones para enviarlos
            //extraer lo tokens de comentarios para imprimirlos
        //extrar las tablas de configuraciones de parse y lex
        //extraer la tabla de operaciones validas
             //extraer el objeto de operaciones con el analizador de operaciones realizar el analisis de las operaciones
             // extraer las funciones de promedio , conteo , y max , y min y mandarlas a un metodo junto con el  objeto anterior
             // obtenel los imprimibles y adjuntarlos al frontend
        // extraer el doth y mandarle la tabla de parse, regresar un imprimible     
        /* intentar reconstruir la entrada desde el analisis lexico en caso de error enviar el informe esto como salvavidas xd
        */
        // eta vaina reconstruye la operacion de bloques
        const operacionesBloque = this.reconstructor.reconstruirEntrada(tokens);
        
        //realiza el analisis sintactico con los tokens dados

        // errores detectados por el parse


        // funciones reconocidas
        // operaciones validas reconocidas en array 

        
        
        // // console.log(tokens);
        // console.log('errores sintacticos', this.parser.erroresSintacticos);
        // console.log('operaciones', this.parser.tablaOperaciones);
        // const erroresOperaciones = this.parser.erroresSintacticos;
        // const erroresSintacticosConfigs = this.parser.erroresSintacticosConfigs;
        // const funciones = this.parser.FuncionesGuardadas;
        // console.log('Errores de Operaciones:', erroresOperaciones);
        // // console.log('Errores Sintácticos de Configuraciones:', erroresSintacticosConfigs);
        // // console.log('Funciones Guardadas:', funciones);
        // console.log('lol0' , this.parser.generarDot());
        // console.log('funciones' , funciones);
        // if (operacionesBloque) {
        //      try {
        //         this.analizadorOperaciones.analizarOperaciones(operacionesBloque);
        //      } catch (error) {
        //         console.log('Error en analisis de operaciones tiene errores sintacticos'); 
        //      }
        //  }
        // console.log(this.parser.tablaOperaciones.obtenerTextoOperaciones());
        // this.analizadorOperaciones.analizarOperaciones(this.parser.tablaOperaciones.obtenerTextoOperaciones());
        //  if (erroresOperaciones.length === 0) {
        //  } 
        //  console.log(this.parser.erroresSintacticos);
        //  console.log('numero de errores sintacticos: ', this.parser.erroresSintacticos.length);
        //  console.log('numero de errores sintacticos: ', this.parser.erroresSintacticosConfigs.length);
        //  console.log('operacion encontradas' , this.parser.tablaOperaciones.operacionesPadre);
        //  console.log('configuraciones' , this.parser.configuracionesLex);
        //  console.log('configuraciones' , this.parser.erroresSintacticosConfigs);
        //  console.log('configuraciones parse' , this.parser.configuracionesParse);
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
