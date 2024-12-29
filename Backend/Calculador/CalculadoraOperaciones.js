class CalculadoraOperaciones {
    constructor() {
        this.operacionesPermitidas = ['suma', 'resta', 'multiplicacion', 'division', 'mod', 'seno', 'coseno', 'tangente', 'potencia', 'raiz', 'inverso'];
        this.operaciones = {}; 
        this.inicializarOperaciones();
    }
    inicializarOperaciones() {
        this.operacionesPermitidas.forEach(tipo => {
            this.operaciones[tipo] = []; 
        });
    }

    calculadoraOperaciones(tablaOperaciones) {
        tablaOperaciones.operaciones.forEach(operacion => {
            let resultado = this.obtenerResultadoOperacion(operacion);
            operacion.agregarResultado(resultado);
        });
        tablaOperaciones.operacionesClasificacion = this.operaciones;
    }

    obtenerResultadoOperacion(operacion) {
        let valor1 = 0;
        let valor2 = 0;

        if (!this.operacionesPermitidas.includes(operacion.operacion)) {
            return 0;
        }

        if (!isNaN(operacion.valor1)) {
            valor1 = operacion.valor1;
        } else if (operacion.valor1 instanceof Object) {
            valor1 = this.obtenerResultadoOperacion(operacion.valor1);
            operacion.valor1.agregarResultado(valor1);
        }

        if (!isNaN(operacion.valor2)) {
            valor2 = operacion.valor2;
        } else if (operacion.valor2 instanceof Object) {
            valor2 = this.obtenerResultadoOperacion(operacion.valor2);
            operacion.valor2.agregarResultado(valor2);
        }

        return this.realizarOperacion(operacion, valor1, valor2);
    }

    realizarOperacion(operacion, valor1, valor2) {
        switch (operacion.operacion) {
            case 'suma':
                this.operaciones[operacion.operacion].push(valor1 + valor2);
                return valor1 + valor2;
            case 'resta':
                this.operaciones[operacion.operacion].push(valor1 - valor2);
                return valor1 - valor2;
            case 'multiplicacion':
                this.operaciones[operacion.operacion].push(valor1 * valor2);
                return valor1 * valor2;
            case 'division':
                if (valor2 === 0) return 'Error: División por cero';
                this.operaciones[operacion.operacion].push(valor1 / valor2);
                return valor1 / valor2;
            case 'seno':
                this.operaciones[operacion.operacion].push(Math.sin(valor1 * Math.PI / 180));
                return Math.sin(valor1 * Math.PI / 180);
            case 'coseno':
                this.operaciones[operacion.operacion].push(Math.cos(valor1 * Math.PI / 180));
                return Math.cos(valor1 * Math.PI / 180);
            case 'tangente':
                this.operaciones[operacion.operacion].push(Math.tan(valor1 * Math.PI / 180));
                return Math.tan(valor1 * Math.PI / 180);
            case 'potencia':
                this.operaciones[operacion.operacion].push(Math.pow(valor1, valor2));
                return Math.pow(valor1, valor2);
            case 'mod':
                this.operaciones[operacion.operacion].push(valor1 % valor2);
                return valor1 % valor2;
            case 'raiz':
                if (valor2) {
                    this.operaciones[operacion.operacion].push(Math.pow(valor1, 1 / valor2));
                    return Math.pow(valor1, 1 / valor2);
                }
                this.operaciones[operacion.operacion].push(Math.sqrt(valor1));
                return Math.sqrt(valor1);
            case 'inverso':
                this.operaciones[operacion.operacion].push(1 / valor1);
                return 1 / valor1;
            default:
                return 0;
        }
        
        
    }

    guardarOperacion(tipo, datos) {
        if (this.operaciones[tipo]) {
            this.operaciones[tipo].push(datos);
        } else {
            console.warn(`Operación no permitida: ${tipo}`);
        }
    }
}

module.exports = CalculadoraOperaciones;
