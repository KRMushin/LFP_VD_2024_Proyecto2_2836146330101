const express = require('express');
const cors = require('cors');
const AnalizadorLexico = require('./AnalizadorLexico/analizador-lexico');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Middleware para procesar JSON normalmente
app.use(express.text({ type: '*/*' })); // Middleware para capturar texto bruto

app.post('/analisis-lexico', (req, res) => {
    try {
         this.analizadorLexico = new AnalizadorLexico();
         const cadena = req.body;
         const { tokens, listaErrores } = this.analizadorLexico.analizarEntrada(cadena);
         return res.json({ tokens, listaErrores });
    } catch (error) {
        return res.json({ error: error.message });
    } 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
