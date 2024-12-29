# 📘 Manual Técnico: NodeLexer

## 📑 Índice
- [📘 Manual Técnico: NodeLexer](#-manual-técnico-nodelexer)
  - [📑 Índice](#-índice)
  - [📋 Descripción del Proyecto](#-descripción-del-proyecto)
  - [🖥️ Requisitos del Sistema](#️-requisitos-del-sistema)
  - [🛠️ Herramientas de Creación](#️-herramientas-de-creación)
  - [⚙️ Instalación](#️-instalación)
    - [Paso 1: Clonar el repositorio](#paso-1-clonar-el-repositorio)
    - [Paso 2: Instalar dependencias del package.json para la creación del node modules](#paso-2-instalar-dependencias-del-packagejson-para-la-creación-del-node-modules)
    - [Paso 3: Ejecutar NodeLexer](#paso-3-ejecutar-nodelexer)
  - [🗂️ Estructura del Proyecto](#️-estructura-del-proyecto)
  - [⚙️ Funcionamiento del Programa](#️-funcionamiento-del-programa)
    - [📜 Gramática Soportada](#-gramática-soportada)
    - [UML](#uml)
  - [📐 Planteamiento del AFD](#-planteamiento-del-afd)
    - [📜 Reglas Léxicas](#-reglas-léxicas)
    - [🌳 Generación del Árbol](#-generación-del-árbol)
    - [📊 Tabla de Siguientes](#-tabla-de-siguientes)
    - [📊 Análisis Sintáctico](#-análisis-sintáctico)
      - [Proceso de Análisis Sintáctico](#proceso-de-análisis-sintáctico)
      - [Ejemplo de Análisis Sintáctico](#ejemplo-de-análisis-sintáctico)
      - [Estructura del Parser](#estructura-del-parser)
      - [GRAMATICA EN BNF](#gramatica-en-bnf)
      - [Imagen del Arbol Sintactico](#imagen-del-arbol-sintactico)

---

## 📋 Descripción del Proyecto

La principal funcionalidad de **NodeLexer** es reconocer las distintas instrucciones de un lenguaje de programación y ejecutar las operaciones definidas. Su diseño permite no solo realizar el análisis léxico correspondiente, sino también ofrecer un resumen funcional y agradable al usuario con:

- **Tokens Reconocidos**, mostrados en consola de manera clara así como también el poder generar un documento HTML para mejor visualización.
- **Analisis Sintactico**, reconocimiento de la gramatica este sintacticamente correcta para lograr la generacion de operaciones matematicas capaces de presentar oepraciones.
- **Errores detectados**, mostrar los errores léxicos que se pueden generar en el programa al no reconocer palabras o lexemas no reconocidos en el lenguaje.
- **Resultados de operaciones**, visualizados en forma de árbol generado mediante la librería Graphviz.

Al procesar el código fuente, NodeLexer genera diagramas de árboles de operaciones que respetan la jerarquía operacional. Estos diagramas incluyen el resultado en cada nodo así como la estructura de la operación.

Este manual técnico tiene como objetivo proporcionar una guía completa sobre la instalación, uso y desarrollo con NodeLexer.

---

## 🖥️ Requisitos del Sistema

Antes de instalar NodeLexer, asegúrate de cumplir con los siguientes requisitos:

- **Sistema Operativo:** Windows, macOS, o Linux
- **Node.js:** v16.0.0 o superior
- **npm:** v7.0.0 o superior
- **Memoria RAM:** Mínimo 2 GB

---

## 🛠️ Herramientas de Creación

Para desarrollar NodeLexer, se utilizaron las siguientes herramientas:

- **Editor de Código:** Visual Studio Code
- **Node.js:** v20.7.0
- **npm:** v7.0.0 o superior
- **Frontend:** Angular 18
- **Backend con api Rest:** Javascript lenguaje
- **Librería para graficas:** Graphviz
- **Sistema Operativo:** Linux
- **Lenguaje de Programación:** JavaScript y Node.js

---

## ⚙️ Instalación

### Paso 1: Clonar el repositorio
```bash
git clone git@github.com:KRMushin/LFP_VD_2024_Proyecto2_2836146330101.git
```

### Paso 2: Instalar dependencias del package.json para la creación del node modules
```bash
npm install
```

### Paso 3: Ejecutar NodeLexer
```bash
npm run start
```

---

## 🗂️ Estructura del Proyecto

La estructura del proyecto NodeLexer está organizada de la siguiente manera:

```plaintext
LFP_VD_2024_PROYECTO2_2836146330101
├── Backend
│   ├── AnalizadorLexico
│   │   ├── analizador-lexico.js
│   │   ├── error-lexico.js
│   │   ├── generador-tokens.js
│   │   ├── tabla-transiciones.js
│   │   └── token.js
│   ├── AnalizadorOperaciones
│   │   ├── AnalizadorOperaciones.js
│   │   └── GeneradorArboles.js
│   ├── AnalizadorSintactico
│   │   ├── ConfiguracionesLex.js
│   │   ├── ConfiguracionesParse.js
│   │   ├── ErrorSintactico.js
│   │   ├── Parser.js
│   │   └── TablaOperaciones.js
│   ├── Calculador
│   │   └── CalculadoraOperaciones.js
│   ├── Modelos
│   │   └── Operacion.js
│   ├── Procesadores
│   │   ├── ProcesadorImprimibles.js
│   │   └── ProcesadorReportes.js
│   └── node_modules

```

---

## ⚙️ Funcionamiento del Programa

NodeLexer procesa el código fuente en los siguientes pasos:

1. **Entrada:**
   - Se carga un archivo .json y se almacena en una constante que posteriormente se usará.
2. **Análisis Léxico:**
   - Identifica los tokens válidos según los lexemas definidos en mi lenguaje.
 - **Analisis Sintactico**
   -Identifica la estructura sintactica de mis operaciones en el archivo de   entrada 
3. **Análisis Operaciones:**
   - Construye un árbol de operaciones representando una estructura jerárquica además de calcular las respectivas operaciones.
4. **Salida:**
   - Muestra los tokens reconocidos en HTML o en la consola.
   - Se genera el Árbol de operaciones.

---

### 📜 Gramática Soportada

La gramática se define en formato JSON.

**Estructura de un Archivo de entrada:**

```Operaciones = [
    {
    	"operacion": "resta",
    	"nombre": "operacion1", 
    	"valor1": 6.5, 
    	"valor2": 3.5
    },
    {
	    	"operacion": 
	    	"multiplicacion", 
	    	"nombre": "operacion2", 
	    	"valor1": 2.3, 
	    	"valor2": [
	    		{
	    			"operacion": "seno",
	    			"valor1": 90
	    		}
	    	]
    	},
    {
	    "operacion": "suma",
	    "nombre": "operacion3", 
	    "valor1": 2.3,
	    "valor2": [
	    		{"operacion": "multiplicacion",
	    		 "valor1": 10, 
	    		 	"valor2": [
	    		 		{
		    		 		"operacion": "raiz", 
		    		 		"valor1": 10, 
		    		 		"valor2": 2
	    		 		}
	    			]
	    		}
	   ]
  },
]

{"operacion": "suma",
 "nombre": "operacion3",
 "valor2": [
 			{"operacion": "multiplicacion", "valor1": 10, "valor2": [
 								{"operacion": "raiz","valor1":10, "valor2": 2
 								}
 								]
 			}
 		]
 	}



ConfiguracionesLex = [
    fondo: "#111111",
    fuente: "#FFFFFF",
    forma: "diamond",
    tipoFuente: "Arial"
]

ConfiguracionesParser = [
    fondo: "#FF3F00",
    fuente: "#000000",
    forma: "circle",
    tipoFuente: "Arial"
]

// Comentario simple
/* Comentario de
múltiple línea */

imprimir("Lenguajes Formales y de Programación")
conteo()
promedio("suma")
max("multiplicacion")
min("raiz")
generarReporte("tokens", "sale lenguajes")
generarReporte("errores", "202107061")
generarReporte("arbol", "Nueva derivación")
```

### UML

El siguiente diagrama UML muestra la estructura de clases y sus relaciones en el proyecto NodeLexer:

Principales clases importantes del NodeLexer:

**AnalizadorLexico.js**

Esta clase se encarga de ser el orquestador entre una tabla de transiciones el cual descompone una entra de caracteres y al obtener un caracter lo evalua en la tabla de transiciones para la evaluacion correcta del lexema que sea correcto en el lenguaje aceptado.

**Flujo:**

- Se inicializan variables de control: estadoActual, tokenActual, tokens, listaErrores, fila y columna.
- Se recorren los caracteres de la cadena de entrada:
  - Se evalúan las transiciones del AFD desde el estado actual.
  - Si el carácter genera un token válido:
    - El token se guarda en la lista de tokens.
  - Si no hay una transición válida, se registra un error en listaErrores.
  - Se manejan delimitadores y saltos de línea para actualizar la posición.
  - Se retorna un objeto con las listas tokens y listaErrores.

**AnalizadorOperaciones**

Descripción General

La clase AnalizadorOperaciones procesa operaciones y configuraciones proporcionadas en formato JSON. Su objetivo es analizar estas operaciones, generar una estructura jerárquica e instanciar a la clase creadora de árboles.

Componentes de la Clase

1. **Constructor**

   El constructor inicializa los siguientes elementos:
   - generadorArboles: Instancia de la clase GeneradorArboles que genera el grafo.

2. **Método analizarOperaciones(textoEntrada)**

   Este método principal procesa el texto de entrada JSON para:
   - Llenar la tabla de operaciones usando el método llenarTablaOperaciones.
   - Calcular las operaciones utilizando calculadoraOperaciones.
   - Llenar la tabla de configuraciones con llenarTablaConfiguraciones.
   - Generar un grafo en formato DOT utilizando el generadorArboles.

3. **Método llenarTablaOperaciones(json)**

   Este método crea y llena una instancia de TablaOperaciones a partir de las operaciones definidas en el JSON de entrada.

A continuación se presenta el diagrama de clases UML:

![Descripción de la imagen](/ManualTecnico/Imagenes//uml_conexiones.png)

## 📐 Planteamiento del AFD

### 📜 Reglas Léxicas

```json
{
  "Simbolos Delimitadores": [
    "{", "}", "[", "]", ":", ",", "+"
  ],
  "Operaciones Aritméticas": [
    "suma", "resta", "multiplicacion", "division", "potencia"
  ],
  "Operaciones Trigonométricas": [
    "seno", "tangente", "coseno"
  ],
  "Valores Numéricos": [
    "0-9", "4.5", "5.32", "10", "3", "7", "90", "15"
  ],
  "Identificadores de Valores": [
    "valor1", "valor2"
  ],
  "Palabras Reservadas": [
    "operaciones", "configuraciones", "fondo", "fuente", "forma"
  ],
  "Configuraciones de Nodo": [
    "blue", "box", "diamond"
  ],
  "Colores": [
    "black", "red", "white", "yellow", "blue"
  ]
}
```
```

### 🔍 Expresión Regular

La siguiente expresión regular se utiliza para identificar y clasificar los diferentes componentes léxicos del lenguaje soportado por NodeLexer:

```regex
(?<SimbolosDelimitadores>[{}\[\]:,])|

(?<OperacionesAritmeticas>"(suma|resta|multiplicacion|division|potencia)")|

(?<OperacionesTrigonométricas>"(seno|tangente|coseno)")|

(?<ValoresNumericos>"\b\d+(\.\d+)?\b")|

(?<IdentificadoresDeValores>"valor[0-9]+")|

(?<PalabrasReservadas>"(operaciones|configuraciones|fondo|fuente|forma)")|

(?<ConfiguracionesDeNodo>"(blue|box|diamond)")|
```

Agrupe en conjuntos los tipos de tokens que reconocerá mi analizador léxico esto para poder reducir la carga de análisis de palabras y así no tener que reescribir cada palabra en cada paso nuevo.

- **A:** Símbolos Delimitadores
- **B:** Operaciones Aritméticas
- **C:** Operaciones Trigonométricas
- **E:** Identificadores de Valores
- **F:** Palabras Reservadas
- **G:** Configuraciones de Nodo
- **H:** Colores
- **N:** Números de 0 al 9

Planteo una expresión que puede comenzar por " o por algún símbolo delimitador, si viene algún otro carácter no reconocerlo como un lexema parte de mi lenguaje.

Con estos tres OR el autómata se puede desplazar a demás expresiones regulares.

```regex
("(B|C|D|E|F|G|H)"|[A]|[N])
```

Aca se añade la expresión regular para los números para poder aceptar tanto enteros como decimales.

```regex
^("(B|C|E|F|G|H)" | [A] |(N+(\.(N)+)?) )$
```

Cada palabra en los OR representa un conjunto de palabras ya definidas en mi lenguaje.

```regex
^("(B|C|E|F|G|H)" | [A] |([0-9]+(\.([0-9])+)?) )$
```

Expresión Regular Completa:

```regex
^("(B|C|E|F|G|H)" | A |(N+(\.(N)+)?) )$
```

B, C, E, F, G, H, N representan a los diferentes tipos de tokens que acepta mi gramática.

### 🌳 Generación del Árbol

Al tener la expresión regular planteada se genera el árbol de la siguiente manera:

En donde se puede notar como se desgloza cada parte de la expresion regular para realizar posteriormente los calculos

1. Nulabilidad
2. First
3. Last
4. Tabla de siguientes 

![Descripción de la imagen](/ManualTecnico/Imagenes/calculo_nodos.png)

A continuación se presentan el árbol realizado ya con los cálculos de las demás operaciones faltantes descritas anteriormente.

En donde se puede ver cada nodo con los cálculos realizados de forma correcta y con las reglas siguientes ya hechas.

![Descripción de la imagen](/ManualTecnico/Imagenes/Imagen%20pegada.png)

Posteriormente el árbol completo queda de la siguiente manera:

![Descripción de la imagen](/ManualTecnico/Imagenes/calculos_arbol_completo.png)

### 📊 Tabla de Siguientes

Luego por medio de las reglas que exigen que solo existirán siguientes para los siguientes nodos `*`, `+`, `.`

```plaintext
E   NO.     SIGUIENTES
"   1       { 2, 3, 4, 5, 6 }
B   2       { 3 }
C   3       { 4 }
E   4       { 5 }
G   5       { 6 }
H   6       { 7 }
"   7       { 8 }
A   8       { 9 }
N   9       { 10, 11 }
\.  10      { 11 }
N   11      { - }
```

Posteriormente se realiza el mismo cálculo para cada conjunto B, C, E, F, G, H, ya que se debe de leer carácter por carácter.

Para cada conjunto se expande a partir de cada nodo de aceptación del AFD principal el cual contendrá por cada tipo un estado de aceptación (de momento).

Por ejemplo el desglose para cada conjunto como las palabras reservadas se expandiría el autómata de la siguiente manera

En donde después de cada estado del planteamiento por cada conjunto se extendería de esa forma en la que cada letra de cada palabra representaría un estado de transición del AFD

![Descripción de la imagen](/ManualTecnico/Imagenes/ejemplo_extension.png)

Se llega al final que el AFD tendrá por cada palabra un estado de aceptación que se enlaza con los conjuntos

- **A:** qSIMOBOLO
- **B:** qOPERACIONARITMETICA
- **C:** qOPERACIONTRIGONOMETRICA
- **E:** qVALOR
- **F:** qPalabraReservada
- **G:** qCONFIGURACIONES
- **H:** qCOLOR
- **N:** qVALORNUMERICO

que posteriormente por medio de cada palabra que es aceptada por el autómata se clasifican más estados de aceptación para así poder reconocer y agrupar las palabras de distinta forma siendo estos:

```plaintext
qPRESERVADA: {},
qCONFIGURACION: {},
qPRESERVADA : {},
qCONFIGURACION: {},
qOARITMETICA: {},
qOTRIGONOMETRICA: {},
qOPERACION: {},
qSIMBOLO: {},
qIDVALOR1: {},
qIDVALOR2: {},
qTEXTO: {},
qFORMA: {},
qFUENTE: {},
qFONDO: {},
qCOLOR: {},
qQFORMAVAL: {},   
qVALORNUMERICO: {},
```

El AFD final que se logra formar es el siguiente:

Para una mejor visualización el AFD se encuentra en esta carpeta.


![AFD](/ManualTecnico/Imagenes/automata.png)




![AFDR](/ManualTecnico/Imagenes/automataDerecho.png)

---
### 📊 Análisis Sintáctico

El análisis sintáctico en NodeLexer se encarga de verificar que la secuencia de tokens generada durante el análisis léxico siga las reglas gramaticales del lenguaje definido. Este proceso asegura que las estructuras de las operaciones y configuraciones sean válidas y estén correctamente anidadas.

#### Proceso de Análisis Sintáctico

1. **Entrada:**
    - Se recibe una lista de tokens generada por el analizador léxico.

2. **Parser:**
    - El parser recorre la lista de tokens y verifica que cada token siga las reglas gramaticales definidas.
    - Utiliza una pila para manejar la jerarquía y anidación de las operaciones.

3. **Validación:**
    - Se asegura que cada operación tenga los parámetros necesarios.
    - Verifica que las configuraciones sean válidas y estén correctamente formateadas.

4. **Errores Sintácticos:**
    - Si se encuentra un error, se registra en una lista de errores sintácticos.
    - Los errores se muestran al usuario con detalles sobre la ubicación y la naturaleza del error.

#### Ejemplo de Análisis Sintáctico

Dado el siguiente código de entrada para realizar operaciones las validaciones:

```json
Operaciones = [
    {
    	"operacion": "resta",
    	"nombre": "operacion1", 
    	"valor1": 6.5, 
    	"valor2": 3.5
    },
    {
	    	"operacion": 
	    	"multiplicacion", 
	    	"nombre": "operacion2", 
	    	"valor1": 2.3, 
	    	"valor2": [
	    		{
	    			"operacion": "seno",
	    			"valor1": 90
	    		}
	    	]
    	},
    {
	    "operacion": "suma",
	    "nombre": "operacion3", 
	    "valor1": 2.3,
	    "valor2": [
	    		{"operacion": "multiplicacion",
	    		 "valor1": 10, 
	    		 	"valor2": [
	    		 		{
		    		 		"operacion": "raiz", 
		    		 		"valor1": 10, 
		    		 		"valor2": 2
	    		 		}
	    			]
	    		}
	   ]
  },
]

```

El parser verificará que:

- La operación "suma" tenga los parámetros "valor1" y "valor2".
- La operación "multiplicacion" esté correctamente anidada dentro de "valor2".
- La operación "raiz" tenga los parámetros necesarios y esté correctamente anidada.

#### Estructura del Parser

El parser se implementa en la clase `AnalizadorSintactico.js` y sigue el siguiente flujo:

- **Inicialización:**
  - Se inicializan las estructuras de datos necesarias, como la pila y la lista de errores.

- **Recorrido de Tokens:**
  - Se recorre la lista de tokens y se aplican las reglas gramaticales.
  - Se utilizan métodos auxiliares para manejar la anidación y validación de operaciones.

- **Generación de Árbol Sintáctico:**
  - Si el análisis es exitoso, se genera un árbol sintáctico que representa la estructura jerárquica de las operaciones.

#### GRAMATICA EN BNF
```
------------------
<tokens> ::= CADENA | COLOR | FORMA | FUENTE | TEXTO | VALOR_NUMERICO | OPERACION_ARITMETICA | OPERACION_TRIGONOMETRICA

<CADENA> ::= "\"" [A-Za-z0-9_ ]+ "\""

<COLOR> ::= "#" [0-9A-Fa-f]{6}

<FORMA> ::= "circle" | "box" | "diamond"

<FUENTE> ::= "Times-Roman" | "Arial" 

<VALOR_NUMERICO> ::= [0-9]+ ("." [0-9]+)?

<OPERACION_ARITMETICA> ::= "suma" | "resta" | "multiplicacion" | "division" | "raiz" |
                            "mod"
<OPERACION_TRIGONOMETRICA> ::= "seno" | "coseno" | "tangente"

---------------
TERMINALES

Palabras clave:

      OPERACIONES
      OPERACION
      OPERACION_ARITMETICA
      OPERACION_TRIGONOMETRICA
      ID_OPERACION
      VALOR_1
      VALOR2     

Símbolos Delimitadores:

= (asignación)
: (separador de clave-valor)
, (coma, separador de elementos)
[ y ] (para arreglos)
{ y } (para objetos)

Tipos de datos:

CADENA (cadena de texto)
VALOR_NUMERICO (número entero o decimal)

NO TERMINALES

<nlex-archivo>:   Representa el archivo general.
<operaciones>:    Define la sección de operaciones.
<arreglo_operaciones>:  Lista de operaciones entre corchetes.
<operacion>:      Describe una operación individual.
<operacion_anidada>:    Representa operaciones anidadas dentro de otra operación.

PRODUCCIONES

<nlex-archivo> ::= <operaciones> "," <configuraciones> <funciones> <comentarios>

<operaciones> ::= OPERACIONES "=" <arreglo_operaciones>

<arreglo_operaciones> ::= "[" <operacion> { "," <operacion> } "]"

<operacion> ::= "{"

                  "operacion" ":" ( OPERACION_ARITMETICA | OPERACION_TRIGONOMETRICA )
                  | "nombre" ":" "ID_OPERACION"
                  | "valor1" ":" ( VALOR_NUMERICO | <operacion_anidada> )
                  | "valor2" ":" ( VALOR_NUMERICO | <operacion_anidada> ) [VALOR2_OPCIONAL]
                  
                "}"

      /*
            CONFIGURACIONES 
*/
<configuraciones> ::= "ConfiguracionesLex" "=" <configuracion_arreglo> ","
                      "ConfiguracionesParser" "=" <configuracion_arreglo>

<configuracion_arreglo> ::= "[" <configuracion> { "," <configuracion> } "]"

<configuracion> ::= ( "fondo" ":" COLOR  |
                      "fuente" ":" COLOR |
                      "forma" ":" FORMA  |
                      "tipoFuente" ":" FUENTE )

<funciones> ::= <funcion> { <funcion> }

<funcion> ::= "imprimir" "(" OPERACION_ARITMETICA | OPERACION_TRIGONOMETRICA")"
             | "conteo" "()"
             | "promedio" "(" OPERACION_ARITMETICA | OPERACION_TRIGONOMETRICA ")"
             | "max" "(" OPERACION_ARITMETICA | OPERACION_TRIGONOMETRICA ")"
             | "min" "(" OPERACION_ARITMETICA | OPERACION_TRIGONOMETRICA ")"
             | "generarReporte" "(" (CADENA [ "," CADENA ])? ")"

<comentarios> ::= <comentario_simple> | <comentario_multilinea>

<comentario_simple> ::= "//" TEXTO

<comentario_multilinea> ::= "/*" TEXTO "*/"

```
#### Imagen del Arbol Sintactico
![arbol](/ManualTecnico/Imagenes/sintactito.png)

El análisis sintáctico es crucial para asegurar que el código de entrada sea válido y esté correctamente estructurado antes de proceder con el análisis de operaciones y la generación de resultados.

