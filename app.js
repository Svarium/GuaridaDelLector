const express = require('express');
const app = express();
const port = 3030;
const path = require('path');


//Archivos estáticos
app.use(express.static(path.join(__dirname,  'public' )))

//Rutas
app.get('/',(req,res) => res.sendFile(path.join(__dirname, 'views', 'index.html')))

//Servidor levantado
app.listen(port, () => console.log('Servidor corriendo en el puerto ' + port))