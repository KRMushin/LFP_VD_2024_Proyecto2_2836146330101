class Operacion{

    constructor(operacion){

        if(isNaN(operacion)){
            this.operacion = 'operacion';
        }

        this.operacion = operacion;
        this.valor1 = null;
        this.valor2 = null;
        this.resultadoOperacion = null;
        this.id = `nodo_${Math.random().toString(36).substring(7)}`;
        this.hijos = [];

    }

    agregarValor1(valor1){
        this.valor1 = valor1;
    }

    agregarValor2(valor2){
        this.valor2 = valor2;
    }

    agregarResultado(valor){
        this.resultadoOperacion = valor;
    }

    agregarHijo(nodo) {
        this.hijos.push(nodo);
    }

    generarDot(config) {
        let dot = '';
        dot = this.procesarNodo(this, dot, config);
        return dot;
    }

    procesarNodo(nodo, dot, config) {
        if (nodo instanceof Operacion) {

            dot += `    "${nodo.id}" [label="${nodo.operacion}\\nResultado: ${nodo.resultadoOperacion}", shape=${config.forma}, fillcolor="${config.fondo}", fontcolor="${config.fuente}", style=filled];\n`;

            if (nodo.valor1 instanceof Operacion) {
                dot = this.procesarNodo(nodo.valor1, dot, config);
                dot += `    "${nodo.id}" -> "${nodo.valor1.id}" [label="Valor1"];\n`;
            } else if (nodo.valor1 !== null) {
                const valor1Id = `valor1_${nodo.id}`;
                dot += `    "${valor1Id}" [label="${nodo.valor1}", shape=${config.forma}, fillcolor="${config.fondo}", fontcolor="${config.fuente}", style=filled];\n`;
                dot += `    "${nodo.id}" -> "${valor1Id}" [label="Valor1"];\n`;
            }
            if (nodo.valor2 instanceof Operacion) {
                dot = this.procesarNodo(nodo.valor2, dot, config);
                dot += `    "${nodo.id}" -> "${nodo.valor2.id}" [label="Valor2"];\n`;
            } else if (nodo.valor2 !== null) {
                const valor2Id = `valor2_${nodo.id}`;
                dot += `    "${valor2Id}" [label="${nodo.valor2}", shape=${config.forma}, fillcolor="${config.fondo}", fontcolor="${config.fuente}", style=filled];\n`;
                dot += `    "${nodo.id}" -> "${valor2Id}" [label="Valor2"];\n`;
            }
        }
        return dot;
    }
}

module.exports = Operacion;