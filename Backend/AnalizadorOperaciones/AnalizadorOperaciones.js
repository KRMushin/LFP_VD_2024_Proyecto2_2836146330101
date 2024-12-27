const TablaOperaciones = require("../Tablas/TablaOperaciones.js");
const TablaConfiguraciones = require("../AnalizadorSintactico/ConfiguracionesLex.js");
const Operacion = require("../Tablas/Operacion.js");

const { calculadoraOperaciones } = require("../Calculador/CalculadoraOperaciones.js");
const GeneradorArboles = require("./GeneradorArboles.js");

class AnalizadorOperaciones {

    constructor() {
        this.generadorArboles = new GeneradorArboles();
    }

    analizarOperaciones(textoEntrada) {
        try {
            let json;
            try {
                json = JSON.parse(textoEntrada); // Convertir string a JSON
            } catch (error) {
                console.error("Error al parsear la entrada como JSON:", error);
                return;
            }
            // aca se obtiene la tabla de operaciones ya llena
            const tablaOperaciones = this.llenarTablaOperaciones(json);
            // luego se calculan las operaciones de la tabla
            calculadoraOperaciones(tablaOperaciones);
            // se obtiene la tabla de configuraciones
            // const tablaConfiguracion = this.llenarTablaConfiguraciones(json);
            // se genera el dot
            const tablaConfiguracion = new TablaConfiguraciones();
            const dot = this.generadorArboles.generarDot(tablaConfiguracion, tablaOperaciones);
            console.log(dot);
        } catch (error) {
            console.error("Error en /analisis-lexico:", error); // Registro detallado en la consola
        }
    }
    /*
        funcion que se encuarga de llenar toda la tabla de operaicones
    */
    llenarTablaOperaciones(json) {

        let tablaOperaciones = new TablaOperaciones();
        
        
        let operaciones = [];

        if (Array.isArray(json)) {
            operaciones = json;
        } else {
            operaciones = json.map(item => JSON.parse(item));
        }
        operaciones.forEach(element => {
            let operacion = new Operacion(element.operacion);

            if (element.valor1) {
                let valor1 = this.obtenerValorNeto(element.valor1);
                operacion.agregarValor1(valor1);
            }
            if (element.valor2) {
                let valor2 = this.obtenerValorNeto(element.valor2);
                operacion.agregarValor2(valor2);
            }

            tablaOperaciones.agregarOperacion(operacion);
        });

        return tablaOperaciones;
    }

    llenarTablaConfiguraciones(json) {
        let tablaConfiguraciones = new TablaConfiguraciones();

        json.configuraciones.forEach(element => {
            tablaConfiguraciones.cambiarFondo(element.fondo);
            tablaConfiguraciones.cambiarFuente(element.fuente);
            tablaConfiguraciones.cambiarForma(element.forma);
        });

        return tablaConfiguraciones;
    }

    /*
        funcion recursiva importante encargada de obtner los valores netos de las operaciones
    */
    obtenerValorNeto(valor) {
        if (Number(valor)) {
            return valor;
        }

        if (typeof valor === 'object') {

            let operacion = new Operacion();
            
            valor.forEach(element => {
                operacion.operacion = element.operacion;

                if (element.valor1) {
                    // llamada recursivamente :D
                    let valor1 = this.obtenerValorNeto(element.valor1);
                    operacion.agregarValor1(valor1);
                }

                if (element.valor2) {
                    let valor2 = this.obtenerValorNeto(element.valor2);
                    operacion.agregarValor2(valor2);
                }
            });
            return operacion;
        }
    }
}

module.exports = AnalizadorOperaciones;
