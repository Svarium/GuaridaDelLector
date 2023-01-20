const express = require('express');
const app = express();
const port = 3030;
const path = require('path');


//Archivos estáticos
app.use(express.static(path.join(__dirname,  'public' )))

//Rutas
app.get('/',(req,res) => res.sendFile(path.join(__dirname, 'views', 'index.html')))
app.get('/carrito',(req,res) => res.sendFile(path.join(__dirname, 'views', 'carrito.html')))
app.get('/detalle',(req,res) => res.sendFile(path.join(__dirname, 'views', 'detalle.html')))
app.get('/login',(req,res) => res.sendFile(path.join(__dirname, 'views', 'login.html')))
app.get('/registro',(req,res) => res.sendFile(path.join(__dirname, 'views', 'registro.html')))
app.get('/categoria',(req,res) => res.sendFile(path.join(__dirname, 'views', 'categoria.html')))
app.get('*',(req,res) => res.sendFile(path.join(__dirname, 'views', '404.html')))

//Servidor levantado
app.listen(port, () => console.log('Servidor corriendo en el puerto ' + port))