const operacionesPermitidas = ['suma', 'resta', 'multiplicacion', 'division', 'mod', 'seno', 'coseno', 'tangente', 'potencia', 'raiz', 'inverso'];

// esta funcion se llama desde el el analizador de operaciones
function calculadoraOperaciones(tablaOperaciones) {
    tablaOperaciones.operaciones.forEach(operacion => {
        let resultado = obtenerResultadoOperacion(operacion);
        operacion.agregarResultado(resultado);
    });
}

/*
    funcion recursiva importante que obtiene los resultados de cada operacion
*/
function obtenerResultadoOperacion(operacion) {

    let valor1 = 0;
    let valor2 = 0;

    if (!operacionesPermitidas.includes(operacion.operacion)) {
        return 0;
    }

    if (!isNaN(operacion.valor1)) {
        valor1 = operacion.valor1;
    } else if (operacion.valor1 instanceof Object) {
        // llamada recursiva para asignar el valor :D
        valor1 = obtenerResultadoOperacion(operacion.valor1);
        operacion.valor1.agregarResultado(valor1);
    }

    if (!isNaN(operacion.valor2)) {
        valor2 = operacion.valor2;
    }     
    else if (operacion.valor2 instanceof Object) {
    
        valor2 = obtenerResultadoOperacion(operacion.valor2);
        operacion.valor2.agregarResultado(valor2);
    }

    const l = realizarOperacion(operacion, valor1, valor2)
    return l;
}

function realizarOperacion(operacion, valor1, valor2) {
    switch (operacion.operacion) {
        case 'suma':
            return valor1 + valor2;
        case 'resta':
            return valor1 - valor2 ;
        case 'multiplicacion':
            return valor1 * valor2;
        case 'division':
            if (valor2 === 0) return 'Error: División por cero';
            return valor1 / valor2;
        case 'seno':
            return Math.sin(valor1 * Math.PI / 180); 
        case 'coseno':
            return Math.cos(valor1 * Math.PI / 180); 
        case 'tangente':
            return Math.tan(valor1 * Math.PI / 180); 
        case 'potencia':
            return Math.pow(valor1, valor2);    
        case 'mod':
            return valor1 % valor2;
        case 'raiz':
            if (valor2) {
                return Math.pow(valor1, 1 / valor2);
            }
            return Math.sqrt(valor1);
        case 'inverso':
            console.log('inverso de', valor1);
            return 1 / valor1;
        default:
            return 0;
    }
}

module.exports = { calculadoraOperaciones };

