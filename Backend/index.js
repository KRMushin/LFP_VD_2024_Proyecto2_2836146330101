const express = require('express');
const cors = require('cors');
const AnalizadorLexico = require('./AnalizadorLexico/analizador-lexico');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 
app.use(express.text({ type: '*/*' }));

app.post('/analisis-lexico', (req, res) => {
    try {
         this.analizadorLexico = new AnalizadorLexico();
         const cadena = req.body;
         const { tokens, listaErrores } = this.analizadorLexico.analizarEntrada(cadena);
         return res.json({ tokens, listaErrores });
    } catch (error) {
        console.error("Error en /analisis-lexico:", error); // Registro detallado en la consola
        return res.status(500).json({ error: error.message, stack: error.stack });
    } 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
