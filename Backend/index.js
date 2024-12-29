const express = require('express');
const cors = require('cors');
const AnalizadorLexico = require('./AnalizadorLexico/analizador-lexico');
const ReconstructorEntrada = require('../Backend/Utileria/ReconstructorEntrada')
const Parser = require('./AnalizadorSintactico/Parser');
const AnalizadorOperaciones = require('./AnalizadorOperaciones/AnalizadorOperaciones');
const ProcesadorReportes = require('./Procesadores/ProcesadorReportes');
const ProcesadorImprimibles = require('./Procesadores/ProcesadorImprimibles');

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
        this.imprimibles = new ProcesadorImprimibles();

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

        // console.log('operacionesValidas', operacionesValidas);
        const configuracionesParse = this.parser.configuracionesParse;
        const configuracionesLex = this.parser.configuracionesLex;
        const arbolDot = this.parser.dotBuffer;
        //contenedor de  todo el analisis del lexico y el sintactico
        const analisis = {
            arbolDot,
            tokens,
            operacionesValidas,
            funciones,
            configuracionesLex,
            configuracionesParse,
        };
        
        const errores = {
            listaErrores,
            erroresSintacticos,
            erroresOperaciones,
            erroresSintacticosConfigs,
        };

        /*
            aca se procesan los reportes segun las funciones encontradas
        */
        const reportes = this.procesador.procesarReportes(analisis, errores);
        const tablaOperacions  = this.procesador.generarTablaOperaciones(operacionesValidas, configuracionesLex);
        
        if (!tablaOperacions) {
            return res.json({ tokens, errores });
        }
        const imprimibles = this.imprimibles.generaImprimible(tablaOperacions, analisis);
        // mandar al angular ;D
        return res.json({ tokens, errores, imprimibles, reportes });

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
