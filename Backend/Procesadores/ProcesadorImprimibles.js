class ProcesadorImprimibles {
  constructor() {
  }

  generaImprimible(tablaOperacions, analisis) {
    const imprimibles = [];
    const comentarios = this.buscarComentarios(analisis);
    if (comentarios) {
        comentarios.forEach(comentario => {
            imprimibles.push(comentario.lexema);
    });
    }

    const funciones = analisis.funciones.filter(funcion => 
        ['imprimir', 'max', 'min', 'promedio', 'conteo'].includes(funcion.nombre.toLowerCase()));

    if (funciones.length > 0) {
        for (let i = 0; i < funciones.length; i++) {
            const funcion = funciones[i];
            const tipo = funcion.nombre.toLowerCase();

            switch (tipo) {
                case 'promedio':
                case 'max':
                case 'min':
                    const imprimible = this.generarDatos(tablaOperacions, tipo, funcion.parametros);
                    if (imprimible) {
                        imprimibles.push(imprimible);
                    }else{
                        imprimibles.push(`La operacion "${funcion.parametros}" no tiene operaciones.`);
                    }
                    break;
                case 'imprimir':
                    imprimibles.push(funcion.parametros);
                    break;
                case 'conteo':
                    if (tablaOperacions.operaciones) {
                        imprimibles.push("conteo(): " + tablaOperacions.operaciones.length);
                    } else {
                        imprimibles.push("No hay operaciones padre.");
                    }
                    break;
                default:
                    break;
            }
        }
    }
    
    return imprimibles;
}

generarDatos(tablaOperacions, tipo, parametro) {
    const operacionesClasificacion = tablaOperacions.operacionesClasificacion;

    switch (tipo) {
        case 'promedio':
            const promedio = this.calcularPromedio(operacionesClasificacion, parametro);
            if (promedio) {
                return `El promedio de todas las operaciones de tipo ${parametro} es: ${promedio}`;
            }
            break;
        case 'max':
            const max = this.calcularMax(operacionesClasificacion, parametro);
            if (max !== undefined) {
                return `El valor maximo de las operaciones de tipo ${parametro} es: ${max}`;
            }
            break;
        case 'min':
            const min = this.calcularMin(operacionesClasificacion, parametro);
            if (min !== undefined) {
                return `El valor mínimo de las operaciones de tipo ${parametro} es: ${min}`;
            }
            break;
        default:
            break;
    }
}

calcularPromedio(operacionesClasificacion, parametro) {
    const resultados = this.filtrarOperaciones(operacionesClasificacion, parametro);
    if (resultados.length > 0) {
        const suma = resultados.reduce((acc, valor) => acc + valor, 0);
        return suma / resultados.length;
    }
    return null;
}

buscarComentarios(analisis){
    const comentarios = analisis.tokens.filter(token => token.tipo === 'COMENTARIO_SIMPLE' || token.tipo === 'COMENTARIO_MULTILINEA');
    return comentarios;
}

calcularMin(operacionesClasificacion, parametro) {
    const resultados = this.filtrarOperaciones(operacionesClasificacion, parametro);
    if (resultados.length > 0) {
        return Math.min(...resultados);
    }
    return undefined;
}

calcularMax(operacionesClasificacion, parametro) {
    const resultados = this.filtrarOperaciones(operacionesClasificacion, parametro);
    if (resultados.length > 0) {
        return Math.max(...resultados);
    }
    return undefined;
}

filtrarOperaciones(operacionesClasificacion, tipoOperacion) {
    if (operacionesClasificacion.hasOwnProperty(JSON.parse(tipoOperacion))) {
        return operacionesClasificacion[JSON.parse(tipoOperacion)]; 
    } else {
        throw new Error(`No se encontró el tipo de operación: ${tipoOperacion}`);
    }
}
}
module.exports = ProcesadorImprimibles;