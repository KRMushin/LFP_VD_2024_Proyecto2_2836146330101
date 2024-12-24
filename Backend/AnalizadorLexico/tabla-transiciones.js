class TablaTransiciones {
    // ultimo estado disponible 136
    /*
    
        
        Palabras reservadas             --> token de aceptación = qPRESERVADA
        Configuraciones                 --> token de aceptación = qCONFIGURACION
        Operaciones aritméticas         --> token de aceptación = qOARITMETICA
        Operaciones trigonométricas     --> token de aceptación = qOTRIGONOMETRICA
        Número decimal                  --> token de aceptación = qNDECIMAL
        Número entero                   --> token de aceptación = qNENTERO
        Operaciones                     --> token de aceptación = qOPERACION
        Símbolo                         --> token de aceptación = qSIMBOLO
        Identificador de operación 1    --> token de aceptación = qIDVALOR1
        Identificador de operación 2    --> token de aceptación = qIDVALOR2
        Texto                           --> token de aceptación = QTEXTO
        Forma                           --> token de aceptación = qFORMA
        Fuente                          --> token de aceptación = qFUENTE
        Fondo                           --> token de aceptación = qFONDO
        Color                           --> token de aceptación = qCOLOR
        Valor de forma                  --> token de aceptación = qQFORMAVAL
        Color de Fuente                 --> token de aceptación = qCOLORF
    
    */

    static tablaDeTransiciones = {
        q0: { 
            // transicion cuando detecta un \"
            '"': "q1" ,'(': "qSIMBOLO",')': "qSIMBOLO",'[': "qSIMBOLO",']': "qSIMBOLO",';': "qSIMBOLO",':': "qSIMBOLO",'{': "qSIMBOLO", '}': "qSIMBOLO" , ',': "qSIMBOLO" ,
            // deteccion de numeros desde el estado inicial
            0: "q133" , 1: "q133" , 2: "q133" , 3: "q133" , 4: "q133" , 5: "q133" , 6: "q133" , 7: "q133" , 8: "q133" , 9: "q133" ,

            // asignacion
            '=': "qASIGNACION",

            // palabras que no empiezan por comillas
            o: 'q76' , c: 'q2', f: "q104", t: "q19", i: "q194", p: "q204", m: "q211", g: "q215",


            // comnetarios
            '/': 'q181'
        },

        // letra inicial que puede venir despues de un estado inicial
        q1: { c: "q2" , t: "q19" , i: "q27" , d: "q34" , m: "q42" , r: "q59", p:"q68" , o: "q76", v: "q87" , s: "q93", f: "q104" , a: "q117" , b:"q121" , y:"q151", w:"q157", n:"q174",
            '#': 'q182'
        },
        
        // configuraciones parser y lex
        q2: { o: "q3" , i: "q127"},
        q3: { n: "q4" , s: "q15"},
        q4: { f: "q5" , t: "q202"},
        q5: { i: "q6" },
        q6: { g: "q7" },
        q7: { u: "q8" },
        q8: { r: "q9" },
        q9: { a: "q10" },
        q10: { c: "q11" },
        q11: { i: "q12" },
        q12: { o: "q13" },
        q13: { n: "q14" },
        q14: { e: "q98" },
        q98: { s: "q165" },
        q165: { l: "q166", p: "q169"},
        q166: { e: "q167"},
        q167: { x: "qCONFIGURACION"},
        
        q169: { a: "q170"},
        q170: { r: "q171" },
        q171: { s: "q172" },
        q172: { e: "q173" },
        q173: { r: "qCONFIGURACION" },

        // q99: { '"': "qPRESERVADA" },

        // seno
        q15: {e: "q16"},
        q16: {n: "q17"},
        q17: {o: "q18"},
        q18: {'"': "qOTRIGONOMETRICA"},

        //  tangente
        q19: { a: "q20" , e: "q100", i: "q185"},
        q20: { n: "q21" },
        q21: { g: "q22" },
        q22: { e: "q23" },
        q23: { n: "q24" },
        q24: { t: "q25" },
        q25: { e: "q26" },
        q26: { '"': "qOTRIGONOMETRICA" },

        // inverso 
        q27: { n: "q28" },
        q28: { v: "q29" },
        q29: { e: "q30" },
        q30: { r: "q31" },
        q31: { s: "q32" },
        q32: { o: "q33" },
        q33: { '"': "qOARITMETICA" },

        // division
        q34: { i: "q35" },
        q35: { v: "q36", a: "q142" },
        q36: { i: "q37" },
        q37: { s: "q38" },
        q38: { i: "q39" },
        q39: { o: "q40" },
        q40: { n: "q41" },
        q41: { '"': "qOARITMETICA" },

        // multiplicacion
        q42: { u: "q43", o: "q56" },
        q43: { l: "q44" },
        q44: { t: "q45" },
        q45: { i: "q46" },
        q46: { p: "q47" },
        q47: { l: "q48" },
        q48: { i: "q49" },
        q49: { c: "q50" },
        q50: { a: "q51" },
        q51: { c: "q52" },
        q52: { i: "q53" },
        q53: { o: "q54" },
        q54: { n: "q55" },
        q55: { '"': "qOARITMETICA" },

        // mod
        q56: {d: "q57"},
        q57: {'"': "qOARITMETICA"},

        // resta
        q59: {e: "q60", a: "q65"},
        q60: {s: "q61", d: "q141"},
        q61: {t: "q62"},
        q62: {a: "q63"},
        q63: {'"': "qOARITMETICA"},

        // raiz
        q65: {i: "q66"},
        q66: {z: "q67"},
        q67: {'"': "qOARITMETICA"},

        // potencia
        q68: {o: "q69"},
        q69: { t: "q70" },
        q70: { e: "q71" },
        q71: { n: "q72" },
        q72: { c: "q73" },
        q73: { i: "q74" },
        q74: { a: "q75" },
        q75: { '"': "qOARITMETICA" },

        // operacion   o     operaciones 
        q76: {p: "q77"},
        q77: { e: "q78" },
        q78: { r: "q79" },
        q79: { a: "q80" },
        q80: { c: "q81" },
        q81: { i: "q82" },
        q82: { o: "q83" },
        q83: { n: "q84" },
        q84: { '"': "qOPERACION" , e: "q85"},
        q85: { s: "qCONFIGURACION" },
        // q86: { '"': "qPRESERVADA" },

        // valor 1
        q87: { a: "q88" },
        q88: { l: "q89" },
        q89: { o: "q90" },
        q90: { r: "q91" },
        q91: { 1: "q92", 2: "q140"},
        q92: { '"': "qIDVALOR1" },

        // suma , seno
        q93: { u: "q94" , e: "q137"},
        q94: { m: "q95" },
        q95: { a: "q96" },
        q96: { '"': "qOARITMETICA" },

        // texxto
        q100: {x: "q101"},
        q101: {t: "q102"},
        q102: {o: "q103"},
        q103: {'"': "qTEXTO"},

        // fondo 
        q104: {o: "q105" , u: "q112"},
        q105: {n: "q106" , r: "q109"},
        q106: {d: "q107"},
        q107: {o: "qFONDO"},
        
        // q108: {'"': "qFONDO"},

        // forma
        q109: {m: "q110"},
        q110: {a: "qFORMA"},
        // q111: {'"': "qFORMA"},

        // fuente
        q112: {e: "q113"},
        q113: {n: "q114"},
        q114: {t: "q115"},
        q115: {e: "qFUENTE"},
        // q116: {'"': "qFUENTE"},

        // azul
        q117: {z: "q118"},
        q118: {u: "q119"},
        q119: {l: "q120"},
        q120: {'"': "qCOLOR"},

        // blue, box
        q121: {l: "q122", o: "q149"},
        q122: {u: "q123", a: "q162"},
        q123: {e: "q124"},
        q124: {'"': "qCOLOR"},

        // circle
        q127: {r: "q128"},
        q128: {c: "q129"},
        q129: {l: "q130"},
        q130: {e: "q131"},
        q131: {'"': "qFORMAVAL"},

        //seno
        q137: {n: "q138"},
        q138: {o: "q139"},
        q139: {'"': "qOTRIGONOMETRICA"},

        // VALOR 2
        q140: { '"': "qIDVALOR2" },

        //red
        q141: {'"': "qCOLOR"},

        //diamond
        q142: {m: "q143"},
        q143: {o: "q144"},
        q144: {n: "q145"},
        q145: {d: "q146"},  
        q146: {'"': "qFORMAVAL"},

        //box
        q149: {x: "q150"},
        q150: {'"': "qFORMAVAL"},

        //yellow
        q151: {e: "q152"},
        q152: {l: "q153"},
        q153: {l: "q154"},
        q154: {o: "q155"},
        q155: {w: "q156"},
        q156: {'"': "qCOLOR"},

        //white
        q157: {h: "q158"},
        q158: {i: "q159"},
        q159: {t: "q160"},
        q160: {e: "q161"},
        q161: {'"': "qCOLOR"},

        //black
        q162: {c: "q163"},
        q163: {k: "q164"},
        q164: {'"': "qCOLOR"},


        // transiciones para numeros enteros o decimales 
            // en esta trancision se detectan los numeros enteros
        q133: {'.': "q134" , 0: "q133" , 1: "q133" , 2: "q133" , 3: "q133" , 4: "q133" , 5: "q133" , 6: "q133" , 7: "q133" , 8: "q133" , 9: "q133" ,
            
            ')': "qVALORNUMERICO",']': "qVALORNUMERICO",';': "qVALORNUMERICO",':': "qVALORNUMERICO", '}': "qVALORNUMERICO", 
            ',': "qVALORNUMERICO", '\t': "qVALORNUMERICO", '\n': "qVALORNUMERICO", ' ': "qVALORNUMERICO"
        },
        // en este punto despues del punto pide que se garantice que despues de un punto venga un numero de lo contrario entra en error
        q134: { 0: "q135" , 1: "q135" , 2: "q135" , 3: "q135" , 4: "q135" , 5: "q135" , 6: "q135" , 7: "q135" , 8: "q135" , 9: "q135" ,
            
            ')': "qVALORNUMERICO",']': "qVALORNUMERICO",';': "qVALORNUMERICO",':': "qVALORNUMERICO",
            '}': "qVALORNUMERICO", ',': "qVALORNUMERICO", '\t': "qVALORNUMERICO", '\n': "qVALORNUMERICO" , ' ': "qVALORNUMERICO"

        },
        // en este punto ya se pueden reconocer los numeros decimales
        q135: {0: "q135" , 1: "q135" , 2: "q135" , 3: "q135" , 4: "q135" , 5: "q135" , 6: "q135" , 7: "q135" , 8: "q135" , 9: "q135",
            
            ')': "qVALORNUMERICO",']': "qVALORNUMERICO",';': "qVALORNUMERICO",':': "qVALORNUMERICO", '}': 
            "qVALORNUMERICO", ',': "qVALORNUMERICO", '\t': "qVALORNUMERICO", '\n': "qVALORNUMERICO" , ' ': "qVALORNUMERICO"
        },



        /*
                NUEVOS RECONOCMIENTOS        ESTADO 165
        
        */

        q174: { o: "q175"},
        q175: { m: "q176"},
        q176: { b: "q177"},
        q177: { r: "q178"},
        q178: { e: "q179"},
        q179: { '"': "qNOMBRE"},

        // comentario simple

        q181: {'/': 'qCOSIMPLE' , '*': 'qCOCOMPLEJO'},

        // colores hexadecimales
        
        q182: {
            0: "q182", 1: "q182", 2: "q182", 3: "q182", 4: "q182", 5: "q182",
            6: "q182", 7: "q182", 8: "q182", 9: "q182",
            a: "q182", b: "q182", c: "q182", d: "q182", e: "q182", f: "q182",
            A: "q182", B: "q182", C: "q182", D: "q182", E: "q182", F: "q182",
            '"': "qCOLOR" // Si cierra con comillas, es un color válido
        },

        // tipofuente
        q185: { p: "q186" },
        q186: { o: "q187" },
        q187: { f: "q188" },
        q188: { u: "q189" },
        q189: { e: "q190" },
        q190: { n: "q191" },
        q191: { t: "q192" },
        q192: { e: "qTIPOFUENTE" },


        // transiciones para las funciones
            // imprimir
        q194: { m: "q195" },
        q195: { p: "q196" },
        q196: { r: "q197" },
        q197: { i: "q198" },
        q198: { m: "q199" },
        q199: { i: "q201" },
        q201: { r: "qFUNCION"},

            //conteo
        q202: { e: "q203" },    
        q203: { o: "qFUNCION" },    

            // promedio
        q204: { r: "q205" },
        q205: { o: "q206" },
        q206: { m: "q207" },
        q207: { e: "q208" },
        q208: { d: "q209" },
        q209: { i: "q210" },
        q210: { o: "qFUNCION" },    
            // max 
        q211: { a: "q212" , i: "q213"},
        q212: { x: "qFUNCION" },    
            // min
        q213: { n: "qFUNCION" },    
            // generarReporte
        q215: { e: "q216" },    
        q216: { n: "q217" },
        q217: { e: "q218" },
        q218: { r: "q219" },
        q219: { a: "q220" },
        q220: { r: "q221" },
        q221: { r: "q222" },
        q222: { e: "q223" },
        q223: { p: "q224" },
        q224: { o: "q225" },
        q225: { r: "q226" },
        q226: { t: "q227" },
        q227: { e: "qFUNCION" },

        // estados de aceptacion
        qPRESERVADA: {},
        qCONFIGURACION: {},
        qOARITMETICA: {},
        qOTRIGONOMETRICA: {},
        qNDECIMAL: {},
        qNENTERO: {},
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
        
        /*
            Nuevos estados aceptacion
        */
       qASIGNACION: {},
       qNOMBRE: {},
       qCOSIMPLE: {},
       qTIPOFUENTE: {},
       qFUNCION: {},
       qCOCOMPLEJO: {}
    };
}

module.exports = TablaTransiciones;
